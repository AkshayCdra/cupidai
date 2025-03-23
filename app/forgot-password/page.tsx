"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { FadeInSection } from "@/components/fade-in-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { Mail, AlertCircle, CheckCircle } from "lucide-react"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
    } catch (err: any) {
      console.error(err)
      setError(getErrorMessage(err.code))
    } finally {
      setLoading(false)
    }
  }

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/invalid-email":
        return "Invalid email address format."
      case "auth/user-not-found":
        return "No account found with this email."
      case "auth/too-many-requests":
        return "Too many requests. Please try again later."
      default:
        return "An error occurred. Please try again."
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

      {/* Forgot Password Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <FadeInSection direction="up" delay={0.2} className="w-full max-w-md">
          <div className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-8 backdrop-blur-sm neon-card-subtle shadow-xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-indigo-900 dark:text-white">
              Reset <span className="text-pink-500 dark:text-teal-400 neon-text">Password</span>
            </h1>

            {success ? (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-500 dark:border-green-400 rounded-lg flex items-center gap-3 text-green-700 dark:text-green-300">
                <CheckCircle className="h-5 w-5 shrink-0" />
                <p>Password reset email sent! Check your inbox for instructions.</p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-6 p-3 bg-pink-100 dark:bg-indigo-800/70 border border-pink-500 dark:border-teal-400 rounded-lg flex items-center gap-2 text-pink-600 dark:text-teal-300">
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <p className="text-indigo-800 dark:text-gray-300 mb-6 text-center">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>

                <form onSubmit={handleResetPassword} className="space-y-6">
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

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-pink-500 dark:bg-teal-400 dark:text-indigo-950 hover:bg-pink-600 dark:hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-teal-400 neon-button-pink neon-button-3d transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {loading ? "Sending..." : "Reset Password"}
                  </button>
                </form>
              </>
            )}

            <div className="text-center mt-6">
              <p className="text-sm text-indigo-800 dark:text-gray-300">
                Remember your password?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-pink-500 dark:text-teal-400 hover:text-pink-600 dark:hover:text-teal-300 neon-hover"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  )
}

