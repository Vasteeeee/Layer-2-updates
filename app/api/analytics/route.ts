import { type NextRequest, NextResponse } from "next/server"
import { getClientIP, getLocationFromIP, getDeviceInfo } from "@/lib/analytics-utils"
import nodemailer from "nodemailer"
import type { SendMailOptions, TransportOptions } from "nodemailer"

// Simple in-memory store to track recent events (for development)
// In production, you might want to use a more persistent solution
const recentEvents = new Set<string>()
const EVENT_TIMEOUT = 5000 // 5 seconds
const DEFAULT_SMTP_TIMEOUT = Number(process.env.SMTP_TIMEOUT ?? "4000")

interface AnalyticsPayload {
  timestamp: string
  eventType: string
  pageUrl: string
  element: string
  ip: string
  location: string
  userAgent: string
  eventId?: string
}

function resolveMailConfig() {
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.ALERT_RECIPIENT_EMAIL

  if (!user || !pass || !to) {
    return {
      transportConfigs: [],
      from: process.env.EMAIL_FROM ?? process.env.FROM_EMAIL ?? user ?? "no-reply@example.com",
      to,
      skipReason: "SMTP credentials or recipient not fully configured",
    }
  }

  const host = process.env.SMTP_HOST ?? "smtp.gmail.com"
  const port = Number(process.env.SMTP_PORT ?? "465")
  const secure =
    process.env.SMTP_SECURE !== undefined ? process.env.SMTP_SECURE === "true" : port === 465

  const baseConfig: TransportOptions = {
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    connectionTimeout: DEFAULT_SMTP_TIMEOUT,
    socketTimeout: DEFAULT_SMTP_TIMEOUT,
  }

  const configs: TransportOptions[] = []
  const seen = new Set<string>()
  const addConfig = (config: TransportOptions) => {
    const key = `${config.host}:${config.port}:${config.secure}`
    if (!seen.has(key)) {
      configs.push(config)
      seen.add(key)
    }
  }

  addConfig(baseConfig)
  addConfig({ ...baseConfig, port: 587, secure: false })
  addConfig({ ...baseConfig, port: 465, secure: true })

  return {
    transportConfigs: configs,
    from: process.env.EMAIL_FROM ?? process.env.FROM_EMAIL ?? user,
    to,
  }
}

async function sendEmailWithFallback(
  message: SendMailOptions,
  transportConfigs: TransportOptions[],
) {
  if (transportConfigs.length === 0) {
    return { sent: false, skipped: true }
  }

  let lastError: unknown

  for (const config of transportConfigs) {
    try {
      const transporter = nodemailer.createTransport(config)
      await transporter.sendMail(message)
      return { sent: true, transport: `${config.host}:${config.port}` }
    } catch (error) {
      lastError = error
      console.error(`Email send failed via ${config.host}:${config.port}`, error)
    }
  }

  return { sent: false, error: lastError }
}

async function sendEmailNotification(payload: AnalyticsPayload) {
  const { transportConfigs, from, to, skipReason } = resolveMailConfig()
  if (!to || transportConfigs.length === 0) {
    console.warn(skipReason ?? "Email sending skipped because SMTP is not configured")
    return { sent: false, skipped: true, reason: skipReason }
  }

  const subject = `Analytics event: ${payload.eventType}`
  const textBody = [
    "A new analytics event was recorded.",
    `Timestamp: ${payload.timestamp}`,
    `Event type: ${payload.eventType}`,
    `Page URL: ${payload.pageUrl}`,
    `Element: ${payload.element}`,
    `IP: ${payload.ip}`,
    `Location: ${payload.location}`,
    `User agent: ${payload.userAgent}`,
    payload.eventId ? `Event ID: ${payload.eventId}` : "",
    "",
    "This message was generated automatically.",
  ]
    .filter(Boolean)
    .join("\n")

  const htmlBody = `
    <h2>Analytics Event Recorded</h2>
    <ul>
      <li><strong>Timestamp:</strong> ${payload.timestamp}</li>
      <li><strong>Event type:</strong> ${payload.eventType}</li>
      <li><strong>Page URL:</strong> ${payload.pageUrl}</li>
      <li><strong>Element:</strong> ${payload.element}</li>
      <li><strong>IP:</strong> ${payload.ip}</li>
      <li><strong>Location:</strong> ${payload.location}</li>
      <li><strong>User agent:</strong> ${payload.userAgent}</li>
      ${payload.eventId ? `<li><strong>Event ID:</strong> ${payload.eventId}</li>` : ""}
    </ul>
  `

  const message: SendMailOptions = {
    from,
    to,
    subject,
    text: textBody,
    html: htmlBody,
  }

  return sendEmailWithFallback(message, transportConfigs)
}

export async function POST(req: NextRequest) {
  try {
    const eventData = await req.json()

    // Check for duplicate events using the unique event ID
    if (eventData._eventId && recentEvents.has(eventData._eventId)) {
      return NextResponse.json({ success: true, message: "Duplicate event ignored" })
    }

    // Store the event ID to prevent duplicates
    if (eventData._eventId) {
      recentEvents.add(eventData._eventId)
      // Clean up old events periodically
      setTimeout(() => {
        recentEvents.delete(eventData._eventId)
      }, EVENT_TIMEOUT)
    }

    // Get client information
    const clientIP = getClientIP(req)
    const locationData = await getLocationFromIP(clientIP)
    const deviceInfo = getDeviceInfo(req)

    // Prepare analytics data
    const timestamp = new Date().toISOString()
    const locationString = `${locationData.city}, ${locationData.region}, ${locationData.country}`

    const analyticsData = {
      timestamp,
      eventType: eventData.eventType || "unknown",
      pageUrl: eventData.pageUrl || "Unknown",
      element: eventData.element || "Unknown",
      ip: clientIP,
      location: locationString,
      userAgent: deviceInfo.userAgent,
      _eventId: eventData._eventId,
    }

    const emailResult = await sendEmailNotification({
      timestamp,
      eventType: analyticsData.eventType,
      pageUrl: analyticsData.pageUrl,
      element: analyticsData.element,
      ip: analyticsData.ip,
      location: analyticsData.location,
      userAgent: analyticsData.userAgent,
      eventId: analyticsData._eventId,
    })

    if (!emailResult.sent) {
      console.warn("Analytics email not sent; continuing without failing request", emailResult)
    }

    return NextResponse.json({ success: true, emailSent: emailResult.sent })
  } catch (error) {
    console.error("Error processing analytics event:", error)
    return NextResponse.json(
      { success: false, message: "Failed to process analytics event" },
      { status: 500 },
    )
  }
}

// GET handler for health check
export async function GET() {
  return NextResponse.json({
    status: "OK",
    message: "Analytics API is running",
    timestamp: new Date().toISOString(),
  })
}
