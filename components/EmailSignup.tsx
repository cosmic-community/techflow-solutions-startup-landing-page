'use client'

import { useState } from 'react'

interface EmailSignupProps {
  inline?: boolean
}

export default function EmailSignup({ inline = false }: EmailSignupProps) {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setMessage('Please enter your email address')
      return
    }

    setIsLoading(true)
    setMessage('')
    setIsSuccess(false)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          source: 'website'
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSuccess(true)
        setMessage(data.message || 'Thanks for signing up! We\'ll be in touch soon.')
        setEmail('')
        setFirstName('')
      } else {
        setIsSuccess(false)
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setIsSuccess(false)
      setMessage('Network error. Please check your connection and try again.')
      console.error('Subscription error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (inline) {
    return (
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            {isLoading ? 'Signing up...' : 'Get Early Access'}
          </button>
        </form>
        
        {message && (
          <div className={`mt-3 text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name (optional)"
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 disabled:opacity-50"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 disabled:opacity-50"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200"
        >
          {isLoading ? 'Signing up...' : 'Get Early Access'}
        </button>
      </form>
      
      {message && (
        <div className={`mt-4 text-sm text-center ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </div>
      )}
    </div>
  )
}