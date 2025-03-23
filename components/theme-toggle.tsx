"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("neon-love-theme") as "light" | "dark" | null

    if (storedTheme) {
      setTheme(storedTheme)
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light")
    }
  }, [])

  // Update theme when state changes
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    } else {
      document.documentElement.classList.remove("light")
      document.documentElement.classList.add("dark")
    }

    localStorage.setItem("neon-love-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-opacity-20 transition-all duration-200 ease-in-out neon-button-subtle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-indigo-900 dark:text-white" />
      ) : (
        <Sun className="h-5 w-5 text-white" />
      )}
    </button>
  )
}

