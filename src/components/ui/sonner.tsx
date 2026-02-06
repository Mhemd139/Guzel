"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-soft-lg group-[.toaster]:rounded-2xl font-sans",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium rounded-full",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium rounded-full",
          error: "group-[.toaster]:text-red-600 group-[.toaster]:border-red-100 group-[.toaster]:bg-red-50",
          success: "group-[.toaster]:text-green-600 group-[.toaster]:border-green-100 group-[.toaster]:bg-green-50",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
