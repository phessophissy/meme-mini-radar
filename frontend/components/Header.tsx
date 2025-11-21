import React from "react";
import Image from "next/image";

interface HeaderProps {
  tokenCount: number;
}

export default function Header({ tokenCount }: HeaderProps) {
  return (
    <div className="text-center mb-8 relative">
      <div className="inline-block animate-float">
        {/* Logo */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <Image 
            src="/logo.png" 
            alt="Meme Mini-Radar Logo" 
            width={120} 
            height={120}
            className="drop-shadow-2xl"
            priority
          />
        </div>
        
        <h1 className="main-title">
          <span className="title-icon"></span>
          Meme Mini-Radar
          <span className="title-icon"></span>
        </h1>
      </div>

      <p className="subtitle">
        Real-Time Whale & Smart Money Tracker
      </p>

      <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
        <div className="info-chip">
          <span className="pulse-dot-small"></span>
          <span>Live Data</span>
        </div>
        <div className="info-chip">
          <span> Whale Activity</span>
        </div>
        <div className="info-chip">
          <span> Smart Money</span>
        </div>
        <div className="info-chip">
          <span>{tokenCount}/30 Tokens</span>
        </div>
      </div>
    </div>
  );
}
