import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { first_name, last_name, email, password } = await request.json()

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

    const response = await fetch(`${apiUrl}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ message: error.message || "Signup failed" }, { status: response.status })
    }

    const data = await response.json()
    const res = NextResponse.json({ success: true, data })

    if (data.token) {
      res.cookies.set("auth_token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
      })
    }

    return res
  } catch (error) {
    console.log("[v0] Signup API error:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
