"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, LayoutDashboard, Users, Wallet, PieChart, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Groups", href: "/dashboard/groups" },
    { icon: Wallet, label: "Transactions", href: "/dashboard/transactions" },
    { icon: PieChart, label: "Budget", href: "/dashboard/budget" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 hover:bg-neutral-100 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-neutral-900 text-white transition-transform duration-300 z-30 overflow-y-auto",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-neutral-800">
          <h1 className="text-2xl font-bold text-primary">ExpenseSplitter</h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive(item.href) ? "bg-primary text-white" : "text-neutral-300 hover:bg-neutral-800",
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-neutral-300 hover:bg-neutral-800 rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 lg:hidden z-20" onClick={() => setIsOpen(false)} />}
    </>
  )
}
