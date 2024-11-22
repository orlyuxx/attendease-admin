"use client";
import * as React from "react"

export function Toaster() {
  return (
    <div id="toast-container" className="fixed bottom-4 right-4 z-50" />
  )
}

export function toast({ title, description, variant = "default" }) {
  const container = document.getElementById('toast-container')
  if (!container) return

  const toastElement = document.createElement('div')
  toastElement.className = `mb-2 p-4 rounded-md shadow-lg transition-all duration-300 ${
    variant === 'destructive' 
      ? 'bg-red-100 text-red-900 border border-red-200'
      : 'bg-green-100 text-green-900 border border-green-200'
  }`

  toastElement.innerHTML = `
    <div class="flex flex-col gap-1">
      ${title ? `<h3 class="font-medium">${title}</h3>` : ''}
      ${description ? `<p class="text-sm">${description}</p>` : ''}
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
