'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(isSignUp ? 'Account created! (Demo)' : 'Logged in! (Demo)');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="bg-slate-800 p-8 rounded-xl shadow-xl w-full max-w-md border border-slate-700">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h1>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2.5 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2.5 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-500 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded font-semibold transition mt-2"
          >
            {isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-blue-400 bg-slate-700 p-2 rounded">
            {message}
          </p>
        )}

        <div className="mt-6 text-center text-sm text-slate-400">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-400 hover:underline font-medium ml-1"
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
}