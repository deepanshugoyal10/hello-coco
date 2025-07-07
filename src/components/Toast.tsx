"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export type ToastProps = {
  open: boolean;
  message: string;
  type?: "success" | "error";
  position?: "top-center" | "bottom-center";
  autoCloseSeconds?: number;
  onClose: () => void;
};

export const Toast = ({
  open,
  message,
  type = "success",
  position = "top-center",
  autoCloseSeconds = 5,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(onClose, autoCloseSeconds * 1000);
      return () => clearTimeout(timer);
    }
  }, [open, autoCloseSeconds, onClose]);

  const icon =
    type === "success" ? (
      <CheckCircle2 className="text-green-600" />
    ) : (
      <AlertTriangle className="text-red-600" />
    );

  const bg =
    type === "success"
      ? "bg-green-100 text-green-800 border-green-400"
      : "bg-red-100 text-red-800 border-red-400";

  const positionClasses =
    position === "top-center"
      ? "top-4 left-1/2 -translate-x-1/2"
      : "bottom-4 left-1/2 -translate-x-1/2";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: position === "top-center" ? -20 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position === "top-center" ? -20 : 20 }}
          transition={{ duration: 0.3 }}
          className={`fixed z-50 px-4 py-3 rounded-md border shadow-md ${bg} ${positionClasses}`}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-sm font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
