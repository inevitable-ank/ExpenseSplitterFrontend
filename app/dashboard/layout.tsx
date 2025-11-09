"use client"

import type React from "react"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <Header />
        <main className="p-4 lg:p-8 bg-neutral-50 min-h-[calc(100vh-80px)]">{children}</main>
      </div>
    </div>
  )
}
