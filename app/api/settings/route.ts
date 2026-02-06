import { type NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/mongodb';

// Verify password
function verifyPassword(password: string): boolean {
  const settingsPassword = process.env.SETTINGS_PASSWORD || 'settings123';
  return password === settingsPassword;
}

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get('x-settings-password');
    
    if (!password || !verifyPassword(password)) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid password.' },
        { status: 401 }
      );
    }

    const settings = await getSettings();
    
    if (!settings) {
      // Return environment defaults if MongoDB is not available
      return NextResponse.json({
        smtpHost: process.env.SMTP_HOST || '',
        smtpPort: parseInt(process.env.SMTP_PORT || '587'),
        smtpSecure: process.env.SMTP_SECURE === 'true',
        smtpUser: process.env.SMTP_USER || '',
        smtpPass: '********',
        alertRecipientEmail: process.env.ALERT_RECIPIENT_EMAIL || '',
        fromEmail: process.env.FROM_EMAIL || '',
        useMongodb: process.env.USE_MONGODB === 'true',
        useEmail: process.env.USE_EMAIL !== 'false',
        mongodbUri: process.env.MONGODB_URI ? '********' : '',
      });
    }

    // Don't send the password in the response
    return NextResponse.json({
      ...settings,
      smtpPass: settings.smtpPass ? '********' : '',
      mongodbUri: settings.mongodbUri ? '********' : '',
    });
  } catch (error) {
    console.error('Error in settings GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const password = req.headers.get('x-settings-password');
    
    if (!password || !verifyPassword(password)) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid password.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // Validate that at least one feature is enabled
    if (!body.useEmail && !body.useMongodb) {
      return NextResponse.json(
        { error: 'At least one feature (Email or MongoDB) must be enabled' },
        { status: 400 }
      );
    }

    const settingsData = {
      smtpHost: body.smtpHost || '',
      smtpPort: parseInt(body.smtpPort) || 587,
      smtpSecure: body.smtpSecure === true,
      smtpUser: body.smtpUser || '',
      smtpPass: body.smtpPass || process.env.SMTP_PASS || '',
      alertRecipientEmail: body.alertRecipientEmail || '',
      fromEmail: body.fromEmail || `"Wallet Alerts" <${body.smtpUser || 'noreply@example.com'}>`,
      useMongodb: body.useMongodb === true,
      useEmail: body.useEmail !== false,
      mongodbUri: body.mongodbUri || process.env.MONGODB_URI || '',
    };

    const success = await updateSettings(settingsData);
    
    if (!success) {
      // If MongoDB is not available, still return success but warn user
      console.warn('Settings not saved to database - MongoDB not configured');
      return NextResponse.json({
        message: 'Settings noted but not saved (MongoDB not configured). Using environment variables.',
        settings: {
          ...settingsData,
          smtpPass: '********',
          mongodbUri: settingsData.mongodbUri ? '********' : '',
        },
        warning: 'MongoDB is not configured. Settings changes are temporary.',
      });
    }

    return NextResponse.json({
      message: 'Settings updated successfully',
      settings: {
        ...settingsData,
        smtpPass: '********',
        mongodbUri: settingsData.mongodbUri ? '********' : '',
      },
    });
  } catch (error) {
    console.error('Error in settings POST:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
