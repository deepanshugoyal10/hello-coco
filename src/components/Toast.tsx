"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import clsx from "clsx";
import { CheckCircle, XCircle } from "lucide-react";

export type ToastType = "success" | "error";
export type ToastPosition = "top-center" | "bottom-center";

export function Toast({
  open,
  setOpen,
  message,
  type = "success",
  position = "top-center",
  autoCloseSeconds = 5,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  autoCloseSeconds?: number;
}) {
  const positionClass = {
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  const typeClass = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
  };

  const Icon = type === "success" ? CheckCircle : XCircle;

  React.useEffect(() => {
    if (open) {
      setTimeout(() => setOpen(false), autoCloseSeconds * 1000);
    }
  }, [open, autoCloseSeconds, setOpen]);

  return (
    <ToastPrimitive.Provider swipeDirection="up">
      <ToastPrimitive.Root
        className={clsx(
          "fixed z-50 px-5 py-3 rounded-md shadow-xl transition-all duration-300 w-fit flex items-center gap-2",
          positionClass[position],
          typeClass[type],
        )}
        open={open}
        onOpenChange={setOpen}
      >
        <Icon className="w-5 h-5 text-white" />
        <ToastPrimitive.Title className="text-sm font-medium">
          {message}
        </ToastPrimitive.Title>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport className="fixed inset-0 pointer-events-none" />
    </ToastPrimitive.Provider>
  );
}
