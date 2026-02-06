import { type NextRequest, NextResponse } from 'next/server';
import { getAllSubmissions, getSettings } from '@/lib/mongodb';

// Verify password
function verifyPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  return password === adminPassword;
}

export async function GET(req: NextRequest) {
  try {
    const password = req.headers.get('x-admin-password');
    
    if (!password || !verifyPassword(password)) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid password.' },
        { status: 401 }
      );
    }

    // Get settings to retrieve custom MongoDB URI
    const settings = await getSettings();
    const mongoUri = settings?.mongodbUri || process.env.MONGODB_URI;
    
    const submissions = await getAllSubmissions(mongoUri);
    
    return NextResponse.json({
      count: submissions.length,
      submissions,
    });
  } catch (error) {
    console.error('Error in admin GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
