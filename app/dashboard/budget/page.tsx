"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, Edit2, Trash2, AlertCircle } from "lucide-react"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface Budget {
  id: string
  category: string
  limit: number
  spent: number
  icon: string
}

export default function BudgetPage() {
  const [showModal, setShowModal] = useState(false)
  const [showAddIncome, setShowAddIncome] = useState(false)

  const budgets: Budget[] = [
    { id: "1", category: "Food & Dining", limit: 500, spent: 340, icon: "🍔" },
    { id: "2", category: "Transport", limit: 300, spent: 245, icon: "🚗" },
    { id: "3", category: "Entertainment", limit: 200, spent: 180, icon: "🎬" },
    { id: "4", category: "Utilities", limit: 150, spent: 140, icon: "💡" },
    { id: "5", category: "Shopping", limit: 400, spent: 520, icon: "🛍️" },
    { id: "6", category: "Fitness", limit: 100, spent: 85, icon: "💪" },
  ]

  const monthlyTrend = [
    { month: "Jan", income: 4000, expense: 2400 },
    { month: "Feb", income: 4200, expense: 2210 },
    { month: "Mar", income: 4000, expense: 2290 },
    { month: "Apr", income: 4500, expense: 2000 },
    { month: "May", income: 4200, expense: 2181 },
    { month: "Jun", income: 4800, expense: 2500 },
  ]

  const categoryBreakdown = [
    { name: "Food", value: 340 },
    { name: "Transport", value: 245 },
    { name: "Entertainment", value: 180 },
    { name: "Utilities", value: 140 },
    { name: "Shopping", value: 520 },
    { name: "Fitness", value: 85 },
  ]

  const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"]

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0)
  const totalIncome = 4800
  const remaining = totalIncome - totalSpent

  const overBudget = budgets.filter((b) => b.spent > b.limit)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Budget</h1>
          <p className="text-neutral-600 mt-2">Track your income and expenses</p>
        </div>
        <div className="flex gap-2 flex-col sm:flex-row">
          <Button
            onClick={() => setShowAddIncome(true)}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <Plus size={20} /> Add Income
          </Button>
          <Button onClick={() => setShowModal(true)} className="btn-primary flex items-center justify-center gap-2">
            <Plus size={20} /> Set Budget
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {/* Income */}
        <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <CardContent className="p-6">
            <div>
              <p className="text-neutral-600 text-sm font-medium">Total Income</p>
              <p className="text-2xl font-bold mt-2 text-success">${totalIncome}</p>
              <p className="text-success text-xs mt-2">This month</p>
            </div>
          </CardContent>
        </Card>

        {/* Total Expenses */}
        <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
          <CardContent className="p-6">
            <div>
              <p className="text-neutral-600 text-sm font-medium">Total Expenses</p>
              <p className="text-2xl font-bold mt-2 text-warning">${totalSpent}</p>
              <p className="text-warning text-xs mt-2">{Math.round((totalSpent / totalIncome) * 100)}% of income</p>
            </div>
          </CardContent>
        </Card>

        {/* Budget Remaining */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div>
              <p className="text-neutral-600 text-sm font-medium">Remaining</p>
              <p className="text-2xl font-bold mt-2 text-primary">${remaining}</p>
              <p className="text-primary text-xs mt-2">Available to spend</p>
            </div>
          </CardContent>
        </Card>

        {/* Over Budget */}
        <Card
          className={`bg-gradient-to-br ${overBudget.length > 0 ? "from-error/5 to-error/10 border-error/20" : "from-neutral-50 to-neutral-100 border-neutral-200"}`}
        >
          <CardContent className="p-6">
            <div>
              <p className="text-neutral-600 text-sm font-medium">Over Budget</p>
              <p className={`text-2xl font-bold mt-2 ${overBudget.length > 0 ? "text-error" : "text-success"}`}>
                {overBudget.length}
              </p>
              <p className={`text-xs mt-2 ${overBudget.length > 0 ? "text-error" : "text-success"}`}>
                {overBudget.length > 0 ? "Categories" : "All good!"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Trend */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Income vs Expenses</h3>
            <p className="text-neutral-600 text-sm mt-1">Last 6 months</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} name="Income" />
                <Line type="monotone" dataKey="expense" stroke="#f59e0b" strokeWidth={2} name="Expense" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Distribution */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Expense Distribution</h3>
            <p className="text-neutral-600 text-sm mt-1">By category</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={categoryBreakdown} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Budget Categories */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold">Budget Categories</h3>
          <p className="text-neutral-600 text-sm mt-1">Track your spending per category</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgets.map((budget) => {
              const percentage = (budget.spent / budget.limit) * 100
              const isOverBudget = budget.spent > budget.limit

              return (
                <div
                  key={budget.id}
                  className="p-4 border border-border rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{budget.icon}</span>
                      <div>
                        <p className="font-medium">{budget.category}</p>
                        <p className="text-sm text-neutral-600">
                          ${budget.spent} / ${budget.limit}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-neutral-200 rounded-lg">
                        <Edit2 size={16} className="text-neutral-600" />
                      </button>
                      <button className="p-2 hover:bg-neutral-200 rounded-lg">
                        <Trash2 size={16} className="text-error" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isOverBudget ? "bg-error" : percentage > 75 ? "bg-warning" : "bg-success"
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>

                  {isOverBudget && (
                    <div className="flex items-center gap-2 mt-2 text-error text-sm">
                      <AlertCircle size={14} />
                      <span>Over budget by ${(budget.spent - budget.limit).toFixed(2)}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Set Budget Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Set Budget</h2>
              <button onClick={() => setShowModal(false)} className="text-neutral-600 hover:text-neutral-900 text-2xl">
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select className="input-field">
                  <option>Food & Dining</option>
                  <option>Transport</option>
                  <option>Entertainment</option>
                  <option>Utilities</option>
                  <option>Shopping</option>
                  <option>Fitness</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Monthly Limit</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-neutral-500">$</span>
                  <input type="number" placeholder="500" className="input-field pl-8" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setShowModal(false)} className="flex-1 btn-secondary">
                  Cancel
                </Button>
                <Button className="flex-1 btn-primary">Set Budget</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Income Modal */}
      {showAddIncome && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Add Income</h2>
              <button
                onClick={() => setShowAddIncome(false)}
                className="text-neutral-600 hover:text-neutral-900 text-2xl"
              >
                ✕
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-neutral-500">$</span>
                  <input type="number" placeholder="0.00" className="input-field pl-8" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Source</label>
                <input type="text" placeholder="e.g., Salary, Freelance" className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input type="date" className="input-field" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button onClick={() => setShowAddIncome(false)} className="flex-1 btn-secondary">
                  Cancel
                </Button>
                <Button className="flex-1 btn-primary">Add Income</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
