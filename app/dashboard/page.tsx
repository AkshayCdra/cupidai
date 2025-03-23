"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { FadeInSection } from "@/components/fade-in-section"
import { Mic, MicOff, Bot, Heart, X, MessageCircle, Video, User, Brain } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for the potential match
const matchProfile = {
  name: "James",
  age: 24,
  personality: "ENFP",
  bio: "Outdoor enthusiast who loves hiking, camping, and photography. Always looking for new adventures!",
  interests: ["Hiking", "Photography", "Travel", "Camping", "Coffee"],
  compatibility: 92,
  photo: "/placeholder.svg?height=400&width=400&text=James",
  location: "New York, NY",
}

// Mock transcriptions for simulating voice input
const mockTranscriptions = [
  "I'm a traveller who likes to travel and go for hiking on weekends. I enjoy exploring new trails and taking photos of nature.",
  "I love hiking in the mountains and exploring new trails. Photography is another passion of mine, especially landscape and wildlife shots.",
  "I'm really into outdoor activities like hiking and camping. I also enjoy traveling to new places and experiencing different cultures.",
  "Hiking is one of my favorite activities. I try to go at least twice a month to different trails. I also enjoy photography and capturing nature.",
]

// Mock AI insights based on user's speech
const mockAIInsights = [
  "Like hiking? James is an avid hiker who explores new trails every weekend! You two might enjoy planning a hiking trip together.",
  "Your interest in photography matches with James! He specializes in landscape photography during his hiking trips.",
  "Travel seems to be a common interest! James has visited 12 countries and loves exploring new cultures, just like you mentioned.",
  "Your outdoor interests align perfectly with James! He's also passionate about hiking and nature photography.",
]

export default function RealTimePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState("")
  const [aiInsight, setAIInsight] = useState("")
  const [audioLevel, setAudioLevel] = useState<number[]>(Array(20).fill(0))
  const [profileUpdates, setProfileUpdates] = useState<string[]>([])
  const [compatibility, setCompatibility] = useState(78)
  const [showLikeButtons, setShowLikeButtons] = useState(false)

  const router = useRouter()

  // Refs for animation frames
  const animationFrameRef = useRef<number | null>(null)
  const transcriptionTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const insightTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Simulate audio levels for visualization
  useEffect(() => {
    if (isRecording) {
      const updateAudioLevels = () => {
        setAudioLevel(
          Array(20)
            .fill(0)
            .map(() => Math.random() * 100),
        )
        animationFrameRef.current = requestAnimationFrame(updateAudioLevels)
      }

      animationFrameRef.current = requestAnimationFrame(updateAudioLevels)
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      setAudioLevel(Array(20).fill(0))
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isRecording])

  // Handle recording toggle
  const toggleRecording = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      // Clear previous timeouts
      if (transcriptionTimeoutRef.current) {
        clearTimeout(transcriptionTimeoutRef.current)
      }
      if (insightTimeoutRef.current) {
        clearTimeout(insightTimeoutRef.current)
      }

      // Reset states
      setTranscription("")
      setAIInsight("")
      setProfileUpdates([])

      // Select a random transcription
      const randomIndex = Math.floor(Math.random() * mockTranscriptions.length)
      const fullText = mockTranscriptions[randomIndex]
      const aiResponse = mockAIInsights[randomIndex]

      // Simulate typing effect for transcription
      let charIndex = 0
      const typeTranscription = () => {
        if (charIndex < fullText.length) {
          setTranscription(fullText.substring(0, charIndex + 1))
          charIndex++
          transcriptionTimeoutRef.current = setTimeout(typeTranscription, 30)
        } else {
          // Stop recording when transcription is complete
          setIsRecording(false)

          // Start showing AI insight after transcription is complete
          let aiCharIndex = 0
          const typeAIInsight = () => {
            if (aiCharIndex < aiResponse.length) {
              setAIInsight(aiResponse.substring(0, aiCharIndex + 1))
              aiCharIndex++
              insightTimeoutRef.current = setTimeout(typeAIInsight, 30)
            } else {
              // Show profile updates after AI insight is complete
              updateProfileMatchingInfo()
              setShowLikeButtons(true)
            }
          }

          // Start typing AI insight after a short delay
          setTimeout(typeAIInsight, 500)
        }
      }

      // Start typing transcription after a short delay
      setTimeout(typeTranscription, 500)
    }
  }

  // Update profile matching information
  const updateProfileMatchingInfo = () => {
    const updates = [
      "Updating personality compatibility...",
      "Analyzing common interests...",
      "Calculating overall match score...",
    ]

    let index = 0
    const interval = setInterval(() => {
      if (index < updates.length) {
        setProfileUpdates((prev) => [...prev, updates[index]])
        index++
      } else {
        clearInterval(interval)
        // Increase compatibility score after analysis
        setCompatibility(92)
        // Save profile and redirect to matches
        saveProfileAndRedirect()
      }
    }, 1000)
  }

  // Save profile and redirect to matches
  const saveProfileAndRedirect = () => {
    // Show saving indicator
    setProfileUpdates((prev) => [...prev, "Saving profile to backend..."])

    // Simulate API call to save profile
    setTimeout(() => {
      setProfileUpdates((prev) => [...prev, "Profile saved successfully!"])

      // Store profile data in localStorage to simulate backend storage
      localStorage.setItem(
        "profileData",
        JSON.stringify({
          personalityType: matchProfile.personality,
          interests: matchProfile.interests,
          userMessage: transcription,
          aiResponse: aiInsight,
        }),
      )

      // Redirect to matches page after a short delay
      setTimeout(() => {
        router.push("/matches")
      }, 1500)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender to-lavender-light dark:from-indigo-950 dark:to-purple-950 text-indigo-950 dark:text-white">
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
              href="/profile"
              className="bg-transparent border border-pink-500 dark:border-teal-400 text-pink-500 dark:text-teal-400 px-4 py-2 rounded-full hover:bg-pink-500 dark:hover:bg-teal-400 hover:text-white dark:hover:text-indigo-950 transition-colors neon-button neon-button-3d flex items-center gap-1"
            >
              <User className="h-4 w-4" /> Profile
            </Link>
            <Link
              href="/personality"
              className="bg-transparent border border-pink-500 dark:border-teal-400 text-pink-500 dark:text-teal-400 px-4 py-2 rounded-full hover:bg-pink-500 dark:hover:bg-teal-400 hover:text-white dark:hover:text-indigo-950 transition-colors neon-button neon-button-3d flex items-center gap-1"
            >
              <Brain className="h-4 w-4" /> Personality
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-900 dark:text-white">
          Real-Time <span className="text-pink-500 dark:text-teal-400 neon-text">Matching</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Recording Panel */}
          <FadeInSection
            direction="left"
            delay={0.2}
            className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-6 backdrop-blur-sm neon-card-subtle"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 mb-4">
                <div
                  className={`absolute inset-0 rounded-full flex items-center justify-center border-4 ${
                    isRecording
                      ? "border-pink-500 dark:border-teal-400 animate-pulse"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                >
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center ${
                      isRecording
                        ? "bg-pink-500 dark:bg-teal-400 text-white"
                        : "bg-white dark:bg-indigo-800 text-pink-500 dark:text-teal-400 border-2 border-pink-500 dark:border-teal-400"
                    }`}
                    onClick={toggleRecording}
                  >
                    {isRecording ? <MicOff className="h-10 w-10" /> : <Mic className="h-10 w-10" />}
                  </div>
                </div>
              </div>

              <div className="text-center mb-4">
                <p className="text-indigo-900 dark:text-white font-medium">
                  {isRecording ? "Recording..." : "Tap to start recording"}
                </p>
              </div>

              {/* Audio Visualization */}
              <div className="w-full h-16 mb-6 flex items-center justify-center gap-1 bg-white/50 dark:bg-indigo-950/50 rounded-lg p-2">
                {audioLevel.map((level, index) => (
                  <div
                    key={index}
                    className={`w-2 rounded-full transition-all duration-100 ${
                      isRecording ? "bg-pink-500 dark:bg-teal-400" : "bg-gray-300 dark:bg-gray-700"
                    }`}
                    style={{ height: `${isRecording ? level : 10}%` }}
                  ></div>
                ))}
              </div>

              {/* Transcription */}
              <div className="w-full bg-white/70 dark:bg-indigo-900/70 rounded-lg p-4 min-h-[120px] text-indigo-900 dark:text-white">
                {transcription || (
                  <span className="text-gray-400 dark:text-gray-500">Your speech will appear here...</span>
                )}
              </div>

              <div className="mt-4 text-xs text-indigo-600 dark:text-gray-400 text-center">
                Real-time streaming to backend
              </div>
            </div>
          </FadeInSection>

          {/* AI Insight Panel */}
          <FadeInSection
            direction="up"
            delay={0.3}
            className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-6 backdrop-blur-sm neon-card-subtle"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-indigo-800 flex items-center justify-center border-2 border-pink-500 dark:border-teal-400 mr-3">
                  <Bot className="h-5 w-5 text-pink-500 dark:text-teal-400" />
                </div>
                <h2 className="text-xl font-bold text-indigo-900 dark:text-white">AI Insight</h2>
              </div>

              <div className="flex-1 bg-white/70 dark:bg-indigo-900/70 rounded-lg p-4 min-h-[300px] text-indigo-900 dark:text-white">
                {aiInsight ? (
                  <div className="animate-fade-in">{aiInsight}</div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 dark:text-gray-500">
                    <Bot className="h-12 w-12 mb-4 text-pink-500/50 dark:text-teal-400/50" />
                    <p>AI will analyze your speech and provide insights about potential matches.</p>
                  </div>
                )}
              </div>

              <div className="mt-4 text-xs text-indigo-600 dark:text-gray-400 text-center">Real-time AI insight</div>
            </div>
          </FadeInSection>

          {/* Profile Panel */}
          <FadeInSection
            direction="right"
            delay={0.4}
            className="bg-white/80 dark:bg-indigo-900/50 rounded-xl overflow-hidden backdrop-blur-sm neon-card-subtle"
          >
            <div className="relative aspect-square">
              <Image
                src={matchProfile.photo || "/placeholder.svg"}
                alt={matchProfile.name}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h2 className="text-2xl font-bold text-white">{matchProfile.name}</h2>
              </div>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <span className="text-indigo-900 dark:text-white font-medium">Age:</span>
                  <span className="ml-2 text-indigo-700 dark:text-gray-300">{matchProfile.age}</span>
                </div>
                <div className="bg-pink-100 dark:bg-indigo-800 px-2 py-1 rounded text-sm font-medium text-pink-600 dark:text-teal-300">
                  {matchProfile.personality}
                </div>
              </div>

              <div className="mb-3">
                <span className="text-indigo-900 dark:text-white font-medium">Location:</span>
                <span className="ml-2 text-indigo-700 dark:text-gray-300">{matchProfile.location}</span>
              </div>

              <div className="mb-3">
                <div className="text-indigo-900 dark:text-white font-medium mb-1">Interests:</div>
                <div className="flex flex-wrap gap-1">
                  {matchProfile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="text-xs bg-pink-100 dark:bg-indigo-800 text-pink-600 dark:text-teal-300 px-2 py-1 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-indigo-900 dark:text-white font-medium mb-1">Compatibility:</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-pink-500 dark:bg-teal-400 h-4 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${compatibility}%` }}
                  ></div>
                </div>
                <div className="text-right mt-1 text-sm font-bold text-pink-500 dark:text-teal-400">
                  {compatibility}%
                </div>
              </div>

              {/* Profile Updates */}
              <div className="min-h-[80px] mb-4">
                {profileUpdates.map((update, index) => (
                  <div key={index} className="text-sm text-indigo-700 dark:text-gray-300 mb-1 animate-fade-in">
                    {update}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              {showLikeButtons && profileUpdates.length < 4 && (
                <div className="flex gap-2 animate-fade-in">
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
                  <button className="w-10 flex justify-center items-center py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Redirect Message */}
              {profileUpdates.length >= 4 && (
                <div className="py-2 text-center text-pink-500 dark:text-teal-400 font-medium animate-pulse">
                  Redirecting to matches...
                </div>
              )}

              <div className="mt-4 text-xs text-indigo-600 dark:text-gray-400 text-center">
                Real-time profile update
              </div>
            </div>
          </FadeInSection>
        </div>

        {/* Instructions */}
        <div className="max-w-2xl mx-auto mt-8 bg-white/80 dark:bg-indigo-900/50 rounded-xl p-6 backdrop-blur-sm neon-card-subtle">
          <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-white">How It Works</h2>
          <ol className="list-decimal pl-5 space-y-2 text-indigo-800 dark:text-gray-300">
            <li>Click the microphone button to start recording your voice</li>
            <li>Talk about your interests, hobbies, and what you're looking for in a partner</li>
            <li>Our AI will analyze your speech in real-time and provide insights</li>
            <li>The system will update potential match profiles based on compatibility</li>
            <li>Your profile will be saved automatically and you'll be redirected to your matches</li>
            <li>From there, you can like, message, or video call with your matches</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

