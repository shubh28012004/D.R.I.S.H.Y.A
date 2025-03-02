import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import pool from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const [rows] = await pool.query("SELECT * FROM oauth WHERE email = ?", [email])
    const user = rows[0]

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 })
    }

    return NextResponse.json({ name: user.name, email: user.email })
  } catch (error) {
    console.error("Sign in error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

