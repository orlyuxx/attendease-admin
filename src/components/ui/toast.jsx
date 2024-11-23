"use client";
import * as React from "react"
import { cn } from "@/lib/utils"
import { ToastPrimitive } from "@/components/ui/toast"
import { X, CheckCircle2, XCircle } from "lucide-react"

export function Toaster() {
  return (
    <div id="toast-container" className="fixed bottom-4 right-4 z-50" />
  )
}

export function toast({ title, description, variant = "default", icon }) {
  const container = document.getElementById('toast-container')
  if (!container) return

  const toastElement = document.createElement('div')
  toastElement.className = `mb-2 p-4 rounded-md shadow-lg transition-all duration-300 ${
    variant === 'destructive' 
      ? 'bg-red-100 text-red-900 border border-red-200'
      : 'bg-green-300 text-white border border-green-600'
  }`

  const iconSvg = variant === 'destructive' 
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 text-red-600"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15803d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>`

  toastElement.innerHTML = `
    <div class="flex items-center">
      ${iconSvg}
      <div class="flex flex-col gap-1">
        ${title ? `<h3 class="font-bold">${title}</h3>` : ''}
        ${description ? `<p class="text-sm font-bold">${description}</p>` : ''}
      </div>
    </div>
  `

  container.appendChild(toastElement)

  toastElement.style.opacity = '0'
  setTimeout(() => {  
    toastElement.style.opacity = '1'
  }, 100)

  setTimeout(() => {
    toastElement.style.opacity = '0'
    setTimeout(() => {
      toastElement.remove()
    }, 300)
  }, 5000)
}

function Toast({ className, variant, icon, ...props }) {
  return (
    <ToastPrimitive.Root
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full",
        className
      )}
      {...props}
    >
      <div className="flex gap-3">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="flex flex-col gap-1">
          {props.children}
        </div>
      </div>
      <ToastPrimitive.Close className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  )
}
