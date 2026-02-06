'use client';

import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import { toast as sonnerToast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import Image from 'next/image';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  image?: string;
  duration?: number;
}

interface ToastContextValue {
  addToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const addToast = useCallback(
    ({ message, type, image, duration }: Omit<Toast, 'id'>) => {
      const options = {
        duration: duration || 4000,
      };

      // Custom content with image if present
      const content = image ? (
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
            <Image src={image} alt="" fill className="object-cover" sizes="40px" />
          </div>
          <p className="text-sm font-medium">{message}</p>
        </div>
      ) : message;

      switch (type) {
        case 'success':
          sonnerToast.success(content, options);
          break;
        case 'error':
          sonnerToast.error(content, options);
          break;
        default:
          sonnerToast(content, options);
      }
    },
    []
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
}
