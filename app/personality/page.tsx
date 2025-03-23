"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import { FadeInSection } from "@/components/fade-in-section"
import { Brain, Search, ChevronDown, ChevronRight, Heart, X, Info, User } from "lucide-react"

// MBTI Personality Types with detailed information
const personalityTypes = [
  {
    id: "INTJ",
    name: "INTJ",
    title: "Architect",
    description: "Imaginative and strategic thinkers with a plan for everything",
    strengths: ["Strategic", "Independent", "Innovative", "Analytical", "Determined"],
    weaknesses: ["Overly critical", "Dismissive of emotions", "Perfectionist", "Can be arrogant"],
    relationships:
      "INTJs seek intellectual partners who can match their depth of thinking. They value honesty, loyalty, and independence in relationships.",
    careers: ["Scientist", "Engineer", "Strategic Planner", "Systems Analyst", "Investment Banker"],
    compatibility: ["ENFP", "ENTP", "INFJ", "INFP"],
    famous: ["Elon Musk", "Mark Zuckerberg", "Christopher Nolan", "Nikola Tesla"],
    color: "bg-blue-500",
  },
  {
    id: "INTP",
    name: "INTP",
    title: "Logician",
    description: "Innovative inventors with an unquenchable thirst for knowledge",
    strengths: ["Analytical", "Original", "Open-minded", "Curious", "Objective"],
    weaknesses: ["Disconnected", "Overthinking", "Difficulty with practical matters", "Insensitive"],
    relationships:
      "INTPs seek partners who respect their independence and engage in intellectual discussions. They value mental connection over emotional displays.",
    careers: ["Computer Programmer", "Mathematician", "Professor", "Scientist", "Architect"],
    compatibility: ["ENTJ", "ENFJ", "ESTJ", "INFJ"],
    famous: ["Albert Einstein", "Bill Gates", "Marie Curie", "Charles Darwin"],
    color: "bg-purple-500",
  },
  {
    id: "ENTJ",
    name: "ENTJ",
    title: "Commander",
    description: "Bold, imaginative and strong-willed leaders, always finding a way – or making one",
    strengths: ["Efficient", "Energetic", "Self-confident", "Strong-willed", "Strategic"],
    weaknesses: ["Stubborn", "Dominant", "Impatient", "Arrogant", "Intolerant"],
    relationships:
      "ENTJs seek competent and intelligent partners who can keep up with their fast-paced lifestyle. They value honesty and direct communication.",
    careers: ["Executive", "Lawyer", "Entrepreneur", "Management Consultant", "Business Analyst"],
    compatibility: ["INTP", "INFP", "ENFP", "INFJ"],
    famous: ["Steve Jobs", "Margaret Thatcher", "Franklin D. Roosevelt", "Gordon Ramsay"],
    color: "bg-red-500",
  },
  {
    id: "ENTP",
    name: "ENTP",
    title: "Debater",
    description: "Smart and curious thinkers who cannot resist an intellectual challenge",
    strengths: ["Knowledgeable", "Quick thinker", "Original", "Charismatic", "Energetic"],
    weaknesses: ["Argumentative", "Insensitive", "Intolerant", "Poor follow-through"],
    relationships:
      "ENTPs seek partners who can engage in stimulating debates and appreciate their unconventional nature. They value mental agility and independence.",
    careers: ["Entrepreneur", "Lawyer", "Creative Director", "Inventor", "Software Developer"],
    compatibility: ["INFJ", "INTJ", "ENFJ", "INFP"],
    famous: ["Leonardo da Vinci", "Thomas Edison", "Robert Downey Jr.", "Celine Dion"],
    color: "bg-orange-500",
  },
  {
    id: "INFJ",
    name: "INFJ",
    title: "Advocate",
    description: "Quiet and mystical, yet very inspiring and tireless idealists",
    strengths: ["Creative", "Insightful", "Principled", "Passionate", "Altruistic"],
    weaknesses: ["Sensitive to criticism", "Perfectionist", "Private", "Burnout-prone"],
    relationships:
      "INFJs seek deep, meaningful connections and are highly selective about their partners. They value authenticity, emotional depth, and shared values.",
    careers: ["Counselor", "HR Manager", "Writer", "Professor", "Psychologist"],
    compatibility: ["ENFP", "ENTP", "INTJ", "INFP"],
    famous: ["Martin Luther King Jr.", "Nelson Mandela", "Lady Gaga", "Taylor Swift"],
    color: "bg-teal-500",
  },
  {
    id: "INFP",
    name: "INFP",
    title: "Mediator",
    description: "Poetic, kind and altruistic people, always eager to help a good cause",
    strengths: ["Empathetic", "Creative", "Open-minded", "Passionate", "Idealistic"],
    weaknesses: ["Unrealistic", "Self-isolating", "Emotionally vulnerable", "Indecisive"],
    relationships:
      "INFPs seek authentic, deep connections based on shared values. They are romantic and devoted partners who value emotional intimacy.",
    careers: ["Writer", "Counselor", "Artist", "Social Worker", "Professor"],
    compatibility: ["ENFJ", "ENTJ", "INFJ", "INTJ"],
    famous: ["William Shakespeare", "J.R.R. Tolkien", "Johnny Depp", "Audrey Hepburn"],
    color: "bg-green-500",
  },
  {
    id: "ENFJ",
    name: "ENFJ",
    title: "Protagonist",
    description: "Charismatic and inspiring leaders, able to mesmerize their listeners",
    strengths: ["Charismatic", "Reliable", "Natural leaders", "Altruistic", "Empathetic"],
    weaknesses: ["Overly idealistic", "Too selfless", "Approval-seeking", "Overcommitted"],
    relationships:
      "ENFJs are devoted and supportive partners who prioritize their loved ones' needs. They seek harmony and meaningful connections.",
    careers: ["Teacher", "HR Director", "Marketing Manager", "Politician", "Life Coach"],
    compatibility: ["INFP", "INTP", "ISFP", "INTJ"],
    famous: ["Barack Obama", "Oprah Winfrey", "John Cusack", "Jennifer Lawrence"],
    color: "bg-pink-500",
  },
  {
    id: "ENFP",
    name: "ENFP",
    title: "Campaigner",
    description: "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile",
    strengths: ["Curious", "Observant", "Energetic", "Excellent communicators", "Enthusiastic"],
    weaknesses: ["Poor practical skills", "Easily stressed", "Overthinking", "Highly emotional"],
    relationships:
      "ENFPs seek authentic connections with depth and excitement. They are passionate partners who value emotional intimacy and shared experiences.",
    careers: ["Journalist", "Actor", "Consultant", "Psychologist", "Designer"],
    compatibility: ["INTJ", "INFJ", "ENTJ", "INTP"],
    famous: ["Robin Williams", "Robert Downey Jr.", "Sandra Bullock", "Will Smith"],
    color: "bg-yellow-500",
  },
  {
    id: "ISTJ",
    name: "ISTJ",
    title: "Logistician",
    description: "Practical and fact-minded individuals, whose reliability cannot be doubted",
    strengths: ["Honest", "Direct", "Responsible", "Calm", "Practical"],
    weaknesses: ["Stubborn", "Insensitive", "Always by the book", "Judgmental"],
    relationships:
      "ISTJs are loyal and committed partners who value stability and tradition. They show love through practical actions rather than words.",
    careers: ["Accountant", "Military Officer", "Lawyer", "Doctor", "Business Manager"],
    compatibility: ["ESFP", "ESTP", "ENFP", "ENTP"],
    famous: ["Queen Elizabeth II", "Warren Buffett", "Jeff Bezos", "Natalie Portman"],
    color: "bg-gray-500",
  },
  {
    id: "ISFJ",
    name: "ISFJ",
    title: "Defender",
    description: "Very dedicated and warm protectors, always ready to defend their loved ones",
    strengths: ["Supportive", "Reliable", "Patient", "Observant", "Detail-oriented"],
    weaknesses: ["Overcommitted", "Reluctant to change", "Too selfless", "Represses feelings"],
    relationships:
      "ISFJs are devoted partners who prioritize harmony and meeting their loved ones' needs. They show love through acts of service and practical support.",
    careers: ["Nurse", "Teacher", "Social Worker", "Administrative Assistant", "Accountant"],
    compatibility: ["ESFP", "ESTP", "ENFP", "ENTP"],
    famous: ["Mother Teresa", "Kate Middleton", "Rosa Parks", "Beyoncé"],
    color: "bg-blue-400",
  },
  {
    id: "ESTJ",
    name: "ESTJ",
    title: "Executive",
    description: "Excellent administrators, unsurpassed at managing things – or people",
    strengths: ["Dedicated", "Strong-willed", "Direct", "Honest", "Loyal"],
    weaknesses: ["Inflexible", "Stubborn", "Judgmental", "Emotionally unaware"],
    relationships:
      "ESTJs value tradition and security in relationships. They are loyal partners who take their commitments seriously and prefer clear roles.",
    careers: ["Business Manager", "Military Officer", "Judge", "Financial Officer", "School Principal"],
    compatibility: ["ISFP", "ISTP", "INFP", "INTP"],
    famous: ["Michelle Obama", "Sonia Sotomayor", "John D. Rockefeller", "Lyndon B. Johnson"],
    color: "bg-indigo-500",
  },
  {
    id: "ESFJ",
    name: "ESFJ",
    title: "Consul",
    description: "Extraordinarily caring, social and popular people, always eager to help",
    strengths: ["Supportive", "Reliable", "Patient", "Warm", "Popular"],
    weaknesses: ["Needy for approval", "Inflexible", "Vulnerable to criticism", "Too selfless"],
    relationships:
      "ESFJs are attentive and devoted partners who prioritize harmony and meeting their loved ones' needs. They value tradition and security.",
    careers: ["Teacher", "Healthcare Worker", "HR Manager", "Social Worker", "Event Planner"],
    compatibility: ["ISFP", "ISTP", "INFP", "INTP"],
    famous: ["Taylor Swift", "Jennifer Lopez", "Bill Clinton", "Steve Harvey"],
    color: "bg-purple-400",
  },
  {
    id: "ISTP",
    name: "ISTP",
    title: "Virtuoso",
    description: "Bold and practical experimenters, masters of all kinds of tools",
    strengths: ["Optimistic", "Energetic", "Creative", "Practical", "Spontaneous"],
    weaknesses: ["Stubborn", "Insensitive", "Private", "Easily bored"],
    relationships:
      "ISTPs value their independence in relationships and may struggle with emotional expression. They show affection through practical actions.",
    careers: ["Engineer", "Mechanic", "Pilot", "Athlete", "Forensic Scientist"],
    compatibility: ["ESFJ", "ESTJ", "ENFJ", "ENTJ"],
    famous: ["Michael Jordan", "Tom Cruise", "Clint Eastwood", "Milla Jovovich"],
    color: "bg-red-400",
  },
  {
    id: "ISFP",
    name: "ISFP",
    title: "Adventurer",
    description: "Flexible and charming artists, always ready to explore and experience something new",
    strengths: ["Charming", "Sensitive", "Creative", "Passionate", "Imaginative"],
    weaknesses: ["Unpredictable", "Easily stressed", "Overly competitive", "Fiercely independent"],
    relationships:
      "ISFPs are warm and passionate partners who value their independence. They express love through actions rather than words.",
    careers: ["Artist", "Designer", "Photographer", "Chef", "Fashion Designer"],
    compatibility: ["ESFJ", "ESTJ", "ENFJ", "ENTJ"],
    famous: ["Michael Jackson", "Britney Spears", "Lana Del Rey", "Kevin Costner"],
    color: "bg-green-400",
  },
  {
    id: "ESTP",
    name: "ESTP",
    title: "Entrepreneur",
    description: "Smart, energetic and very perceptive people, who truly enjoy living on the edge",
    strengths: ["Bold", "Rational", "Practical", "Original", "Perceptive"],
    weaknesses: ["Impatient", "Risk-prone", "Unstructured", "Defiant"],
    relationships:
      "ESTPs are fun-loving and exciting partners who live in the moment. They may struggle with long-term commitment but are loyal to those they care about.",
    careers: ["Entrepreneur", "Sales Representative", "Marketing Executive", "Athlete", "Detective"],
    compatibility: ["ISFJ", "ISTJ", "INFJ", "INTJ"],
    famous: ["Madonna", "Jack Nicholson", "Eddie Murphy", "Bruce Willis"],
    color: "bg-orange-400",
  },
  {
    id: "ESFP",
    name: "ESFP",
    title: "Entertainer",
    description: "Spontaneous, energetic and enthusiastic people – life is never boring around them",
    strengths: ["Bold", "Original", "Practical", "Observant", "Excellent people skills"],
    weaknesses: ["Sensitive", "Conflict-averse", "Easily bored", "Poor long-term planners"],
    relationships:
      "ESFPs are fun-loving and enthusiastic partners who live in the moment. They show love through excitement, gifts, and quality time.",
    careers: ["Event Planner", "Sales Representative", "Tour Guide", "Actor", "Child Care Provider"],
    compatibility: ["ISFJ", "ISTJ", "INFJ", "INTJ"],
    famous: ["Adele", "Jamie Foxx", "Marilyn Monroe", "Steve Irwin"],
    color: "bg-pink-400",
  },
]

// Update the main content section to focus on user's personality first
export default function PersonalityPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [userPersonality, setUserPersonality] = useState<string | null>(null)
  const [hasProfileData, setHasProfileData] = useState(false)

  // Load user personality from localStorage if available
  useEffect(() => {
    const storedData = localStorage.getItem("profileData")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setHasProfileData(true)
      if (parsedData.personalityType) {
        setUserPersonality(parsedData.personalityType)
        setSelectedType(parsedData.personalityType)
      }
    }
  }, [])

  // Filter personality types based on search term
  const filteredTypes = personalityTypes.filter(
    (type) =>
      type.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get the selected personality type details
  const selectedPersonalityType = personalityTypes.find((type) => type.id === selectedType)
  const userPersonalityType = personalityTypes.find((type) => type.id === userPersonality)

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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <FadeInSection direction="up" delay={0.2}>
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-center text-indigo-900 dark:text-white">
              Your <span className="text-pink-500 dark:text-teal-400 neon-text">Personality</span> Profile
            </h1>
            <p className="text-center text-indigo-800 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Understanding your personality type can help you find more compatible matches and improve your
              relationships.
            </p>

            {!hasProfileData ? (
              <div className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-8 backdrop-blur-sm neon-card-subtle text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-pink-100 dark:bg-indigo-800 rounded-full flex items-center justify-center border-2 border-pink-500 dark:border-teal-400 neon-icon-box">
                  <Brain className="h-10 w-10 text-pink-500 dark:text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-white">
                  No Personality Data Available
                </h2>
                <p className="text-indigo-800 dark:text-gray-300 mb-6">
                  You haven't created your profile yet. Complete your profile to discover your personality type and find
                  compatible matches.
                </p>
                <Link
                  href="/profile"
                  className="px-6 py-3 bg-pink-500 dark:bg-teal-400 text-white dark:text-indigo-950 rounded-full hover:bg-pink-600 dark:hover:bg-teal-500 transition-colors neon-button-pink neon-button-3d inline-flex items-center gap-2"
                >
                  <User className="h-5 w-5" />
                  Create Your Profile
                </Link>
              </div>
            ) : (
              <>
                {/* User's Personality Type */}
                {userPersonality && userPersonalityType && (
                  <div className="mb-8 bg-white/80 dark:bg-indigo-900/50 rounded-xl p-6 backdrop-blur-sm neon-card-subtle">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-900 dark:text-white flex items-center">
                      <Brain className="h-6 w-6 mr-2 text-pink-500 dark:text-teal-400" />
                      Your Personality Type: {userPersonality} - {userPersonalityType.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <p className="text-indigo-800 dark:text-gray-300 mb-4">{userPersonalityType.description}</p>

                        <h3 className="text-lg font-bold mb-3 text-indigo-900 dark:text-white flex items-center">
                          <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 mr-1" />
                          Your Strengths
                        </h3>
                        <ul className="space-y-1 mb-6">
                          {userPersonalityType.strengths.map((strength) => (
                            <li key={strength} className="flex items-center text-indigo-800 dark:text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                              {strength}
                            </li>
                          ))}
                        </ul>

                        <h3 className="text-lg font-bold mb-3 text-indigo-900 dark:text-white flex items-center">
                          <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 mr-1" />
                          Areas for Growth
                        </h3>
                        <ul className="space-y-1">
                          {userPersonalityType.weaknesses.map((weakness) => (
                            <li key={weakness} className="flex items-center text-indigo-800 dark:text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></div>
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mb-3 text-indigo-900 dark:text-white flex items-center">
                          <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 mr-1" />
                          Your Relationship Style
                        </h3>
                        <p className="text-indigo-800 dark:text-gray-300 mb-6">{userPersonalityType.relationships}</p>

                        <h3 className="text-lg font-bold mb-3 text-indigo-900 dark:text-white flex items-center">
                          <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 mr-1" />
                          Most Compatible With
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {userPersonalityType.compatibility.map((type) => (
                            <button
                              key={type}
                              onClick={() => setSelectedType(type)}
                              className="bg-pink-100 dark:bg-indigo-800 text-pink-600 dark:text-teal-300 px-3 py-1 rounded-full text-sm hover:bg-pink-200 dark:hover:bg-indigo-700 transition-colors"
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Dating Tips */}
                    <div className="bg-pink-50 dark:bg-indigo-800/30 p-4 rounded-lg">
                      <h3 className="text-lg font-bold mb-2 text-indigo-900 dark:text-white flex items-center">
                        <Heart className="h-5 w-5 text-pink-500 dark:text-teal-400 mr-2" />
                        Dating Tips for You
                      </h3>
                      <div className="flex items-start gap-2">
                        <Info className="h-5 w-5 text-pink-500 dark:text-teal-400 shrink-0 mt-0.5" />
                        <p className="text-indigo-800 dark:text-gray-300">
                          As an {userPersonality}, you thrive in relationships that offer{" "}
                          {userPersonality.includes("N")
                            ? "intellectual stimulation and deep connection"
                            : "practical support and reliability"}
                          . Look for partners who appreciate your{" "}
                          {userPersonality.includes("T")
                            ? "logical approach and independent nature"
                            : "emotional depth and empathetic understanding"}
                          . Be mindful of your tendency to{" "}
                          {userPersonality.includes("J")
                            ? "be overly structured and critical"
                            : "avoid conflict and procrastinate on decisions"}
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Explore Other Personality Types */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-indigo-900 dark:text-white">
                    Explore Other Personality Types
                  </h2>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-indigo-400 dark:text-gray-500" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search personality types..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-white placeholder-indigo-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-teal-400"
                      />
                    </div>

                    <div className="relative w-full md:w-64">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 border border-indigo-200 dark:border-indigo-700 rounded-lg bg-white/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-white"
                      >
                        <span>
                          {selectedType && selectedType !== userPersonality
                            ? `${selectedType} - ${personalityTypes.find((p) => p.id === selectedType)?.title}`
                            : "Select personality type"}
                        </span>
                        <ChevronDown className={`h-5 w-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-700 rounded-lg shadow-lg max-h-60 overflow-auto">
                          {personalityTypes.map((personality) => (
                            <button
                              key={personality.id}
                              onClick={() => {
                                setSelectedType(personality.id)
                                setIsDropdownOpen(false)
                              }}
                              className={`w-full text-left px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-800 ${
                                selectedType === personality.id
                                  ? "bg-pink-50 dark:bg-indigo-800/50 text-pink-500 dark:text-teal-400"
                                  : "text-indigo-900 dark:text-white"
                              }`}
                            >
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full ${personality.color} mr-2`}></div>
                                <span className="font-medium">{personality.id}</span>
                                <span className="text-sm text-indigo-600 dark:text-gray-300 ml-2">
                                  {personality.title}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Personality Type Grid */}
                {!selectedType || selectedType === userPersonality ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {filteredTypes.map((type) => (
                      <FadeInSection key={type.id} direction="up" delay={0.1} className="h-full">
                        <button
                          onClick={() => setSelectedType(type.id)}
                          className={`bg-white/80 dark:bg-indigo-900/50 rounded-xl p-4 backdrop-blur-sm neon-card-subtle h-full flex flex-col hover:shadow-lg transition-shadow ${
                            type.id === userPersonality ? "border-2 border-pink-500 dark:border-teal-400" : ""
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            <div className={`w-3 h-3 rounded-full ${type.color} mr-2`}></div>
                            <h3 className="text-lg font-bold text-indigo-900 dark:text-white">{type.id}</h3>
                            {type.id === userPersonality && (
                              <span className="ml-2 text-xs bg-pink-500 dark:bg-teal-400 text-white dark:text-indigo-950 px-2 py-0.5 rounded-full">
                                You
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-medium text-pink-500 dark:text-teal-400 mb-2">{type.title}</h4>
                          <p className="text-xs text-indigo-800 dark:text-gray-300 line-clamp-3">{type.description}</p>
                        </button>
                      </FadeInSection>
                    ))}
                  </div>
                ) : (
                  selectedType &&
                  selectedPersonalityType &&
                  selectedType !== userPersonality && (
                    <FadeInSection direction="up" delay={0.2}>
                      <div className="bg-white/80 dark:bg-indigo-900/50 rounded-xl p-6 backdrop-blur-sm neon-card-subtle mb-8">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full ${selectedPersonalityType.color} mr-3`}></div>
                              <h2 className="text-3xl font-bold text-indigo-900 dark:text-white">
                                {selectedPersonalityType.id}
                              </h2>
                              <span className="ml-3 text-xl text-pink-500 dark:text-teal-400">
                                {selectedPersonalityType.title}
                              </span>
                            </div>
                            <p className="text-indigo-800 dark:text-gray-300 mt-2">
                              {selectedPersonalityType.description}
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedType(userPersonality)}
                            className="text-indigo-600 dark:text-gray-300 hover:text-pink-500 dark:hover:text-teal-400"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Strengths & Weaknesses */}
                          <div>
                            <h3 className="text-lg font-bold mb-3 text-indigo-900 dark:text-white flex items-center">
                              <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 mr-1" />
                              Strengths
                            </h3>
                            <ul className="space-y-1 mb-6">
                              {selectedPersonalityType.strengths.map((strength) => (
                                <li key={strength} className="flex items-center text-indigo-800 dark:text-gray-300">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                                  {strength}
                                </li>
                              ))}
                            </ul>

                            <h3 className="text-lg font-bold mb-3 text-indigo-900 dark:text-white flex items-center">
                              <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 mr-1" />
                              Weaknesses
                            </h3>
                            <ul className="space-y-1">
                              {selectedPersonalityType.weaknesses.map((weakness) => (
                                <li key={weakness} className="flex items-center text-indigo-800 dark:text-gray-300">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></div>
                                  {weakness}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Relationships & Careers */}
                          <div>
                            <h3 className="text-lg font-bold mb-3 text-indigo-900 dark:text-white flex items-center">
                              <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 mr-1" />
                              Relationships
                            </h3>
                            <p className="text-indigo-800 dark:text-gray-300 mb-6">
                              {selectedPersonalityType.relationships}
                            </p>

                            <h3 className="text-lg font-bold mb-3 text-indigo-900 dark:text-white flex items-center">
                              <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 mr-1" />
                              Career Paths
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-6">
                              {selectedPersonalityType.careers.map((career) => (
                                <span
                                  key={career}
                                  className="bg-indigo-100 dark:bg-indigo-800 text-indigo-900 dark:text-white px-2 py-1 rounded-full text-sm"
                                >
                                  {career}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Compatibility & Famous People */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-lg font-bold mb-3 text-indigo-900 dark:text-white flex items-center">
                              <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 mr-1" />
                              Most Compatible With
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedPersonalityType.compatibility.map((type) => (
                                <button
                                  key={type}
                                  onClick={() => setSelectedType(type)}
                                  className={`bg-pink-100 dark:bg-indigo-800 text-pink-600 dark:text-teal-300 px-3 py-1 rounded-full text-sm hover:bg-pink-200 dark:hover:bg-indigo-700 transition-colors ${
                                    type === userPersonality ? "border border-pink-500 dark:border-teal-400" : ""
                                  }`}
                                >
                                  {type}
                                  {type === userPersonality && " (You)"}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold mb-3 text-indigo-900 dark:text-white flex items-center">
                              <ChevronRight className="h-5 w-5 text-pink-500 dark:text-teal-400 mr-1" />
                              Famous People
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedPersonalityType.famous.map((person) => (
                                <span
                                  key={person}
                                  className="bg-indigo-100 dark:bg-indigo-800 text-indigo-900 dark:text-white px-2 py-1 rounded-full text-sm"
                                >
                                  {person}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Compatibility with User */}
                        {userPersonality && (
                          <div className="mt-8 bg-pink-50 dark:bg-indigo-800/30 p-4 rounded-lg">
                            <h3 className="text-lg font-bold mb-2 text-indigo-900 dark:text-white flex items-center">
                              <Heart className="h-5 w-5 text-pink-500 dark:text-teal-400 mr-2" />
                              Compatibility with Your Type ({userPersonality})
                            </h3>
                            <div className="flex items-start gap-2">
                              <Info className="h-5 w-5 text-pink-500 dark:text-teal-400 shrink-0 mt-0.5" />
                              <p className="text-indigo-800 dark:text-gray-300 text-sm">
                                {selectedPersonalityType.compatibility.includes(userPersonality)
                                  ? `Great news! ${selectedPersonalityType.id} is highly compatible with your ${userPersonality} personality. You complement each other well, with their ${selectedPersonalityType.id.includes("E") ? "extroverted" : "introverted"} nature balancing your ${userPersonality.includes("E") ? "extroverted" : "introverted"} tendencies.`
                                  : `${selectedPersonalityType.id} and your ${userPersonality} personality may face some challenges in compatibility. While differences can create growth opportunities, you'll need to work on understanding each other's communication styles and needs.`}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </FadeInSection>
                  )
                )}

                {/* Find Matches Button */}
                <div className="flex justify-center">
                  <Link
                    href="/matches"
                    className="px-6 py-3 bg-pink-500 dark:bg-teal-400 text-white dark:text-indigo-950 rounded-full hover:bg-pink-600 dark:hover:bg-teal-500 transition-colors neon-button-pink neon-button-3d flex items-center gap-2"
                  >
                    <Heart className="h-5 w-5" />
                    Find Compatible Matches
                  </Link>
                </div>
              </>
            )}
          </div>
        </FadeInSection>
      </div>
    </div>
  )
}

