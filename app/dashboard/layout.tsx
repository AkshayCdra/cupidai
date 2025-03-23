"use client"

import type React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Authentication check temporarily disabled
  return <>{children}</>
}

