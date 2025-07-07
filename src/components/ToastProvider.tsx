"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Toast } from "./Toast";

type ToastType = "success" | "error";
type PositionType = "top-center" | "bottom-center";

type ToastState = {
  open: boolean;
  message: string;
  type: ToastType;
  position: PositionType;
};

type ToastContextType = {
  showToast: (
    message: string,
    type?: ToastType,
    position?: PositionType,
  ) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    type: "success",
    position: "top-center",
  });

  const showToast = useCallback(
    (
      message: string,
      type: ToastType = "success",
      position: PositionType = "top-center",
    ) => {
      setToast((prev) => ({
        ...prev,
        open: false,
      }));
      setTimeout(() => {
        setToast({ open: true, message, type, position });
      }, 50);
    },
    [],
  );

  const closeToast = () => setToast((prev) => ({ ...prev, open: false }));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        open={toast.open}
        message={toast.message}
        type={toast.type}
        position={toast.position}
        onClose={closeToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};
