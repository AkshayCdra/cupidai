"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FadeInSection } from "@/components/fade-in-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from "lucide-react"
import { GoogleSignInButton } from "@/components/google-sign-in-button"

export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [googleError, setGoogleError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      setLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setLoading(false)
      return
    }

    try {
      // Temporarily bypass authentication and redirect to dashboard
      // Comment out the actual authentication call
      // await createUser(email, password, name)

      // Just redirect to dashboard without authentication
      router.push("/dashboard")
    } catch (err: any) {
      console.error(err)
      setError(getErrorMessage(err.code))
    } finally {
      setLoading(false)
    }
  }

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered."
      case "auth/invalid-email":
        return "Invalid email address format."
      case "auth/weak-password":
        return "Password is too weak. Please use a stronger password."
      case "auth/operation-not-allowed":
        return "Account creation is currently disabled."
      default:
        return "An error occurred during sign up. Please try again."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender to-lavender-light dark:from-indigo-950 dark:to-purple-950 text-indigo-950 dark:text-white flex flex-col">
      {/* 3D Neon Container */}
      <div className="neon-3d-container"></div>

      {/* Header */}
      <header className="w-full py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image src="/images/meetx-logo.png" alt="MEETX" width={100} height={40} className="h-8 w-auto" />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Sign Up Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <FadeInSection direction="up" delay={0.2} className="w-full max-w-md">
          <div className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-8 backdrop-blur-sm neon-card-subtle shadow-xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-900 dark:text-white">
              Create Your <span className="text-pink-500 dark:text-teal-400 neon-text">Account</span>
            </h1>

            {/* Update the error display section to include Google errors */}
            {(error || googleError) && (
              <div className="mb-6 p-3 bg-pink-100 dark:bg-indigo-800/70 border border-pink-500 dark:border-teal-400 rounded-lg flex items-center gap-2 text-pink-600 dark:text-teal-300">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="text-sm">{error || googleError}</p>
              </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-indigo-900 dark:text-gray-200">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-indigo-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-white placeholder-indigo-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-teal-400 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-indigo-900 dark:text-gray-200">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-indigo-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-white placeholder-indigo-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-teal-400 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-indigo-900 dark:text-gray-200">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-indigo-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-white placeholder-indigo-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-teal-400 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-indigo-400 dark:text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-indigo-400 dark:text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-indigo-900 dark:text-gray-200"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-indigo-400 dark:text-gray-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-white placeholder-indigo-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-teal-400 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-pink-500 dark:text-teal-400 focus:ring-pink-500 dark:focus:ring-teal-400 border-indigo-300 dark:border-indigo-700 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-indigo-800 dark:text-gray-300">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-pink-500 dark:text-teal-400 hover:text-pink-600 dark:hover:text-teal-300 neon-hover"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-pink-500 dark:text-teal-400 hover:text-pink-600 dark:hover:text-teal-300 neon-hover"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-pink-500 dark:bg-teal-400 dark:text-indigo-950 hover:bg-pink-600 dark:hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-teal-400 neon-button-pink neon-button-3d transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>

              {/* Add the Google sign-in button after the form submit button */}
              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-indigo-200 dark:border-indigo-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/80 dark:bg-indigo-900/50 text-indigo-700 dark:text-gray-300">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <GoogleSignInButton
                    text="Sign up with Google"
                    onError={(error) => {
                      console.error("Google sign-in error in sign-up page:", error)
                      if (error.code === "auth/unauthorized-domain") {
                        setGoogleError(
                          "This domain is not authorized for authentication. Temporarily bypassing authentication.",
                        )
                      } else if (error.message && error.message.includes("API key")) {
                        setGoogleError("Authentication service is not properly configured. Please contact support.")
                      } else {
                        setGoogleError("Google sign-up failed. Please try again.")
                      }
                    }}
                  />
                </div>
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-indigo-800 dark:text-gray-300">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-medium text-pink-500 dark:text-teal-400 hover:text-pink-600 dark:hover:text-teal-300 neon-hover"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </FadeInSection>
      </div>
    </div>
  )
}

