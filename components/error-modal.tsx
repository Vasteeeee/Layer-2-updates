"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface ErrorModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message?: string;
}

export function ErrorModal({
  isOpen,
  onOpenChange,
  title = "Error updating wallet",
  message = "Please try again.",
}: ErrorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl rounded-2xl p-0 gap-0">
        <div className="flex flex-col items-center text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>

          <DialogHeader className="space-y-2 mb-6">
            <DialogTitle className="text-lg font-semibold text-red-500 text-center">
              {title}
            </DialogTitle>
            <p className="text-red-500 text-sm text-center">{message}</p>
          </DialogHeader>

          <Button
            onClick={() => onOpenChange(false)}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-lg font-medium min-w-[100px]"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
