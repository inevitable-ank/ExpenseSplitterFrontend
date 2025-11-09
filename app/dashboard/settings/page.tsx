"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { User, Lock, Bell, Trash2 } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-neutral-600 mt-2">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader className="flex items-center gap-3">
          <User size={24} className="text-primary" />
          <h3 className="font-semibold">Profile Settings</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <input type="text" value="John" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <input type="text" value="Doe" className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" value="john@example.com" className="input-field" />
          </div>
          <Button className="btn-primary">Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader className="flex items-center gap-3">
          <Lock size={24} className="text-primary" />
          <h3 className="font-semibold">Security</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <input type="password" placeholder="••••••••" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <input type="password" placeholder="••••••••" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input type="password" placeholder="••••••••" className="input-field" />
          </div>
          <Button className="btn-primary">Update Password</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader className="flex items-center gap-3">
          <Bell size={24} className="text-primary" />
          <h3 className="font-semibold">Notifications</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Email notifications for expenses", desc: "Get notified when expenses are added" },
            { label: "Debt reminders", desc: "Receive reminders for pending debts" },
            { label: "Weekly summary", desc: "Get a weekly summary of your finances" },
            { label: "Marketing emails", desc: "Receive tips and updates about ExpenseSplitter" },
          ].map((item, i) => (
            <label
              key={i}
              className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-neutral-50"
            >
              <input type="checkbox" defaultChecked={i < 3} className="rounded" />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs text-neutral-600">{item.desc}</p>
              </div>
            </label>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-error/30 bg-error/5">
        <CardHeader className="flex items-center gap-3">
          <Trash2 size={24} className="text-error" />
          <h3 className="font-semibold text-error">Danger Zone</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-neutral-600">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <Button className="px-4 py-2 bg-error text-white hover:bg-error/90 rounded-lg font-medium transition-colors">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
