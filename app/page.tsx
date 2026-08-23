'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  media_type: string;
  vote_average: number;
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);

  const searchMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <header className="max-w-5xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-500">MediaTracker</h1>
        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition"
        >
          Account / Login
        </Link>
      </header>

      <main className="max-w-5xl mx-auto">
        <form onSubmit={searchMedia} className="flex gap-2 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies or TV shows..."
            className="flex-1 p-3 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500 text-white"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold transition"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-center text-slate-400">Searching...</p>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-lg overflow-hidden shadow-lg border border-slate-700 flex flex-col"
            >
              {item.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t500${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-72 object-cover"
                />
              ) : (
                <div className="w-full h-72 bg-slate-700 flex items-center justify-center text-slate-400">
                  No Image
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg leading-snug mb-1">
                    {item.title || item.name}
                  </h3>
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">
                    {item.media_type} • {item.release_date || item.first_air_date || 'N/A'}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-700">
                  <span className="text-sm font-semibold text-yellow-400">
                    ★ {item.vote_average?.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}