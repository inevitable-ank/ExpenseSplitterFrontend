"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Check, AlertCircle } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Debt {
  id: string
  person: string
  email: string
  amount: number
  type: "owed" | "owes"
  lastUpdated: string
  group: string
}

export default function DebtsPage() {
  const [showSettleModal, setShowSettleModal] = useState(false)
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null)

  const debts: Debt[] = [
    {
      id: "1",
      person: "Sarah",
      email: "sarah@example.com",
      amount: 340,
      type: "owed",
      lastUpdated: "2 days ago",
      group: "Weekend Trip",
    },
    {
      id: "2",
      person: "Mike",
      email: "mike@example.com",
      amount: 125,
      type: "owes",
      lastUpdated: "1 week ago",
      group: "Apartment Shared",
    },
    {
      id: "3",
      person: "John",
      email: "john@example.com",
      amount: 85,
      type: "owed",
      lastUpdated: "3 days ago",
      group: "Movie Night",
    },
    {
      id: "4",
      person: "Alex",
      email: "alex@example.com",
      amount: 200,
      type: "owes",
      lastUpdated: "5 days ago",
      group: "Road Trip",
    },
  ]

  const debtSummary = [
    { name: "Sarah", balance: 340, type: "owed" },
    { name: "Mike", balance: 125, type: "owes" },
    { name: "John", balance: 85, type: "owed" },
    { name: "Alex", balance: 200, type: "owes" },
  ]

  const totalOwed = debts.filter((d) => d.type === "owed").reduce((sum, d) => sum + d.amount, 0)
  const totalOwes = debts.filter((d) => d.type === "owes").reduce((sum, d) => sum + d.amount, 0)
  const netBalance = totalOwed - totalOwes

  const handleSettle = () => {
    // Handle settlement
    setShowSettleModal(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Debts</h1>
          <p className="text-neutral-600 mt-2">Track and settle all your debts at a glance</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Owed to You */}
        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">Total Owed to You</p>
                <p className="text-3xl font-bold mt-2 text-success">Rs. {totalOwed}</p>
                <p className="text-success text-sm mt-2">{debts.filter((d) => d.type === "owed").length} people</p>
              </div>
              <div className="w-14 h-14 bg-success/20 rounded-lg flex items-center justify-center">
                <ArrowDown className="text-success" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total You Owe */}
        <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">Total You Owe</p>
                <p className="text-3xl font-bold mt-2 text-warning">Rs. {totalOwes}</p>
                <p className="text-warning text-sm mt-2">{debts.filter((d) => d.type === "owes").length} people</p>
              </div>
              <div className="w-14 h-14 bg-warning/20 rounded-lg flex items-center justify-center">
                <ArrowUp className="text-warning" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Net Balance */}
        <Card
          className={`bg-gradient-to-br ${netBalance >= 0 ? "from-success/5 to-success/10 border-success/20" : "from-error/5 to-error/10 border-error/20"}`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">Net Balance</p>
                <p className={`text-3xl font-bold mt-2 ${netBalance >= 0 ? "text-success" : "text-error"}`}>
                  {netBalance >= 0 ? "+" : ""}Rs. {netBalance}
                </p>
                <p className={`text-sm mt-2 ${netBalance >= 0 ? "text-success" : "text-error"}`}>
                  {netBalance >= 0 ? "People owe you" : "You owe overall"}
                </p>
              </div>
              <div
                className={`w-14 h-14 ${netBalance >= 0 ? "bg-success/20" : "bg-error/20"} rounded-lg flex items-center justify-center`}
              >
                <AlertCircle className={netBalance >= 0 ? "text-success" : "text-error"} size={28} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Debt Distribution */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Debt Distribution</h3>
            <p className="text-neutral-600 text-sm mt-1">Who owes what</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={debtSummary}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="balance" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Settlement Timeline */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Quick Actions</h3>
            <p className="text-neutral-600 text-sm mt-1">Manage your debts</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full p-4 border border-border rounded-lg hover:bg-neutral-50 transition-colors text-left">
                <p className="font-medium">Simplify Debts</p>
                <p className="text-sm text-neutral-600 mt-1">Automatically calculate optimal settlements</p>
              </button>
              <button className="w-full p-4 border border-border rounded-lg hover:bg-neutral-50 transition-colors text-left">
                <p className="font-medium">Settlement History</p>
                <p className="text-sm text-neutral-600 mt-1">View all past settlements</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Debt List */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">All Debts</h3>
            <p className="text-neutral-600 text-sm mt-1">Detailed breakdown of all transactions</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {debts.map((debt) => (
              <div
                key={debt.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        debt.type === "owed" ? "bg-success" : "bg-warning"
                      }`}
                    >
                      {debt.person[0]}
                    </div>
                    <div>
                      <p className="font-medium">{debt.person}</p>
                      <p className="text-sm text-neutral-600">{debt.group}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className={`font-semibold ${debt.type === "owed" ? "text-success" : "text-warning"}`}>
                      {debt.type === "owed" ? "+" : "-"}Rs. {debt.amount}
                    </p>
                    <p className="text-xs text-neutral-600">{debt.lastUpdated}</p>
                  </div>

                  {/* Settlement Buttons */}
                  {debt.type === "owed" ? (
                    <button
                      onClick={() => {
                        setSelectedDebt(debt)
                        setShowSettleModal(true)
                      }}
                      className="px-4 py-2 bg-success/10 text-success font-medium rounded-lg hover:bg-success/20 transition-colors"
                    >
                      Request
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedDebt(debt)
                        setShowSettleModal(true)
                      }}
                      className="px-4 py-2 bg-warning/10 text-warning font-medium rounded-lg hover:bg-warning/20 transition-colors"
                    >
                      Pay
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settlement Modal */}
      {showSettleModal && selectedDebt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedDebt.type === "owed" ? "Request Payment" : "Pay Debt"}</h2>
              <button
                onClick={() => setShowSettleModal(false)}
                className="text-neutral-600 hover:text-neutral-900 text-2xl"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Debt Summary */}
              <div className="p-4 bg-neutral-50 rounded-lg">
                <p className="text-sm text-neutral-600 mb-1">From</p>
                <p className="font-semibold text-lg">{selectedDebt.person}</p>
              </div>

              <div>
                <p className="text-sm text-neutral-600 mb-2">Amount</p>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-neutral-500 text-lg">Rs.</span>
                  <input
                    type="number"
                    value={selectedDebt.amount}
                    readOnly
                    className="input-field pl-8 bg-neutral-50"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm text-neutral-600 mb-2">Method</p>
                <div className="space-y-2">
                  {["Venmo", "PayPal", "Bank Transfer", "Cash"].map((method) => (
                    <label
                      key={method}
                      className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-neutral-50"
                    >
                      <input
                        type="radio"
                        name="method"
                        value={method}
                        className="rounded-full"
                        defaultChecked={method === "Venmo"}
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setShowSettleModal(false)} className="flex-1 btn-secondary">
                  Cancel
                </Button>
                <Button onClick={handleSettle} className="flex-1 btn-primary flex items-center justify-center gap-2">
                  <Check size={18} />
                  {selectedDebt.type === "owed" ? "Send Request" : "Mark as Paid"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
