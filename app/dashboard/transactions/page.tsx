"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, Edit2, Trash2, Filter, Download } from "lucide-react"

interface Transaction {
  id: string
  description: string
  amount: number
  category: string
  date: string
  group: string
  paidBy: string
  splitWith: number
  status: "settled" | "pending"
}

export default function TransactionsPage() {
  const [showModal, setShowModal] = useState(false)
  const [filterCategory, setFilterCategory] = useState("all")
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "food",
    date: "",
    group: "",
    splitWith: [] as string[],
  })

  const transactions: Transaction[] = [
    {
      id: "1",
      description: "Italian Restaurant",
      amount: 240,
      category: "Food",
      date: "2024-01-15",
      group: "Weekend Trip",
      paidBy: "You",
      splitWith: 4,
      status: "pending",
    },
    {
      id: "2",
      description: "Grocery Shopping",
      amount: 85.5,
      category: "Food",
      date: "2024-01-14",
      group: "Apartment Shared",
      paidBy: "John",
      splitWith: 2,
      status: "settled",
    },
    {
      id: "3",
      description: "Gas Station",
      amount: 42.0,
      category: "Transport",
      date: "2024-01-13",
      group: "Road Trip",
      paidBy: "Sarah",
      splitWith: 3,
      status: "pending",
    },
    {
      id: "4",
      description: "Movie Tickets",
      amount: 60.0,
      category: "Entertainment",
      date: "2024-01-12",
      group: "Movie Night",
      paidBy: "You",
      splitWith: 3,
      status: "settled",
    },
  ]

  const categories = ["Food", "Transport", "Entertainment", "Accommodation", "Utilities", "Other"]
  const groups = ["Weekend Trip", "Apartment Shared", "Road Trip", "Movie Night"]

  const filteredTransactions =
    filterCategory === "all" ? transactions : transactions.filter((t) => t.category === filterCategory)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setShowModal(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-neutral-600 mt-2">Track all your expenses across groups</p>
        </div>
        <div className="flex gap-2 flex-col sm:flex-row">
          <Button className="btn-secondary flex items-center justify-center gap-2">
            <Download size={20} /> Export
          </Button>
          <Button onClick={() => setShowModal(true)} className="btn-primary flex items-center justify-center gap-2">
            <Plus size={20} /> Add Transaction
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Filter size={20} className="text-neutral-400" />
            <div className="flex gap-2 flex-wrap flex-1">
              <button
                onClick={() => setFilterCategory("all")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterCategory === "all"
                    ? "bg-primary text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterCategory === cat
                      ? "bg-primary text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-neutral-50">
                <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                <th className="px-6 py-4 text-left text-sm font-semibold hidden md:table-cell">Group</th>
                <th className="px-6 py-4 text-left text-sm font-semibold hidden lg:table-cell">Paid By</th>
                <th className="px-6 py-4 text-left text-sm font-semibold hidden sm:table-cell">Date</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Amount</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-border hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{tx.description}</p>
                      <p className="text-sm text-neutral-600">{tx.category}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className="text-sm">{tx.group}</p>
                  </td>
                  <td className="px-6 py-4 hidden lg:table-cell">
                    <p className="text-sm">{tx.paidBy}</p>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <p className="text-sm text-neutral-600">{tx.date}</p>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold">${tx.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tx.status === "settled" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 hover:bg-neutral-100 rounded-lg">
                        <Edit2 size={16} className="text-neutral-600" />
                      </button>
                      <button className="p-2 hover:bg-neutral-100 rounded-lg">
                        <Trash2 size={16} className="text-error" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl my-8">
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Add Transaction</h2>
              <button onClick={() => setShowModal(false)} className="text-neutral-600 hover:text-neutral-900 text-2xl">
                ✕
              </button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="e.g., Restaurant dinner"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-neutral-500">$</span>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        placeholder="0.00"
                        className="input-field pl-8"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Category & Date */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input-field"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                {/* Group & Split */}
                <div>
                  <label className="block text-sm font-medium mb-2">Group</label>
                  <select
                    value={formData.group}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Select a group</option>
                    {groups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Split With */}
                <div>
                  <label className="block text-sm font-medium mb-3">Split With</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["John", "Sarah", "Mike", "Alex"].map((person) => (
                      <label
                        key={person}
                        className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-neutral-50"
                      >
                        <input
                          type="checkbox"
                          checked={formData.splitWith.includes(person)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, splitWith: [...formData.splitWith, person] })
                            } else {
                              setFormData({ ...formData, splitWith: formData.splitWith.filter((p) => p !== person) })
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{person}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <Button onClick={() => setShowModal(false)} className="flex-1 btn-secondary">
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 btn-primary">
                    Add Transaction
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
