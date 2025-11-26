"use client";

import { useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { WalletDetailsProps } from "./wallet-list";
import Image from "next/image";

interface WalletUpdateDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  progress: number;
  onProgressChange: (progress: number) => void;
  onComplete: () => void;
  selectedWallet: WalletDetailsProps;
}

export function WalletUpdateDrawer({
  isOpen,
  onOpenChange,
  progress,
  onProgressChange,
  onComplete,
  selectedWallet,
}: WalletUpdateDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        // Calculate new progress directly instead of using a function
        const newProgress = progress + Math.random() * 15 + 5;

        if (newProgress >= 100) {
          clearInterval(interval);
          onProgressChange(100);
          setTimeout(() => {
            onComplete();
          }, 500);
        } else {
          onProgressChange(newProgress);
        }
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [isOpen, progress, onProgressChange, onComplete]);

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
              {/* <Image src="trust.png" alt="Crypto" width="80" height="80" /> */}
            </div>

            <DrawerHeader className="p-0 mb-8 flex justify-center items-center">
              <DrawerTitle className="text-white text-2xl font-semibold mb-3">
                Updating {selectedWallet.name}
              </DrawerTitle>
              <p className="text-gray-400 text-sm text-center">
                Please wait while we update to version 12.12.0
              </p>
            </DrawerHeader>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
              <div
                className={`bg-linear-to-r ${selectedWallet.bgColor} h-3 rounded-full transition-all duration-300 ease-out`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>

            <div className="text-orange-400 text-xl font-bold mb-8">
              {Math.round(progress)}%
            </div>

            <p className="text-gray-400 text-sm">
              This might take a few moments. <br /> Please do not close this
              window.
            </p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
