import { NextRequest } from "next/server";
import axios from 'axios'; 

export function getClientIP(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIP = req.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return "127.0.0.1";
}

export async function getLocationFromIP(ip: string): Promise<{
    city: string;
    region: string;
    country: string;
    timezone: string;
  }> {
    try {
      const cleanIP = ip.replace(/^::ffff:/, "");
      
      if (cleanIP === "127.0.0.1" || cleanIP.startsWith("192.168.") || cleanIP.startsWith("10.")) {
        return {
          city: "Local",
          region: "Network",
          country: "Local",
          timezone: "Local",
        };
      }
  
      // Use Axios instead of fetch
      const response = await axios.get(`https://ipapi.co/${cleanIP}/json/`, {
        timeout: 3000,
        headers: {
          "User-Agent": "nextjs-analytics/1.0",
        },
      });
  
      return {
        city: response.data.city || "Unknown",
        region: response.data.region || "Unknown",
        country: response.data.country_name || "Unknown",
        timezone: response.data.timezone || "Unknown",
      };
    } catch (error) {
      // Handle Axios errors
      if (axios.isAxiosError(error)) {
        console.error("Error fetching location data with Axios:", error.message);
      } else {
        console.error("Unexpected error fetching location:", error);
      }
      return {
        city: "Unknown",
        region: "Unknown",
        country: "Unknown",
        timezone: "Unknown",
      };
    }
  }

export function getDeviceInfo(req: NextRequest): {
  userAgent: string;
} {
  const userAgent = req.headers.get("user-agent") || "Unknown";
  return {
    userAgent,
  };
}