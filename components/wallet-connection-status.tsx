"use client";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { WalletDetailsProps } from "./wallet-list";

interface WalletConnectionStatusProps {
  isConnecting: boolean;
  selectedWallet: WalletDetailsProps;
  onConnectionComplete: () => void;
}

export function WalletConnectionStatus({
  isConnecting,
  selectedWallet,

  onConnectionComplete,
}: WalletConnectionStatusProps) {
  const [progress, setProgress] = useState(0);
  const [connectionStep, setConnectionStep] = useState("");

  useEffect(() => {
    if (isConnecting) {
      setProgress(0);
      const steps = [
        "Initializing connection...",
        "Opening wallet...",
        "Waiting for approval...",
        "Confirm the wallet connection",
        "Finalizing connection...",
      ];

      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          setConnectionStep(steps[currentStep]);
          setProgress((currentStep + 1) * 20);
          currentStep++;
        } else {
          clearInterval(interval);
          setProgress(100);
          setTimeout(() => {
            onConnectionComplete();
          }, 1000);
        }
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [isConnecting, onConnectionComplete]);

  if (!selectedWallet) return null;

  const IconComponent = selectedWallet.icon;

  return (
    <Drawer open={isConnecting} direction="right">
      <DrawerContent className="h-full w-[400px] ml-auto bg-gray-900 border-gray-800">
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col items-center justify-center flex-1 px-6">
          <div className="mb-8">
            <div
              className={`w-24 h-24 bg-linear-to-br ${selectedWallet.bgColor} rounded-2xl flex items-center justify-center text-white text-4xl mx-auto mb-4 animate-pulse`}
            >
              <IconComponent />
            </div>
            <h3 className="text-white text-xl font-semibold mb-2 text-center">
              {selectedWallet.name}
            </h3>
            <p className="text-gray-400 text-center">{connectionStep}</p>
          </div>

          <div className="relative w-32 h-32 mx-auto">
            <svg
              className="w-32 h-32 transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-700"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                className="text-orange-500 transition-all duration-500 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-xl font-bold">{progress}%</span>
            </div>
          </div>

          <div className="flex justify-center gap-1 mt-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
