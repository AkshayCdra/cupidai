"use client"

import Image from "next/image"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from "react"
import { FadeInSection } from "@/components/fade-in-section"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [pageLoaded, setPageLoaded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Handle "Get Started" click
  const handleGetStarted = () => {
    if (user) {
      router.push("/profile")
    } else {
      router.push("/sign-in")
    }
  }

  // Set page as loaded after a short delay
  useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true)
    }, 100)
  }, [])

  return (
    <main
      className={`min-h-screen bg-gradient-to-br from-lavender to-lavender-light dark:from-indigo-950 dark:to-purple-950 text-indigo-950 dark:text-white transition-colors duration-300 relative ${pageLoaded ? "page-fade-in" : "opacity-0"}`}
    >
      {/* Background Images - Theme specific */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Dark theme background */}
        <div className="hidden dark:block">
          <Image src="/images/neon-flowers.png" alt="Neon Flowers" fill className="object-cover opacity-30" priority />
        </div>
        {/* Light theme background */}
        <div className="block dark:hidden">
          <Image src="/images/light-flower.png" alt="Light Flower" fill className="object-cover opacity-20" priority />
        </div>
      </div>

      {/* Navigation */}
      <FadeInSection direction="down" delay={0.2} className="w-full sticky-header-wrapper">
        <nav
          className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "py-3 bg-lavender/80 dark:bg-indigo-950/80 backdrop-blur-md shadow-md sticky-animation" : "py-6 bg-transparent"}`}
        >
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image src="/images/meetx-logo.png" alt="MEETX" width={100} height={40} className="h-8 w-auto" />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#"
                className="text-indigo-900 dark:text-white hover:text-pink-500 dark:hover:text-teal-400 transition-colors neon-hover"
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-indigo-900 dark:text-white hover:text-pink-500 dark:hover:text-teal-400 transition-colors neon-hover"
              >
                Features
              </Link>
              <Link
                href="/how-it-works"
                className="text-indigo-900 dark:text-white hover:text-pink-500 dark:hover:text-teal-400 transition-colors neon-hover"
              >
                How It Works
              </Link>
              <Link
                href="#"
                className="text-indigo-900 dark:text-white hover:text-pink-500 dark:hover:text-teal-400 transition-colors neon-hover"
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-indigo-900 dark:text-white hover:text-pink-500 dark:hover:text-teal-400 transition-colors neon-hover"
              >
                Contact
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user ? (
                <Link
                  href="/dashboard"
                  className="bg-transparent border border-pink-500 dark:border-teal-400 text-pink-500 dark:text-teal-400 px-4 py-2 rounded-full hover:bg-pink-500 dark:hover:bg-teal-400 hover:text-white dark:hover:text-indigo-950 transition-colors neon-button neon-button-3d"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  className="bg-transparent border border-pink-500 dark:border-teal-400 text-pink-500 dark:text-teal-400 px-4 py-2 rounded-full hover:bg-pink-500 dark:hover:bg-teal-400 hover:text-white dark:hover:text-indigo-950 transition-colors neon-button neon-button-3d"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </nav>
      </FadeInSection>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
        <FadeInSection direction="left" delay={0.4}>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-900 dark:text-white">
              AI-Powered <br />
              <span className="text-pink-500 neon-text-pink">Connections</span> for the{" "}
              <span className="text-teal-400 neon-text-teal">Digital Age</span>
            </h1>
            <p className="text-lg mb-8 text-indigo-800 dark:text-gray-200">
              Our advanced AI matches you with compatible partners based on personality, interests, and communication
              style. ✨
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-pink-500 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors neon-button-pink neon-button-3d"
            >
              Get Started
            </button>
          </div>
        </FadeInSection>

        <FadeInSection direction="right" delay={0.6}>
          <div className="grid grid-cols-3 gap-2 relative">
            <div className="col-span-2 row-span-2">
              <div className="rounded-lg overflow-hidden border-2 border-pink-500 dark:border-teal-400 neon-card neon-card-3d">
                <Image
                  src="/images/profile1.png"
                  alt="Dating profile"
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="rounded-lg overflow-hidden border-2 border-pink-500 neon-card-pink neon-card-3d">
                <Image
                  src="/images/profile2.png"
                  alt="Profile"
                  width={150}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="rounded-lg overflow-hidden border-2 border-pink-500 neon-card-pink neon-card-3d">
                <Image
                  src="/images/profile3.png"
                  alt="Profile"
                  width={150}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="rounded-lg overflow-hidden border-2 border-teal-400 neon-card-teal neon-card-3d">
                <Image
                  src="/images/profile4.png"
                  alt="Profile"
                  width={150}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <FadeInSection direction="up" delay={0.2}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 text-indigo-900 dark:text-white">
              Real <span className="text-teal-500 dark:text-teal-400 neon-text-teal">Connections</span>, Real{" "}
              <span className="text-pink-500 neon-text-pink">Results</span>
            </h2>
            <p className="text-indigo-800 dark:text-gray-300">
              Our AI-powered matching has helped thousands find meaningful relationships. Here are their stories.
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FadeInSection direction="left" delay={0.4}>
            <div className="bg-white/80 dark:bg-indigo-900/50 p-6 rounded-xl border border-pink-300 dark:border-teal-400/30 neon-card-subtle neon-card-3d shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 flex-shrink-0">
                  <Image
                    src="/images/profile1.png"
                    alt="Kayla"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex text-pink-500 dark:text-teal-400 mb-2 neon-stars">★ ★ ★ ★ ★</div>
                  <p className="text-sm mb-4 text-indigo-800 dark:text-white">
                    I was skeptical about dating apps, but MEETX's AI matching was spot on! The personality analysis
                    brought me and James together. We've been dating for six months and now we're engaged! 💍
                  </p>
                  <p className="text-xs text-indigo-600 dark:text-gray-400">James Cold & Gina Kayla</p>
                </div>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection direction="right" delay={0.5}>
            <div className="bg-white/80 dark:bg-indigo-900/50 p-6 rounded-xl border border-pink-300 dark:border-teal-400/30 neon-card-subtle neon-card-3d shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 flex-shrink-0">
                  <Image
                    src="/images/profile3.png"
                    alt="Kevin"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex text-pink-500 dark:text-teal-400 mb-2 neon-stars">★ ★ ★ ★ ★</div>
                  <p className="text-sm mb-4 text-indigo-800 dark:text-white">
                    Other apps never understood what I was looking for. MEETX's AI analyzed my communication style and
                    found me matches that I actually connected with. Met Melissa here, and we've been together for 2
                    years! ❤️
                  </p>
                  <p className="text-xs text-indigo-600 dark:text-gray-400">Kevin Smith & Melissa</p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <FadeInSection direction="up" delay={0.2}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 text-indigo-900 dark:text-white">
              Upgrade to the{" "}
              <span className="text-teal-500 dark:text-teal-400 neon-text-teal">AI-Enhanced Experience</span>
            </h2>
            <p className="text-indigo-800 dark:text-gray-300 mb-8">
              Unlock advanced AI features for more accurate matching and deeper connections. Choose your plan! ✨
            </p>

            <div className="inline-flex bg-white/50 dark:bg-indigo-900/50 p-1 rounded-full mb-12 neon-toggle shadow-md">
              <button className="px-6 py-2 rounded-full bg-pink-500 dark:bg-teal-400 text-white dark:text-indigo-950 font-medium neon-button-3d">
                Monthly
              </button>
              <button className="px-6 py-2 rounded-full text-indigo-900 dark:text-white">Annually</button>
            </div>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <FadeInSection direction="left" delay={0.4}>
            <div className="bg-white/80 dark:bg-indigo-900/50 p-8 rounded-xl border border-pink-300 dark:border-teal-400/30 neon-card-subtle neon-card-3d shadow-md">
              <h3 className="text-2xl font-bold mb-1 text-indigo-900 dark:text-white">MEETX Plus</h3>
              <p className="text-sm text-indigo-700 dark:text-gray-300 mb-6">
                For users who want enhanced AI matching and premium features
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-pink-500 dark:text-teal-400 neon-text">3.99</span>
                <span className="text-indigo-700 dark:text-gray-300 text-sm">/month</span>
              </div>

              <button className="w-full bg-pink-400 dark:bg-indigo-800 text-white py-3 rounded-full mb-8 hover:bg-pink-500 dark:hover:bg-indigo-700 transition-colors neon-button-subtle neon-button-3d">
                Subscribe Now
              </button>

              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 dark:text-teal-400 mr-2 h-5 w-5 neon-icon" />
                  <span className="text-sm text-indigo-800 dark:text-white">Basic AI matching algorithm</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 dark:text-teal-400 mr-2 h-5 w-5 neon-icon" />
                  <span className="text-sm text-indigo-800 dark:text-white">Unlimited swipe & match</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 dark:text-teal-400 mr-2 h-5 w-5 neon-icon" />
                  <span className="text-sm text-indigo-800 dark:text-white">Unlimited chat with match</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 dark:text-teal-400 mr-2 h-5 w-5 neon-icon" />
                  <span className="text-sm text-indigo-800 dark:text-white">3x AI-suggested conversation starters</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 dark:text-teal-400 mr-2 h-5 w-5 neon-icon" />
                  <span className="text-sm text-indigo-800 dark:text-white">Basic personality analysis</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 dark:text-teal-400 mr-2 h-5 w-5 neon-icon" />
                  <span className="text-sm text-indigo-800 dark:text-white">2x profile boosts per week</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 dark:text-teal-400 mr-2 h-5 w-5 neon-icon" />
                  <span className="text-sm text-indigo-800 dark:text-white">Video & voice call with match</span>
                </li>
              </ul>
            </div>
          </FadeInSection>

          <FadeInSection direction="right" delay={0.5}>
            <div className="bg-white/80 dark:bg-indigo-900/50 p-8 rounded-xl border border-pink-500/50 relative neon-card-pink-subtle neon-card-3d shadow-md">
              <div className="absolute -top-3 right-8 bg-pink-500 text-xs font-bold px-3 py-1 rounded-full neon-badge">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-1 text-indigo-900 dark:text-white">MEETX Elite</h3>
              <p className="text-sm text-indigo-700 dark:text-gray-300 mb-6">
                For users who want the most advanced AI features and premium experience
              </p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-pink-500 neon-text-pink">7.99</span>
                <span className="text-indigo-700 dark:text-gray-300 text-sm">/month</span>
              </div>

              <button className="w-full bg-pink-500 text-white py-3 rounded-full mb-8 hover:bg-pink-600 transition-colors neon-button-pink neon-button-3d">
                Subscribe Now
              </button>

              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 mr-2 h-5 w-5 neon-icon-pink" />
                  <span className="text-sm text-indigo-800 dark:text-white">Advanced AI matching algorithm</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 mr-2 h-5 w-5 neon-icon-pink" />
                  <span className="text-sm text-indigo-800 dark:text-white">Unlimited swipe & match</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 mr-2 h-5 w-5 neon-icon-pink" />
                  <span className="text-sm text-indigo-800 dark:text-white">Unlimited chat with match</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 mr-2 h-5 w-5 neon-icon-pink" />
                  <span className="text-sm text-indigo-800 dark:text-white">
                    Unlimited AI-suggested conversation starters
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 mr-2 h-5 w-5 neon-icon-pink" />
                  <span className="text-sm text-indigo-800 dark:text-white">
                    Deep personality analysis & compatibility
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 mr-2 h-5 w-5 neon-icon-pink" />
                  <span className="text-sm text-indigo-800 dark:text-white">Unlimited profile boosts</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 mr-2 h-5 w-5 neon-icon-pink" />
                  <span className="text-sm text-indigo-800 dark:text-white">Video & voice call with all users</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 mr-2 h-5 w-5 neon-icon-pink" />
                  <span className="text-sm text-indigo-800 dark:text-white">VIP profile badge</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-pink-500 mr-2 h-5 w-5 neon-icon-pink" />
                  <span className="text-sm text-indigo-800 dark:text-white">AI-powered message suggestions</span>
                </li>
              </ul>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <FadeInSection direction="up" delay={0.3}>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-pink-500 mb-2 neon-text-pink">500K+</h3>
              <p className="text-lg text-indigo-800 dark:text-white">Active Members 👥</p>
            </div>
          </FadeInSection>

          <FadeInSection direction="up" delay={0.4}>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold text-pink-500 mb-2 neon-text-pink">180K+</h3>
              <p className="text-lg text-indigo-800 dark:text-white">AI-Powered Matches 💖</p>
            </div>
          </FadeInSection>

          <FadeInSection direction="up" delay={0.5}>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold">
                <span className="text-teal-500 dark:text-teal-400 neon-text-teal">98%</span>
              </h3>
              <p className="text-lg text-indigo-800 dark:text-white">Match Satisfaction Rate 🔥</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <FadeInSection direction="up" delay={0.2}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 text-indigo-900 dark:text-white">
              What Makes MEETX <span className="text-teal-500 dark:text-teal-400 neon-text-teal">Different?</span>
            </h2>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeInSection direction="up" delay={0.3}>
            <div className="bg-white/80 dark:bg-indigo-900/50 p-8 rounded-xl border border-pink-300 dark:border-teal-400/30 text-center neon-card-subtle neon-card-3d shadow-md">
              <div className="w-20 h-20 mx-auto mb-6 bg-pink-100 dark:bg-indigo-800 rounded-lg flex items-center justify-center border-2 border-pink-500 dark:border-teal-400 neon-icon-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-pink-500 dark:text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-indigo-900 dark:text-white">
                Advanced AI
                <br />
                Matching Algorithm
              </h3>
              <p className="text-sm text-indigo-700 dark:text-gray-300">
                Our proprietary AI analyzes personality traits, communication styles, and interests for truly compatible
                matches
              </p>
            </div>
          </FadeInSection>

          <FadeInSection direction="up" delay={0.4}>
            <div className="bg-white/80 dark:bg-indigo-900/50 p-8 rounded-xl border border-pink-300 dark:border-teal-400/30 text-center neon-card-subtle neon-card-3d shadow-md">
              <div className="w-20 h-20 mx-auto mb-6 bg-pink-100 dark:bg-indigo-800 rounded-lg flex items-center justify-center border-2 border-pink-500 dark:border-teal-400 neon-icon-box">
                <div className="text-pink-500 dark:text-teal-400 font-bold text-xl neon-text">98%</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-indigo-900 dark:text-white">
                Real-Time
                <br />
                Compatibility Score
              </h3>
              <p className="text-sm text-indigo-700 dark:text-gray-300">
                Our AI calculates precise compatibility scores based on multiple dimensions of personality and
                preferences
              </p>
            </div>
          </FadeInSection>

          <FadeInSection direction="up" delay={0.5}>
            <div className="bg-white/80 dark:bg-indigo-900/50 p-8 rounded-xl border border-pink-300 dark:border-teal-400/30 text-center neon-card-subtle neon-card-3d shadow-md">
              <div className="w-20 h-20 mx-auto mb-6 bg-pink-100 dark:bg-indigo-800 rounded-lg flex items-center justify-center border-2 border-pink-500 dark:border-teal-400 neon-icon-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-pink-500 dark:text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-indigo-900 dark:text-white">
                AI Conversation
                <br />
                Assistant
              </h3>
              <p className="text-sm text-indigo-700 dark:text-gray-300">
                Get personalized conversation starters and message suggestions based on your match's profile and
                interests
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <FadeInSection direction="up" delay={0.3}>
          <div className="bg-gradient-to-r from-pink-200/80 to-lavender/80 dark:from-indigo-800/80 dark:to-purple-800/80 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center backdrop-blur-md shadow-lg neon-card-3d">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4 text-indigo-900 dark:text-white">
                Start your <span className="text-pink-500 neon-text-pink">AI-powered</span> dating journey now!
              </h2>
              <p className="text-indigo-800 dark:text-gray-300 mb-6">
                Join thousands of singles who found meaningful connections with our advanced AI matching. Download our
                app today!
              </p>
              <div className="flex space-x-4">
                <button className="bg-indigo-900 dark:bg-black text-white px-4 py-2 rounded-lg flex items-center neon-button-subtle neon-button-3d">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                  App Store
                </button>
                <button className="bg-indigo-900 dark:bg-black text-white px-4 py-2 rounded-lg flex items-center neon-button-subtle neon-button-3d">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    />
                  </svg>
                  Play Store
                </button>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-pink-200 dark:border-indigo-800 relative z-10">
        <FadeInSection direction="up" delay={0.2}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <Image src="/images/meetx-logo.png" alt="MEETX" width={80} height={30} className="h-6 w-auto" />
              </div>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link
                href="#"
                className="text-indigo-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-teal-400 transition-colors neon-hover"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-indigo-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-teal-400 transition-colors neon-hover"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-indigo-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-teal-400 transition-colors neon-hover"
              >
                Help
              </Link>
              <Link
                href="#"
                className="text-indigo-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-teal-400 transition-colors neon-hover"
              >
                Contact
              </Link>
            </div>
            <div className="text-sm text-indigo-600 dark:text-gray-400">© 2023 MEETX. All rights reserved.</div>
          </div>
        </FadeInSection>
      </footer>
    </main>
  )
}

