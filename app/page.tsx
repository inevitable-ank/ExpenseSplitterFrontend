"use client"

import Link from "next/link"
import { ArrowRight, Users, PieChart, TrendingDown } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 lg:px-12 py-6 bg-white/80 backdrop-blur border-b border-border">
        <div className="text-2xl font-bold text-primary">ExpenseSplitter</div>
        <div className="hidden md:flex gap-8 items-center">
          <a href="#features" className="text-neutral-600 hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-neutral-600 hover:text-primary transition-colors">
            How it works
          </a>
          <Link href="/auth/login" className="btn-secondary">
            Log In
          </Link>
          <Link href="/auth/signup" className="btn-primary">
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 lg:px-12 py-20 md:py-32 max-w-6xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 text-balance">
            Split Expenses with Friends, <span className="text-primary">Effortlessly</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto text-balance">
            Stop calculating who owes whom. ExpenseSplitter automatically tracks shared expenses and debts, making group
            finances simple and transparent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="btn-primary flex items-center justify-center gap-2 text-lg">
              Get Started <ArrowRight size={20} />
            </Link>
            <Link href="/auth/login" className="btn-secondary flex items-center justify-center gap-2 text-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 lg:px-12 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Group Expenses</h3>
              <p className="text-gray-600">
                Create groups with friends and family. Split any expense equally or by custom amounts.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <TrendingDown className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Debt Tracking</h3>
              <p className="text-gray-600">
                Automatic debt calculations. See exactly who owes whom and settle balances easily.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="text-amber-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Personal Budget</h3>
              <p className="text-gray-600">
                Track personal income and expenses. Visualize your spending patterns with beautiful charts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 lg:px-12 py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Create Group", description: "Start a group with your friends" },
              { step: "2", title: "Add Expenses", description: "Log shared expenses easily" },
              { step: "3", title: "Track Debts", description: "See who owes whom instantly" },
              { step: "4", title: "Settle Up", description: "Make payments and close debts" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 lg:px-12 py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to simplify group finances?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of users who trust ExpenseSplitter to manage their shared expenses.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-neutral-100 transition-colors"
          >
            Start Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-12 bg-neutral-900 text-neutral-400">
        <div className="max-w-6xl mx-auto text-center">
          <p>Copyright 2025 ExpenseSplitter. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
