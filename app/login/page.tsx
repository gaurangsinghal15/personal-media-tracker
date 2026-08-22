'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [message, setMessage] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('Processing...')

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Account created! Check your email to confirm.')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else setMessage('Successfully logged in!')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? 'Create Track Account' : 'Welcome Back'}
        </h1>
        
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-slate-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2.5 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2.5 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 font-semibold p-2.5 rounded transition"
          >
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-yellow-400">{message}</p>}

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full text-center text-sm text-slate-400 hover:underline mt-4"
        >
          {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  )
}