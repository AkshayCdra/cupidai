"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { FadeInSection } from "@/components/fade-in-section"
import { Check, ChevronDown, User, AlertTriangle, Loader2, Brain } from "lucide-react"

// MBTI Personality Types
const personalityTypes = [
  { id: "INTJ", name: "INTJ", description: "Architect - Imaginative and strategic thinkers" },
  {
    id: "INTP",
    name: "INTP",
    description: "Logician - Innovative inventors with an unquenchable thirst for knowledge",
  },
  { id: "ENTJ", name: "ENTJ", description: "Commander - Bold, imaginative and strong-willed leaders" },
  {
    id: "ENTP",
    name: "ENTP",
    description: "Debater - Smart and curious thinkers who cannot resist an intellectual challenge",
  },
  { id: "INFJ", name: "INFJ", description: "Advocate - Quiet and mystical, yet very inspiring and tireless idealists" },
  {
    id: "INFP",
    name: "INFP",
    description: "Mediator - Poetic, kind and altruistic people, always eager to help a good cause",
  },
  {
    id: "ENFJ",
    name: "ENFJ",
    description: "Protagonist - Charismatic and inspiring leaders, able to mesmerize their listeners",
  },
  { id: "ENFP", name: "ENFP", description: "Campaigner - Enthusiastic, creative and sociable free spirits" },
  {
    id: "ISTJ",
    name: "ISTJ",
    description: "Logistician - Practical and fact-minded individuals, whose reliability cannot be doubted",
  },
  {
    id: "ISFJ",
    name: "ISFJ",
    description: "Defender - Very dedicated and warm protectors, always ready to defend their loved ones",
  },
  {
    id: "ESTJ",
    name: "ESTJ",
    description: "Executive - Excellent administrators, unsurpassed at managing things or people",
  },
  {
    id: "ESFJ",
    name: "ESFJ",
    description: "Consul - Extraordinarily caring, social and popular people, always eager to help",
  },
  {
    id: "ISTP",
    name: "ISTP",
    description: "Virtuoso - Bold and practical experimenters, masters of all kinds of tools",
  },
  {
    id: "ISFP",
    name: "ISFP",
    description: "Adventurer - Flexible and charming artists, always ready to explore and experience something new",
  },
  {
    id: "ESTP",
    name: "ESTP",
    description: "Entrepreneur - Smart, energetic and very perceptive people, who truly enjoy living on the edge",
  },
  {
    id: "ESFP",
    name: "ESFP",
    description: "Entertainer - Spontaneous, energetic and enthusiastic people – life is never boring around them",
  },
]

// Mock interests for selection
const interests = [
  "Hiking",
  "Reading",
  "Cooking",
  "Travel",
  "Photography",
  "Music",
  "Art",
  "Movies",
  "Gaming",
  "Fitness",
  "Yoga",
  "Dancing",
  "Writing",
  "Technology",
  "Science",
  "Sports",
  "Fashion",
  "Food",
  "Coffee",
  "Wine",
  "Pets",
  "Gardening",
  "Meditation",
]

export default function ProfilePage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Guest User",
    age: 28,
    location: "New York, NY",
    bio: "I'm looking for someone who shares my interests and values. I enjoy meaningful conversations and exploring new places.",
  })

  // Add state for conversation data
  const [conversationData, setConversationData] = useState<{
    personalityType: string | null
    interests: string[]
    userMessage: string
    aiResponse: string
  } | null>(null)

  const [selectedPersonality, setSelectedPersonality] = useState<string | null>(null)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [isPersonalityDropdownOpen, setIsPersonalityDropdownOpen] = useState(false)

  // Load conversation data from localStorage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("profileData")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setConversationData(parsedData)

      // Auto-select personality type from conversation
      if (parsedData.personalityType) {
        setSelectedPersonality(parsedData.personalityType)
      }

      // Auto-select interests from conversation
      if (parsedData.interests && parsedData.interests.length > 0) {
        setSelectedInterests(parsedData.interests)
      }

      // Update bio with user's message
      if (parsedData.userMessage) {
        setProfileData((prev) => ({
          ...prev,
          bio: parsedData.userMessage,
        }))
      }
    }
  }, [])

  // Toggle interest selection
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest))
    } else {
      if (selectedInterests.length < 5) {
        setSelectedInterests([...selectedInterests, interest])
      }
    }
  }

  // Handle profile submission
  const handleSubmitProfile = () => {
    if (!selectedPersonality) {
      return
    }

    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      // Navigate to matches page
      router.push("/matches")
    }, 3000)
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
              href="/personality"
              className="bg-transparent border border-pink-500 dark:border-teal-400 text-pink-500 dark:text-teal-400 px-4 py-2 rounded-full hover:bg-pink-500 dark:hover:bg-teal-400 hover:text-white dark:hover:text-indigo-950 transition-colors neon-button neon-button-3d flex items-center gap-1"
            >
              <Brain className="h-4 w-4" /> Personality
            </Link>
          </div>
        </div>
      </header>

      {/* Authentication Disabled Notice */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-600 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800 dark:text-yellow-400">Profile Creation Demo Mode</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              This is a demonstration of the profile creation process. All data is simulated for testing purposes.
            </p>
          </div>
        </div>
      </div>

      {/* Conversation Summary (if available) */}
      {conversationData && (
        <div className="container mx-auto px-4 py-4">
          <FadeInSection direction="up" delay={0.1}>
            <div className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-6 backdrop-blur-sm neon-card-subtle mb-8">
              <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-white">Based on Your Conversation</h2>

              <div className="space-y-4">
                <div className="bg-pink-50 dark:bg-indigo-800/50 p-4 rounded-lg">
                  <p className="text-sm text-indigo-800 dark:text-gray-200 italic">"{conversationData.userMessage}"</p>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/50 p-4 rounded-lg">
                  <p className="text-sm text-indigo-800 dark:text-gray-200">
                    <span className="font-medium">AI Analysis:</span> {conversationData.aiResponse}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-indigo-900 dark:text-white mb-2">
                      Detected Personality Type:
                    </h3>
                    <div className="bg-pink-100 dark:bg-indigo-800 px-3 py-2 rounded-lg inline-block">
                      <span className="font-bold text-pink-500 dark:text-teal-400">
                        {conversationData.personalityType}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-indigo-900 dark:text-white mb-2">Detected Interests:</h3>
                    <div className="flex flex-wrap gap-2">
                      {conversationData.interests.map((interest) => (
                        <span
                          key={interest}
                          className="bg-pink-100 dark:bg-indigo-800 text-pink-600 dark:text-teal-300 px-2 py-1 rounded-full text-xs"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      )}

      {/* Profile Creation */}
      <div className="container mx-auto px-4 py-6">
        <FadeInSection direction="up" delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center text-indigo-900 dark:text-white">
              Complete Your <span className="text-pink-500 dark:text-teal-400 neon-text">Profile</span>
            </h1>

            <div className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-6 backdrop-blur-sm neon-card-subtle mb-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-pink-100 dark:bg-indigo-800 flex items-center justify-center border-2 border-pink-500 dark:border-teal-400 neon-icon-box mb-4">
                    <User className="h-16 w-16 text-pink-500 dark:text-teal-400" />
                  </div>
                  <button className="text-sm text-pink-500 dark:text-teal-400 hover:underline">Upload Photo</button>
                </div>

                <div className="w-full md:w-2/3 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-indigo-900 dark:text-gray-200 mb-1">Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-indigo-900 dark:text-gray-200 mb-1">Age</label>
                      <input
                        type="number"
                        value={profileData.age}
                        onChange={(e) => setProfileData({ ...profileData, age: Number.parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-indigo-900 dark:text-gray-200 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="w-full px-3 py-2 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-indigo-900 dark:text-gray-200 mb-1">Bio</label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Personality Type Selection */}
            <div className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-6 backdrop-blur-sm neon-card-subtle mb-8">
              <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-white">Your Personality Type</h2>

              <p className="text-indigo-800 dark:text-gray-300 mb-4">
                {conversationData
                  ? "We've detected your personality type based on your conversation. You can change it if needed."
                  : "Select your Myers-Briggs (MBTI) personality type to help us find better matches for you."}
              </p>

              <div className="relative">
                <button
                  onClick={() => setIsPersonalityDropdownOpen(!isPersonalityDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-white"
                >
                  <span>
                    {selectedPersonality
                      ? personalityTypes.find((p) => p.id === selectedPersonality)?.name +
                        " - " +
                        personalityTypes.find((p) => p.id === selectedPersonality)?.description
                      : "Select your personality type"}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${isPersonalityDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isPersonalityDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {personalityTypes.map((personality) => (
                      <button
                        key={personality.id}
                        onClick={() => {
                          setSelectedPersonality(personality.id)
                          setIsPersonalityDropdownOpen(false)
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-800 ${
                          selectedPersonality === personality.id
                            ? "bg-pink-50 dark:bg-indigo-800/50 text-pink-500 dark:text-teal-400"
                            : "text-indigo-900 dark:text-white"
                        }`}
                      >
                        <div className="flex items-center">
                          {selectedPersonality === personality.id && (
                            <Check className="h-4 w-4 mr-2 text-pink-500 dark:text-teal-400" />
                          )}
                          <div>
                            <span className="font-medium">{personality.name}</span>
                            <span className="text-sm text-indigo-600 dark:text-gray-300 ml-2">
                              {personality.description}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!selectedPersonality && (
                <p className="text-sm text-pink-500 dark:text-pink-300 mt-2">
                  Please select a personality type to continue
                </p>
              )}
            </div>

            {/* Interests Selection */}
            <div className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-6 backdrop-blur-sm neon-card-subtle mb-8">
              <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-white">Your Interests</h2>

              <p className="text-indigo-800 dark:text-gray-300 mb-4">
                {conversationData
                  ? "We've detected your interests based on your conversation. You can modify them if needed."
                  : "Select up to 5 interests to help us find people with similar passions."}
              </p>

              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedInterests.includes(interest)
                        ? "bg-pink-500 dark:bg-teal-400 text-white dark:text-indigo-950 neon-button-pink"
                        : "bg-white dark:bg-indigo-800 text-indigo-900 dark:text-white border border-indigo-200 dark:border-indigo-700"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>

              {selectedInterests.length === 0 && (
                <p className="text-sm text-pink-500 dark:text-pink-300 mt-2">Please select at least one interest</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmitProfile}
                disabled={!selectedPersonality || selectedInterests.length === 0 || isProcessing}
                className={`px-8 py-3 rounded-full font-medium text-white bg-pink-500 dark:bg-teal-400 dark:text-indigo-950 hover:bg-pink-600 dark:hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:focus:ring-teal-400 neon-button-pink neon-button-3d transition-all ${
                  !selectedPersonality || selectedInterests.length === 0 || isProcessing
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Finding Matches...
                  </div>
                ) : (
                  "Find Matches"
                )}
              </button>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  )
}

