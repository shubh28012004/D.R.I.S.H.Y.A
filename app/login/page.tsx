import type { Metadata } from "next"
import LoginForm from "@/components/auth/login-form"
import HowToUse from "@/components/auth/how-to-use"

export const metadata: Metadata = {
  title: "Login | D.R.I.S.H.Y.A",
  description: "Sign in to your D.R.I.S.H.Y.A account",
}

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          D.R.I.S.H.Y.A
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "D.R.I.S.H.Y.A has revolutionized our city's surveillance system, making it smarter and more efficient
              than ever before."
            </p>
            
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome to D.R.I.S.H.Y.A</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account or create a new one</p>
          </div>
          <LoginForm />
          <HowToUse />
        </div>
      </div>
    </div>
  )
}

