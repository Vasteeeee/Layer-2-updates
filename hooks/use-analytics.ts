"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function useAnalytics() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);
  const lastTrackedEvent = useRef<string | null>(null);
  const eventCooldown = useRef<{ [key: string]: number }>({});

  // Track page views
  useEffect(() => {
    if (pathname && pathname !== lastTrackedPath.current) {
      // Prevent tracking the same path multiple times
      lastTrackedPath.current = pathname;
      
      // Add a small delay to ensure the page is fully loaded
      setTimeout(() => {
        trackEvent("pageview", { 
          pageUrl: window.location.href,
          element: "pageview"
        });
      }, 100);
    }
  }, [pathname]);

  // Track link clicks
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");
      
      if (link) {
        const href = link.getAttribute("href") || "Unknown link";
        const text = link.innerText || href;
        
        // Create a unique identifier for this click event
        const eventId = `click-${href}-${text}`;
        
        // Check if we've recently tracked this event (within last second)
        const now = Date.now();
        if (!eventCooldown.current[eventId] || now - eventCooldown.current[eventId] > 1000) {
          eventCooldown.current[eventId] = now;
          
          trackEvent("click", { 
            pageUrl: window.location.href,
            element: text
          });
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const trackEvent = async (eventType: string, data: any = {}) => {
    try {
      // Add a unique identifier to prevent duplicate processing
      const eventId = `${eventType}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventType,
          ...data,
          _eventId: eventId, // Unique ID to prevent duplicate processing
        }),
      });
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  };

  return { trackEvent };
}