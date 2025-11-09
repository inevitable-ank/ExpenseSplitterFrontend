"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users, Wallet, ArrowRight, Plus } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const balanceData = [
  { month: "Jan", balance: 2400 },
  { month: "Feb", balance: 1398 },
  { month: "Mar", balance: 3200 },
  { month: "Apr", balance: 2780 },
  { month: "May", balance: 1890 },
  { month: "Jun", balance: 2390 },
]

const expenseData = [
  { category: "Food", amount: 400 },
  { category: "Transport", amount: 300 },
  { category: "Entertainment", amount: 200 },
  { category: "Other", amount: 150 },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-neutral-600 mt-2">Welcome back! Here's your financial overview.</p>
        </div>
        <Button className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
          <Plus size={20} /> Add Transaction
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Balance */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">Total Balance</p>
                <p className="text-3xl font-bold mt-2">Rs. 3,240</p>
                <p className="text-success text-sm mt-2 flex items-center gap-1">
                  <TrendingUp size={16} /> +12% from last month
                </p>
              </div>
              <div className="w-14 h-14 bg-primary/20 rounded-lg flex items-center justify-center">
                <Wallet className="text-primary" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Groups */}
        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">Active Groups</p>
                <p className="text-3xl font-bold mt-2">5</p>
                <p className="text-neutral-600 text-sm mt-2">3 people average</p>
              </div>
              <div className="w-14 h-14 bg-success/20 rounded-lg flex items-center justify-center">
                <Users className="text-success" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* You Owe */}
        <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">You Owe</p>
                <p className="text-3xl font-bold mt-2 text-warning">Rs. 450</p>
                <p className="text-neutral-600 text-sm mt-2">To 3 people</p>
              </div>
              <div className="w-14 h-14 bg-warning/20 rounded-lg flex items-center justify-center">
                <ArrowRight className="text-warning" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Balance Chart */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Balance Over Time</h3>
            <p className="text-neutral-600 text-sm mt-1">Last 6 months</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={balanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Expense Categories</h3>
            <p className="text-neutral-600 text-sm mt-1">This month</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <h3 className="font-semibold">Recent Transactions</h3>
          <a href="/dashboard/transactions" className="text-primary text-sm font-medium hover:underline">
            View all
          </a>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Dinner with friends", amount: "-Rs. 45.50", category: "Food", date: "Today" },
              { name: "Grocery split", amount: "-Rs. 32.00", category: "Food", date: "Yesterday" },
              { name: "Uber ride share", amount: "-Rs. 12.50", category: "Transport", date: "2 days ago" },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">{tx.name}</p>
                  <p className="text-sm text-neutral-600">{tx.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-error">{tx.amount}</p>
                  <p className="text-sm text-neutral-600">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
