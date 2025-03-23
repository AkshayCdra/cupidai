"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface FadeInSectionProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  once?: boolean
}

export function FadeInSection({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  threshold = 0.1,
  once = true,
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Map direction to initial transform value
  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(30px)"
      case "down":
        return "translateY(-30px)"
      case "left":
        return "translateX(30px)"
      case "right":
        return "translateX(-30px)"
      case "none":
        return "none"
      default:
        return "translateY(30px)"
    }
  }

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If we've already animated once and the "once" prop is true, don't animate again
        if (hasAnimated && once) return

        if (entry.isIntersecting) {
          setIsVisible(true)
          setHasAnimated(true)

          // If once is true, unobserve after animation
          if (once) {
            observer.unobserve(currentRef)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: "0px",
      },
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [hasAnimated, once, threshold])

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : getTransform(),
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

