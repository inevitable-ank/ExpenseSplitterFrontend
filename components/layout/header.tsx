"use client"

import { Bell, Search } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"

export function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-20">
      <div className="flex items-center justify-between px-6 py-4 lg:ml-64">
        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:flex items-center gap-3 bg-neutral-100 px-4 py-2 rounded-lg">
          <Search size={18} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent border-0 focus:outline-none text-sm"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-neutral-100 rounded-lg relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
          </button>
          <Avatar className="w-10 h-10">
            <span className="bg-primary text-white flex items-center justify-center w-full h-full rounded-full text-sm font-semibold">
              JD
            </span>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
