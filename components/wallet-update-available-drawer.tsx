"use client";

import type React from "react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { WalletDetailsProps } from "./wallet-list";

interface WalletUpdateAvailableDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
  selectedWallet: WalletDetailsProps;
}

export function WalletUpdateAvailableDrawer({
  isOpen,
  onOpenChange,
  onUpdate,
  selectedWallet,
}: WalletUpdateAvailableDrawerProps) {
  const updateFeatures = [
    "Fix main build modifying desktop build steps",
    "Improving the security system",
    "Fix incorrect network information",
    "Improve performance on signature request",
  ];

  if (!selectedWallet) return null;

  const IconComponent = selectedWallet.icon;

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="h-full w-[500px] ml-auto bg-gray-900/95 backdrop-blur-sm border-l border-gray-700 rounded-none">
        <div className="flex flex-col justify-center h-full p-6">
          <div className="text-center">
            <div
              className={`w-16 h-16 bg-linear-to-br ${selectedWallet.bgColor} rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6`}
            >
              <IconComponent />
            </div>

            <DrawerHeader className="p-0 mb-8 flex justify-center items-center">
              <DrawerTitle className="text-white text-2xl font-semibold mb-3">
                Update Available
              </DrawerTitle>
              <p className="text-gray-400 text-lg">Version 12.12.0</p>
            </DrawerHeader>

            {/* Update Features List */}
            <div className="text-left mb-8 space-y-3">
              {updateFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            {/* Update Button */}
            <Button
              onClick={onUpdate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-medium mb-6"
            >
              Update
            </Button>

            {/* Help Footer */}
            <p className="text-gray-400 text-sm">
              Need help?{" "}
              <button className="text-blue-400 hover:text-blue-300 underline">
                Contact {selectedWallet.name} Support
              </button>
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
