"use client";

import React, { useEffect, useState } from "react";
import TokenCard from "../components/TokenCard";
import Header from "../components/Header";

interface MemeToken {
  symbol: string;
  address: string;
  score: number;
  whaleActivity?: number;
  smartMoneyFlow?: number;
  volume24h?: string;
}

export default function Home() {
  const [tokens, setTokens] = useState<MemeToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/nansen");
        const data = await res.json();

        if (data.success && data.top15) {
          setTokens(data.top15);
        } else {
          setError("Failed to load tokens");
        }
      } catch (err) {
        console.error("Error loading tokens:", err);
        setError("Error connecting to API");
      } finally {
        setLoading(false);
      }
    }
    load();

    // Auto-refresh every 5 minutes
    const interval = setInterval(load, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen animated-gradient p-3 md:p-5">
      <Header tokenCount={tokens.length} />

      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="loading-spinner"></div>
          <p className="text-lg mt-4 text-white font-bold animate-pulse">
            Scanning whale movements...
          </p>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto text-center bg-red-500/20 border-2 border-red-400 rounded-2xl p-6">
          <p className="text-xl font-bold text-red-200">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-2">
            {tokens.map((token, i) => (
              <TokenCard key={i} token={token} index={i} />
            ))}
          </div>
        </div>
      )}

      <footer className="mt-8 text-center text-white/70 text-xs pb-4">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <span className="pulse-dot-small"></span>
          <p className="font-bold">Live Updates Every 5min</p>
          <span className="text-tan-light"></span>
          <p> Whale Tracker</p>
          <span className="text-tan-light"></span>
          <p> Smart Money Flow</p>
          <span className="text-tan-light"></span>
          <p>Powered by Nansen</p>
        </div>
      </footer>
    </div>
  );
}
