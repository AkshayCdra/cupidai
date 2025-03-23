"use client"

import type React from "react"

import { useState } from "react"
import { signIn, createUser } from "@/lib/firebase"
import { useRouter } from "next/navigation"

interface FallbackAuthProps {
  mode: "signin" | "signup"
  onSuccess?: () => void
}

export function FallbackAuth({ mode, onSuccess }: FallbackAuthProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (mode === "signup") {
        await createUser(email, password, name)
      } else {
        await signIn(email, password)
      }
      onSuccess?.() || router.push("/dashboard")
    } catch (err: any) {
      console.error("Authentication error:", err)
      setError(err.message || "Authentication failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 p-4 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white/70 dark:bg-indigo-900/50">
      <h3 className="text-lg font-medium text-indigo-900 dark:text-white mb-4">
        {mode === "signin" ? "Sign in with email instead" : "Sign up with email instead"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-indigo-900 dark:text-gray-200">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={mode === "signup"}
              className="mt-1 block w-full px-3 py-2 border border-indigo-200 dark:border-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 dark:focus:ring-teal-400 focus:border-pink-500 dark:focus:border-teal-400"
            />
          </div>
        )}

        <div>
          <label htmlFor="fallback-email" className="block text-sm font-medium text-indigo-900 dark:text-gray-200">
            Email
          </label>
          <input
            id="fallback-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-indigo-200 dark:border-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 dark:focus:ring-teal-400 focus:border-pink-500 dark:focus:border-teal-400"
          />
        </div>

        <div>
          <label htmlFor="fallback-password" className="block text-sm font-medium text-indigo-900 dark:text-gray-200">
            Password
          </label>
          <input
            id="fallback-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-indigo-200 dark:border-indigo-700 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 dark:focus:ring-teal-400 focus:border-pink-500 dark:focus:border-teal-400"
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-2 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 dark:bg-teal-400 dark:text-indigo-950 hover:bg-pink-600 dark:hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-teal-400 neon-button-pink neon-button-3d"
        >
          {loading ? "Processing..." : mode === "signin" ? "Sign in" : "Sign up"}
        </button>
      </form>
    </div>
  )
}

