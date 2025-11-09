"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Users, DollarSign, TrendingDown, Plus, Trash2 } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const memberData = [
  { name: "You", paid: 450, owed: 320 },
  { name: "John", paid: 380, owed: 510 },
  { name: "Sarah", paid: 520, owed: 140 },
  { name: "Mike", paid: 290, owed: 410 },
]

const expenseBreakdown = [
  { name: "Food", value: 850, color: "#3b82f6" },
  { name: "Transport", value: 420, color: "#10b981" },
  { name: "Entertainment", value: 310, color: "#f59e0b" },
  { name: "Accommodation", value: 660, color: "#ef4444" },
]

export default function GroupDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Weekend Trip</h1>
          <p className="text-neutral-600 mt-2">Las Vegas trip with friends</p>
        </div>
        <Button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus size={20} /> Add Expense
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">Total Spent</p>
                <p className="text-3xl font-bold mt-2">Rs. 2,240</p>
              </div>
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="text-primary" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">Group Members</p>
                <p className="text-3xl font-bold mt-2">4</p>
              </div>
              <div className="w-14 h-14 bg-success/10 rounded-lg flex items-center justify-center">
                <Users className="text-success" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 text-sm font-medium">You Owe</p>
                <p className="text-3xl font-bold mt-2 text-warning">Rs. 130</p>
              </div>
              <div className="w-14 h-14 bg-warning/10 rounded-lg flex items-center justify-center">
                <TrendingDown className="text-warning" size={28} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Payment Breakdown */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Payment Breakdown</h3>
            <p className="text-neutral-600 text-sm mt-1">Who paid what</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={memberData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Bar dataKey="paid" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="owed" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Expense Categories</h3>
            <p className="text-neutral-600 text-sm mt-1">Distribution</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={expenseBreakdown} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Members and Balances */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <h3 className="font-semibold">Members & Balances</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "You (John)", email: "john@example.com", balance: 130, status: "owed", color: "warning" },
              { name: "Sarah", email: "sarah@example.com", balance: 380, status: "owes", color: "success" },
              { name: "Mike", email: "mike@example.com", balance: 120, status: "owed", color: "warning" },
              { name: "Alex", email: "alex@example.com", balance: 95, status: "owes", color: "success" },
            ].map((member, i) => (
              <div key={i} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-neutral-600">{member.email}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={`font-semibold ${member.color === "warning" ? "text-warning" : "text-success"}`}>
                      {member.status === "owed" ? "-" : "+"}Rs. {member.balance}
                    </p>
                    <p className="text-xs text-neutral-600">{member.status === "owed" ? "You owe" : "Owes you"}</p>
                  </div>
                  <button className="p-2 hover:bg-neutral-100 rounded-lg">
                    <Trash2 size={18} className="text-error" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <h3 className="font-semibold">Recent Transactions</h3>
          <a href="#" className="text-primary text-sm font-medium hover:underline">
            View all
          </a>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { description: "Restaurant dinner", amount: "Rs. 240", paidBy: "John", splitWith: "4 people" },
              { description: "Hotel accommodation", amount: "Rs. 400", paidBy: "Sarah", splitWith: "4 people" },
              { description: "Taxi ride", amount: "Rs. 45", paidBy: "Mike", splitWith: "2 people" },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <p className="text-sm text-neutral-600">
                    {tx.paidBy} paid • Split with {tx.splitWith}
                  </p>
                </div>
                <p className="font-semibold">{tx.amount}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
