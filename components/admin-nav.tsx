"use client";

import Link from "next/link";
import { Settings2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminNav() {
  return (
    <div className="fixed bottom-4 right-4 flex gap-2 z-50">
      <Link href="/settings">
        <Button
          variant="outline"
          size="sm"
          className="bg-black/60 backdrop-blur-sm border-gray-700 text-white hover:bg-black/80 hover:border-blue-500 transition-all"
        >
          <Settings2 className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </Link>
      <Link href="/admin">
        <Button
          variant="outline"
          size="sm"
          className="bg-black/60 backdrop-blur-sm border-gray-700 text-white hover:bg-black/80 hover:border-red-500 transition-all"
        >
          <Shield className="w-4 h-4 mr-2" />
          Admin
        </Button>
      </Link>
    </div>
  );
}
