import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import pool from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    // Check if user already exists
    const [existingUsers] = await pool.query("SELECT * FROM oauth WHERE email = ?", [email])
    if (existingUsers.length > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 })
    }

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Insert new user
    await pool.query("INSERT INTO oauth (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword])

    return NextResponse.json({ message: "User created successfully" })
  } catch (error) {
    console.error("Sign up error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

