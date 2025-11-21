"use client";

import React, { useEffect, useState } from "react";
import TokenCard from "../components/TokenCard";
import Header from "../components/Header";
import { sdk } from '@farcaster/miniapp-sdk';

interface MemeToken {
  symbol: string;
  name?: string;
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
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    try {
      setRefreshing(true);
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
      setRefreshing(false);
    }
  };

  const handleManualRefresh = () => {
    if (!refreshing) {
      load();
    }
  };

  useEffect(() => {
    load();    // Auto-refresh every 5 minutes
    const interval = setInterval(load, 300000);
    return () => clearInterval(interval);
  }, []);

  // Initialize MiniApp SDK when app is ready
  useEffect(() => {
    if (!loading && tokens.length > 0) {
      sdk.actions.ready().catch(console.error);
    }
  }, [loading, tokens]);

  return (
    <div className="min-h-screen animated-gradient p-3 md:p-5">
      <Header tokenCount={tokens.length} />
      
      {/* Refresh Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleManualRefresh}
          disabled={refreshing}
          className={`refresh-button ${refreshing ? 'refreshing' : ''}`}
        >
          <span className="refresh-icon">🔄</span>
          <span>{refreshing ? 'Refreshing...' : 'Refresh Now'}</span>
        </button>
      </div>

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
        <div className="max-w-7xl mx-auto relative">
          <div className="floating-balloons"></div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-2 relative z-10">
            {tokens.map((token, i) => (
              <TokenCard key={i} token={token} index={i} />
            ))}
          </div>
        </div>
      )}

      <footer className="mt-8 text-center text-white/80 pb-4">
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            <span className="pulse-dot-small"></span>
            <p className="font-bold text-tan-light text-sm">Live Updates Every 5min</p>
          </div>
          
          <div className="flex items-center gap-4 flex-wrap justify-center text-xs text-white/70">
            <p className="flex items-center gap-1">
              <span>🐋</span>
              <span>Whale Tracker</span>
            </p>
            <span className="text-tan-light/50">•</span>
            <p className="flex items-center gap-1">
              <span>💰</span>
              <span>Smart Money Flow</span>
            </p>
            <span className="text-tan-light/50">•</span>
            <p className="text-tan-light/90">Powered by Nansen</p>
          </div>
          
          <p className="text-xs text-tan-light/70 mt-1">
            Created by{" "}
            <a 
              href="https://x.com/phessophissy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-tan font-semibold hover:text-tan-light transition-colors hover:underline"
            >
              @Phessophissy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
