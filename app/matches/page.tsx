"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { FadeInSection } from "@/components/fade-in-section"
import {
  Heart,
  MessageCircle,
  X,
  Star,
  AlertTriangle,
  Filter,
  ChevronDown,
  Check,
  Video,
  User,
  Brain,
} from "lucide-react"

// Mock match data
const mockMatches = [
  {
    id: 1,
    name: "Emma Wilson",
    age: 27,
    location: "Brooklyn, NY",
    personality: "ENFP",
    bio: "Creative designer who loves exploring new coffee shops and art galleries. Looking for someone to share adventures with!",
    interests: ["Art", "Coffee", "Travel", "Photography", "Music"],
    compatibility: 92,
    photo: "/placeholder.svg?height=400&width=300&text=Emma",
    online: true,
    lastActive: null,
  },
  {
    id: 2,
    name: "Michael Chen",
    age: 29,
    location: "Manhattan, NY",
    personality: "INTJ",
    bio: "Software engineer by day, amateur chef by night. I enjoy deep conversations and hiking on weekends.",
    interests: ["Hiking", "Cooking", "Technology", "Reading", "Movies"],
    compatibility: 87,
    photo: "/placeholder.svg?height=400&width=300&text=Michael",
    online: true,
    lastActive: null,
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    age: 26,
    location: "Queens, NY",
    personality: "INFJ",
    bio: "Passionate about sustainability and mindfulness. Looking for someone who values meaningful connections.",
    interests: ["Yoga", "Meditation", "Reading", "Nature", "Cooking"],
    compatibility: 85,
    photo: "/placeholder.svg?height=400&width=300&text=Sophia",
    online: false,
    lastActive: "2 hours ago",
  },
  {
    id: 4,
    name: "James Taylor",
    age: 31,
    location: "Hoboken, NJ",
    personality: "ESTP",
    bio: "Fitness enthusiast and sports fan. I love trying new restaurants and going to live music events.",
    interests: ["Fitness", "Sports", "Music", "Food", "Travel"],
    compatibility: 78,
    photo: "/placeholder.svg?height=400&width=300&text=James",
    online: true,
    lastActive: null,
  },
  {
    id: 5,
    name: "Olivia Kim",
    age: 28,
    location: "Jersey City, NJ",
    personality: "ISFJ",
    bio: "Art therapist who enjoys photography and quiet evenings with a good book. Looking for genuine connections.",
    interests: ["Art", "Photography", "Reading", "Movies", "Pets"],
    compatibility: 76,
    photo: "/placeholder.svg?height=400&width=300&text=Olivia",
    online: false,
    lastActive: "1 day ago",
  },
  {
    id: 6,
    name: "Daniel Johnson",
    age: 30,
    location: "Brooklyn, NY",
    personality: "ENTP",
    bio: "Entrepreneur with a passion for innovation. I enjoy philosophical discussions and outdoor adventures.",
    interests: ["Technology", "Hiking", "Philosophy", "Travel", "Science"],
    compatibility: 72,
    photo: "/placeholder.svg?height=400&width=300&text=Daniel",
    online: false,
    lastActive: "3 hours ago",
  },
]

// Additional mock match data
const additionalMockMatches = [
  {
    id: 7,
    name: "Lily Zhang",
    age: 25,
    location: "Manhattan, NY",
    personality: "INFP",
    bio: "Freelance writer and poet who loves quiet cafes and bookstores. Looking for someone who appreciates deep conversations and artistic expression.",
    interests: ["Writing", "Poetry", "Art", "Books", "Coffee"],
    compatibility: 89,
    photo: "/placeholder.svg?height=400&width=300&text=Lily",
    online: true,
    lastActive: null,
  },
  {
    id: 8,
    name: "Alex Rivera",
    age: 30,
    location: "Brooklyn, NY",
    personality: "ENFJ",
    bio: "Music producer and DJ who loves exploring new sounds and cultures. Seeking someone who shares my passion for music and adventure.",
    interests: ["Music", "Travel", "Concerts", "Food", "Nightlife"],
    compatibility: 84,
    photo: "/placeholder.svg?height=400&width=300&text=Alex",
    online: false,
    lastActive: "5 hours ago",
  },
  {
    id: 9,
    name: "Zoe Parker",
    age: 27,
    location: "Queens, NY",
    personality: "ISTP",
    bio: "Mechanical engineer by day, rock climber by weekend. I enjoy solving problems and pushing my physical limits.",
    interests: ["Climbing", "Engineering", "Hiking", "Puzzles", "Craft Beer"],
    compatibility: 81,
    photo: "/placeholder.svg?height=400&width=300&text=Zoe",
    online: true,
    lastActive: null,
  },
  {
    id: 10,
    name: "Nathan Kim",
    age: 29,
    location: "Jersey City, NJ",
    personality: "ENTJ",
    bio: "Startup founder passionate about technology and innovation. Looking for someone ambitious who enjoys intellectual discussions.",
    interests: ["Technology", "Business", "Innovation", "Reading", "Fitness"],
    compatibility: 79,
    photo: "/placeholder.svg?height=400&width=300&text=Nathan",
    online: false,
    lastActive: "1 day ago",
  },
  {
    id: 11,
    name: "Isabella Morales",
    age: 26,
    location: "Hoboken, NJ",
    personality: "ESFP",
    bio: "Dance instructor who loves salsa and bachata. I'm looking for someone who isn't afraid to hit the dance floor with me!",
    interests: ["Dancing", "Music", "Fitness", "Travel", "Languages"],
    compatibility: 77,
    photo: "/placeholder.svg?height=400&width=300&text=Isabella",
    online: true,
    lastActive: null,
  },
  {
    id: 12,
    name: "Ethan Williams",
    age: 31,
    location: "Manhattan, NY",
    personality: "ISTJ",
    bio: "Financial analyst who enjoys structure and planning. I value honesty, reliability, and meaningful connections.",
    interests: ["Finance", "Chess", "Running", "History", "Cooking"],
    compatibility: 75,
    photo: "/placeholder.svg?height=400&width=300&text=Ethan",
    online: false,
    lastActive: "3 hours ago",
  },
  {
    id: 13,
    name: "Maya Johnson",
    age: 28,
    location: "Brooklyn, NY",
    personality: "ENFP",
    bio: "Elementary school teacher who loves creativity and spontaneity. Looking for someone kind-hearted with a sense of adventure.",
    interests: ["Education", "Art", "Travel", "Children", "Nature"],
    compatibility: 88,
    photo: "/placeholder.svg?height=400&width=300&text=Maya",
    online: true,
    lastActive: null,
  },
  {
    id: 14,
    name: "Lucas Garcia",
    age: 32,
    location: "Queens, NY",
    personality: "INTP",
    bio: "Data scientist fascinated by patterns and possibilities. I enjoy deep discussions about science, philosophy, and the future.",
    interests: ["Data Science", "AI", "Philosophy", "Sci-Fi", "Chess"],
    compatibility: 82,
    photo: "/placeholder.svg?height=400&width=300&text=Lucas",
    online: false,
    lastActive: "2 hours ago",
  },
  {
    id: 15,
    name: "Sophia Lee",
    age: 27,
    location: "Manhattan, NY",
    personality: "ISFJ",
    bio: "Nurse who values compassion and care. I enjoy quiet evenings, cooking, and meaningful conversations.",
    interests: ["Healthcare", "Cooking", "Reading", "Gardening", "Movies"],
    compatibility: 86,
    photo: "/placeholder.svg?height=400&width=300&text=Sophia",
    online: true,
    lastActive: null,
  },
  {
    id: 16,
    name: "Jackson Brown",
    age: 30,
    location: "Hoboken, NJ",
    personality: "ESTP",
    bio: "Sales executive who thrives on energy and excitement. Looking for someone who can keep up with my active lifestyle.",
    interests: ["Sports", "Networking", "Fitness", "Travel", "Nightlife"],
    compatibility: 74,
    photo: "/placeholder.svg?height=400&width=300&text=Jackson",
    online: false,
    lastActive: "6 hours ago",
  },
]

export default function MatchesPage() {
  const [allMatches, setAllMatches] = useState([...mockMatches, ...additionalMockMatches])
  const [displayedMatches, setDisplayedMatches] = useState<typeof mockMatches>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    minCompatibility: 70,
    onlineOnly: true,
    personalityTypes: [] as string[],
  })
  // Add state for conversation data
  const [conversationData, setConversationData] = useState<any>(null)
  const loaderRef = useRef<HTMLDivElement>(null)

  // Load conversation data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("profileData")
    if (storedData) {
      setConversationData(JSON.parse(storedData))
    }
  }, [])

  // Add this useEffect for initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)

      // Apply filters to all matches
      let filtered = [...allMatches]

      // Filter by online status if needed
      if (filters.onlineOnly) {
        filtered = filtered.filter((match) => match.online)
      }

      setAllMatches(filtered)

      // Load first batch
      const initialMatches = filtered.slice(0, 6)
      setDisplayedMatches(initialMatches)
      setHasMore(filtered.length > 6)
    }, 1500)

    return () => clearTimeout(timer)
  }, [filters.onlineOnly])

  // Load privacy settings
  useEffect(() => {
    const storedSettings = localStorage.getItem("privacySettings")
    if (storedSettings) {
      const settings = JSON.parse(storedSettings)

      // Apply privacy settings to the UI
      // In a real app, this would affect the actual functionality
      // For now, we'll just disable the buttons based on settings

      // This is just for demonstration purposes
      const messageButtons = document.querySelectorAll('[data-action="message"]')
      const videoButtons = document.querySelectorAll('[data-action="video-call"]')

      if (!settings.allowDirectMessages) {
        messageButtons.forEach((button) => {
          button.setAttribute("disabled", "true")
          button.classList.add("opacity-50", "cursor-not-allowed")
        })
      }

      if (!settings.allowVideoCalls) {
        videoButtons.forEach((button) => {
          button.setAttribute("disabled", "true")
          button.classList.add("opacity-50", "cursor-not-allowed")
        })
      }
    }
  }, [isLoading]) // Only run after loading is complete

  // Add this useEffect for intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting && hasMore && !isLoadingMore) {
          loadMoreMatches()
        }
      },
      { threshold: 0.5 },
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [hasMore, isLoadingMore, loaderRef.current])

  // Add this function to load more matches
  const loadMoreMatches = () => {
    setIsLoadingMore(true)

    // Simulate API delay
    setTimeout(() => {
      const nextPage = page + 1
      const startIndex = displayedMatches.length
      const endIndex = startIndex + 3 // Load 3 more items

      const newMatches = allMatches.slice(startIndex, endIndex)

      if (newMatches.length > 0) {
        setDisplayedMatches((prev) => [...prev, ...newMatches])
        setPage(nextPage)
        setHasMore(endIndex < allMatches.length)
      } else {
        setHasMore(false)
      }

      setIsLoadingMore(false)
    }, 1500)
  }

  // Apply filters
  const applyFilters = () => {
    setIsLoading(true)

    setTimeout(() => {
      let filtered = [...mockMatches, ...additionalMockMatches]

      // Filter by minimum compatibility
      filtered = filtered.filter((match) => match.compatibility >= filters.minCompatibility)

      // Filter by online status
      if (filters.onlineOnly) {
        filtered = filtered.filter((match) => match.online)
      }

      // Filter by personality types
      if (filters.personalityTypes.length > 0) {
        filtered = filtered.filter((match) => filters.personalityTypes.includes(match.personality))
      }

      setAllMatches(filtered)
      setDisplayedMatches(filtered.slice(0, 6))
      setHasMore(filtered.length > 6)
      setPage(1)
      setIsLoading(false)
      setFilterOpen(false)
    }, 1000)
  }

  // Reset filters
  const resetFilters = () => {
    setIsLoading(true)

    setTimeout(() => {
      const newFilters = {
        minCompatibility: 70,
        onlineOnly: false,
        personalityTypes: [],
      }

      setFilters(newFilters)

      const allMatchesData = [...mockMatches, ...additionalMockMatches]
      setAllMatches(allMatchesData)
      setDisplayedMatches(allMatchesData.slice(0, 6))
      setHasMore(allMatchesData.length > 6)
      setPage(1)
      setIsLoading(false)
      setFilterOpen(false)
    }, 1000)
  }

  // Toggle personality type filter
  const togglePersonalityFilter = (type: string) => {
    if (filters.personalityTypes.includes(type)) {
      setFilters({
        ...filters,
        personalityTypes: filters.personalityTypes.filter((t) => t !== type),
      })
    } else {
      setFilters({
        ...filters,
        personalityTypes: [...filters.personalityTypes, type],
      })
    }
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
            <div className="flex items-center">
              <Image src="/images/meetx-logo.png" alt="MEETX" width={100} height={40} className="h-8 w-auto" />
            </div>
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

      {/* Authentication Disabled Notice */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-600 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800 dark:text-yellow-400">Matches Demo Mode</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              This is a demonstration of the matching system. All matches are simulated for testing purposes.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Created Notification */}
      {conversationData && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-lg p-4 flex items-start gap-3">
            <Check className="h-5 w-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800 dark:text-green-400">Profile Created Successfully</h3>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                Your profile has been created based on your conversation. We've identified your personality type as{" "}
                <span className="font-medium">{conversationData.personalityType}</span> and matched you with compatible
                profiles.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Matches Content */}
      <div className="container mx-auto px-4 py-6">
        <FadeInSection direction="up" delay={0.2}>
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-indigo-900 dark:text-white">
                Your <span className="text-pink-500 dark:text-teal-400 neon-text">Matches</span>
              </h1>

              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-indigo-800 rounded-lg border border-indigo-200 dark:border-indigo-700 text-indigo-900 dark:text-white"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
                </button>

                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-indigo-900 rounded-lg shadow-lg border border-indigo-200 dark:border-indigo-700 z-20 p-4">
                    <h3 className="font-medium text-indigo-900 dark:text-white mb-3">Filter Matches</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-indigo-800 dark:text-gray-300 mb-1">
                          Minimum Compatibility
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="50"
                            max="100"
                            value={filters.minCompatibility}
                            onChange={(e) =>
                              setFilters({ ...filters, minCompatibility: Number.parseInt(e.target.value) })
                            }
                            className="w-full"
                          />
                          <span className="text-sm font-medium text-pink-500 dark:text-teal-400 w-8">
                            {filters.minCompatibility}%
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center text-sm text-indigo-800 dark:text-gray-300">
                          <input
                            type="checkbox"
                            checked={filters.onlineOnly}
                            onChange={(e) => setFilters({ ...filters, onlineOnly: e.target.checked })}
                            className="mr-2 h-4 w-4 text-pink-500 dark:text-teal-400 focus:ring-pink-500 dark:focus:ring-teal-400 border-indigo-300 dark:border-indigo-700 rounded"
                          />
                          Online Only
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm text-indigo-800 dark:text-gray-300 mb-1">
                          Personality Types
                        </label>
                        <div className="flex flex-wrap gap-1">
                          {["INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP"].map((type) => (
                            <button
                              key={type}
                              onClick={() => togglePersonalityFilter(type)}
                              className={`px-2 py-1 text-xs rounded ${
                                filters.personalityTypes.includes(type)
                                  ? "bg-pink-500 dark:bg-teal-400 text-white dark:text-indigo-950"
                                  : "bg-indigo-100 dark:bg-indigo-800 text-indigo-900 dark:text-white"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between pt-2">
                        <button
                          onClick={resetFilters}
                          className="text-sm text-indigo-600 dark:text-gray-300 hover:underline"
                        >
                          Reset
                        </button>
                        <button
                          onClick={applyFilters}
                          className="px-3 py-1 bg-pink-500 dark:bg-teal-400 text-white dark:text-indigo-950 rounded-md text-sm"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-pink-500 dark:bg-teal-400 mb-4 neon-button"></div>
                  <div className="text-indigo-900 dark:text-white text-lg font-medium">Finding your matches...</div>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedMatches.map((match) => (
                    <FadeInSection key={match.id} direction="up" delay={0.1} className="h-full">
                      <div className="bg-white/80 dark:bg-indigo-900/50 rounded-xl overflow-hidden backdrop-blur-sm neon-card-subtle neon-card-3d h-full flex flex-col">
                        <div className="relative">
                          <div className="aspect-[3/4] relative overflow-hidden">
                            <Image
                              src={match.photo || "/placeholder.svg"}
                              alt={match.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="absolute top-3 right-3 bg-white/90 dark:bg-indigo-900/90 rounded-full px-2 py-1 flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full mr-1 ${match.online ? "bg-green-500" : "bg-gray-400"}`}
                            ></div>
                            <span className="text-xs font-medium text-indigo-900 dark:text-white">
                              {match.online ? "Online" : match.lastActive}
                            </span>
                          </div>

                          <div className="absolute bottom-3 left-3 bg-pink-500 dark:bg-teal-400 rounded-full px-3 py-1 flex items-center neon-button-pink">
                            <Star className="h-4 w-4 text-white dark:text-indigo-950 mr-1" />
                            <span className="text-sm font-bold text-white dark:text-indigo-950">
                              {match.compatibility}% Match
                            </span>
                          </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col">
                          <div className="mb-3">
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-bold text-indigo-900 dark:text-white">
                                {match.name}, {match.age}
                              </h3>
                              <span className="text-sm font-medium bg-indigo-100 dark:bg-indigo-800 text-indigo-900 dark:text-white px-2 py-0.5 rounded">
                                {match.personality}
                              </span>
                            </div>
                            <p className="text-sm text-indigo-700 dark:text-gray-300">{match.location}</p>
                          </div>

                          <p className="text-sm text-indigo-800 dark:text-gray-300 mb-3 line-clamp-3 flex-1">
                            {match.bio}
                          </p>

                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1">
                              {match.interests.map((interest) => (
                                <span
                                  key={interest}
                                  className="text-xs bg-pink-100 dark:bg-indigo-800 text-pink-600 dark:text-teal-300 px-2 py-0.5 rounded-full"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button className="flex-1 flex justify-center items-center gap-1 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors neon-button-pink">
                              <Heart className="h-4 w-4" />
                              <span>Like</span>
                            </button>
                            <button
                              data-action="message"
                              className="flex-1 flex justify-center items-center gap-1 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-800 text-indigo-900 dark:text-white hover:bg-indigo-200 dark:hover:bg-indigo-700 transition-colors"
                            >
                              <MessageCircle className="h-4 w-4" />
                              <span>Message</span>
                            </button>
                            <button
                              data-action="video-call"
                              className="flex-1 flex justify-center items-center gap-1 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                            >
                              <Video className="h-4 w-4" />
                              <span>Call</span>
                            </button>
                            <button className="w-10 flex justify-center items-center py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </FadeInSection>
                  ))}
                </div>

                {/* Infinite Scroll Loader */}
                {hasMore && (
                  <div ref={loaderRef} className="flex justify-center items-center py-8 mt-4">
                    {isLoadingMore ? (
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border-4 border-pink-500 dark:border-teal-400 border-t-transparent animate-spin mb-2"></div>
                        <p className="text-indigo-800 dark:text-gray-300 text-sm">Loading more matches...</p>
                      </div>
                    ) : (
                      <div className="h-8 w-full"></div> // Invisible element for intersection observer
                    )}
                  </div>
                )}

                {!isLoading && !hasMore && displayedMatches.length === 0 && (
                  <div className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-8 text-center backdrop-blur-sm">
                    <div className="text-pink-500 dark:text-teal-400 text-5xl mb-4">😢</div>
                    <h3 className="text-xl font-bold text-indigo-900 dark:text-white mb-2">No matches found</h3>
                    <p className="text-indigo-800 dark:text-gray-300">
                      Try adjusting your filters or updating your profile to find more matches.
                    </p>
                  </div>
                )}

                {!isLoading && hasMore === false && displayedMatches.length > 0 && (
                  <div className="text-center py-8 mt-4">
                    <p className="text-indigo-800 dark:text-gray-300">You've reached the end of your matches</p>
                    <button
                      onClick={resetFilters}
                      className="mt-4 px-4 py-2 bg-pink-500 dark:bg-teal-400 text-white dark:text-indigo-950 rounded-full hover:bg-pink-600 dark:hover:bg-teal-500 transition-colors neon-button-pink neon-button-3d"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </FadeInSection>
      </div>
    </div>
  )
}

