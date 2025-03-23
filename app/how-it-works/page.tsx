"use client"

import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { FadeInSection } from "@/components/fade-in-section"
import { Mic, User, Heart, ArrowRight, MessageCircle, Video, Bot, ChevronRight } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender to-lavender-light dark:from-indigo-950 dark:to-purple-950 text-indigo-950 dark:text-white relative">
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

      {/* Header */}
      <header className="sticky top-0 z-50 bg-lavender/80 dark:bg-indigo-950/80 backdrop-blur-md shadow-md py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/images/meetx-logo.png" alt="MEETX" width={100} height={40} className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="bg-transparent border border-pink-500 dark:border-teal-400 text-pink-500 dark:text-teal-400 px-4 py-2 rounded-full hover:bg-pink-500 dark:hover:bg-teal-400 hover:text-white dark:hover:text-indigo-950 transition-colors neon-button neon-button-3d"
            >
              Dashboard
            </Link>
            <Link
              href="/sign-in"
              className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors neon-button-pink neon-button-3d"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <FadeInSection direction="up" delay={0.2}>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-900 dark:text-white">
              How <span className="text-pink-500 dark:text-teal-400 neon-text">MEETX</span> Works
            </h1>
            <p className="text-lg text-indigo-800 dark:text-gray-300 mb-8">
              Our AI-powered dating platform makes finding your perfect match easier than ever. Just talk to our
              assistant, and we'll do the rest!
            </p>
          </div>
        </FadeInSection>
      </section>

      {/* Steps Section */}
      <section className="container mx-auto px-4 py-8 mb-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Step 1: Talk to AI */}
          <FadeInSection direction="left" delay={0.3}>
            <div className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-8 backdrop-blur-sm neon-card-subtle mb-16 relative">
              <div className="absolute -top-6 left-8 bg-pink-500 dark:bg-teal-400 text-white dark:text-indigo-950 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold neon-button-pink">
                1
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-white">Talk to Our AI Assistant</h2>
                  <p className="text-indigo-800 dark:text-gray-300 mb-4">
                    Start by having a conversation with our AI assistant. Tell it about your interests, preferences, and
                    what you're looking for in a partner.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 shrink-0 mt-0.5 mr-2" />
                      <span>Share your hobbies and interests</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 shrink-0 mt-0.5 mr-2" />
                      <span>Describe your ideal relationship</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 shrink-0 mt-0.5 mr-2" />
                      <span>Our AI analyzes your personality traits</span>
                    </li>
                  </ul>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors neon-button-pink neon-button-3d"
                  >
                    Try the AI Assistant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-800/50 rounded-xl p-6 neon-card-3d">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-end">
                      <div className="max-w-[80%] p-3 rounded-xl bg-pink-500 text-white rounded-tr-none neon-button-pink">
                        <div className="flex items-start gap-2">
                          <p>
                            I enjoy hiking, photography, and trying new restaurants. I'm looking for someone who shares
                            my love for adventure.
                          </p>
                          <User className="h-5 w-5 mt-1 shrink-0" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="max-w-[80%] p-3 rounded-xl bg-indigo-100 dark:bg-indigo-800 text-indigo-900 dark:text-white rounded-tl-none neon-button-teal">
                        <div className="flex items-start gap-2">
                          <Bot className="h-5 w-5 mt-1 shrink-0" />
                          <p>
                            Based on your interests, I'd recommend highlighting outdoor activities in your profile. I've
                            identified your personality type as ENFP, which is great for adventurous relationships!
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      <div className="w-12 h-12 rounded-full bg-pink-500 dark:bg-teal-400 flex items-center justify-center neon-button-pink">
                        <Mic className="h-6 w-6 text-white dark:text-indigo-950" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Step 2: Profile Creation */}
          <FadeInSection direction="right" delay={0.4}>
            <div className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-8 backdrop-blur-sm neon-card-subtle mb-16 relative">
              <div className="absolute -top-6 left-8 bg-pink-500 dark:bg-teal-400 text-white dark:text-indigo-950 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold neon-button-pink">
                2
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <div className="bg-indigo-100 dark:bg-indigo-800/50 rounded-xl p-6 neon-card-3d">
                    <div className="flex flex-col">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-20 h-20 rounded-full bg-pink-100 dark:bg-indigo-800 flex items-center justify-center border-2 border-pink-500 dark:border-teal-400 neon-icon-box">
                          <User className="h-10 w-10 text-pink-500 dark:text-teal-400" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-medium text-indigo-900 dark:text-white">Personality Type</h3>
                          <div className="bg-pink-100 dark:bg-indigo-800 px-3 py-2 rounded-lg mt-1">
                            <span className="font-bold text-pink-500 dark:text-teal-400">ENFP</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-indigo-900 dark:text-white">Interests</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span className="bg-pink-100 dark:bg-indigo-800 text-pink-600 dark:text-teal-300 px-2 py-1 rounded-full text-xs">
                              Hiking
                            </span>
                            <span className="bg-pink-100 dark:bg-indigo-800 text-pink-600 dark:text-teal-300 px-2 py-1 rounded-full text-xs">
                              Photography
                            </span>
                            <span className="bg-pink-100 dark:bg-indigo-800 text-pink-600 dark:text-teal-300 px-2 py-1 rounded-full text-xs">
                              Food
                            </span>
                            <span className="bg-pink-100 dark:bg-indigo-800 text-pink-600 dark:text-teal-300 px-2 py-1 rounded-full text-xs">
                              Adventure
                            </span>
                            <span className="bg-pink-100 dark:bg-indigo-800 text-pink-600 dark:text-teal-300 px-2 py-1 rounded-full text-xs">
                              Travel
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-white">AI Creates Your Profile</h2>
                  <p className="text-indigo-800 dark:text-gray-300 mb-4">
                    Based on your conversation, our AI automatically creates a personalized profile that highlights your
                    unique personality and interests.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 shrink-0 mt-0.5 mr-2" />
                      <span>Identifies your Myers-Briggs personality type</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 shrink-0 mt-0.5 mr-2" />
                      <span>Extracts your key interests and preferences</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 shrink-0 mt-0.5 mr-2" />
                      <span>Creates a profile optimized for meaningful matches</span>
                    </li>
                  </ul>
                  <Link
                    href="/profile"
                    className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors neon-button-pink neon-button-3d"
                  >
                    View Profile Example
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Step 3: Find Matches */}
          <FadeInSection direction="left" delay={0.5}>
            <div className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-8 backdrop-blur-sm neon-card-subtle relative">
              <div className="absolute -top-6 left-8 bg-pink-500 dark:bg-teal-400 text-white dark:text-indigo-950 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold neon-button-pink">
                3
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-white">Connect with Your Matches</h2>
                  <p className="text-indigo-800 dark:text-gray-300 mb-4">
                    Our advanced matching algorithm finds compatible profiles based on personality, interests, and
                    preferences, with special emphasis on those currently online.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 shrink-0 mt-0.5 mr-2" />
                      <span>See compatibility scores for each match</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 shrink-0 mt-0.5 mr-2" />
                      <span>Filter by online status for immediate connections</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 shrink-0 mt-0.5 mr-2" />
                      <span>Message, video call, or like potential matches</span>
                    </li>
                  </ul>
                  <Link
                    href="/matches"
                    className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors neon-button-pink neon-button-3d"
                  >
                    See Matches Example
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-800/50 rounded-xl p-6 neon-card-3d">
                  <div className="relative">
                    <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
                      <Image
                        src="/placeholder.svg?height=400&width=300&text=Emma"
                        alt="Match profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-indigo-900/90 rounded-full px-2 py-1 flex items-center">
                      <div className="h-2 w-2 rounded-full mr-1 bg-green-500"></div>
                      <span className="text-xs font-medium text-indigo-900 dark:text-white">Online</span>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-pink-500 dark:bg-teal-400 rounded-full px-3 py-1 flex items-center neon-button-pink">
                      <span className="text-sm font-bold text-white dark:text-indigo-950">92% Match</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 flex justify-center items-center gap-1 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors neon-button-pink">
                      <Heart className="h-4 w-4" />
                      <span>Like</span>
                    </button>
                    <button className="flex-1 flex justify-center items-center gap-1 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-800 text-indigo-900 dark:text-white hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>Message</span>
                    </button>
                    <button className="flex-1 flex justify-center items-center gap-1 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors">
                      <Video className="h-4 w-4" />
                      <span>Call</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <FadeInSection direction="up" delay={0.2}>
          <div className="bg-gradient-to-r from-pink-200/80 to-lavender/80 dark:from-indigo-800/80 dark:to-purple-800/80 rounded-2xl p-8 md:p-12 text-center backdrop-blur-md shadow-lg neon-card-3d max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-indigo-900 dark:text-white">
              Ready to Find Your <span className="text-pink-500 neon-text-pink">Perfect Match</span>?
            </h2>
            <p className="text-indigo-800 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of singles who have already found meaningful connections through our AI-powered platform.
              Start your journey today!
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors neon-button-pink neon-button-3d text-lg font-medium"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </FadeInSection>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-pink-200 dark:border-indigo-800 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold flex items-center">
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
      </footer>
    </div>
  )
}

