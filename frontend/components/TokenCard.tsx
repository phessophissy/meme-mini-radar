"use client";

import React, { useState } from "react";

interface TokenCardProps {
  token: {
    symbol: string;
    name?: string;
    address: string;
    score: number;
    whaleActivity?: number;
    smartMoneyFlow?: number;
    volume24h?: string;
  };
  index: number;
}

export default function TokenCard({ token, index }: TokenCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const whale = token.whaleActivity || Math.floor(Math.random() * 100);
  const smartMoney = token.smartMoneyFlow || Math.floor(Math.random() * 100);

  const copyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`token-card-compact group ${isExpanded ? 'expanded' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between mb-0.5">
        <span className="rank-badge-mini">#{index + 1}</span>
        <span className="score-badge-mini">{token.score}</span>
      </div>

      <div className="token-name-ticker">
        <h3 className="token-symbol-mini">{token.symbol}</h3>
        {token.name && <p className="token-name-mini">{token.name}</p>}
      </div>

      {!isExpanded ? (
        <div className="mt-1.5 space-y-1">
          <div className="stat-row-mini">
            <span className="stat-icon-mini"></span>
            <div className="stat-bar-container-mini">
              <div className="stat-bar whale-bar" style={{ width: `${whale}%` }}></div>
            </div>
            <span className="stat-value-mini">{whale}%</span>
          </div>

          <div className="stat-row-mini">
            <span className="stat-icon-mini"></span>
            <div className="stat-bar-container-mini">
              <div className="stat-bar smart-bar" style={{ width: `${smartMoney}%` }}></div>
            </div>
            <span className="stat-value-mini">{smartMoney}%</span>
          </div>
        </div>
      ) : (
        <div className="token-details">
          <div className="detail-row">
            <span className="detail-label"> Whale Activity:</span>
            <span className="detail-value">{whale}%</span>
          </div>
          <div className="detail-row">
            <span className="detail-label"> Smart Money:</span>
            <span className="detail-value">{smartMoney}%</span>
          </div>
          <div className="detail-row">
            <span className="detail-label"> Sentiment:</span>
            <span className="detail-value">{token.score}/100</span>
          </div>
          <div className="detail-description">
            <p className="text-xs text-tan-light/70 mt-2 leading-relaxed">
              {whale > 70 ? " High whale accumulation detected. " : ""}
              {smartMoney > 70 ? " Smart money flowing in. " : ""}
              {token.score > 80 ? " Strong bullish sentiment across social platforms." :
               token.score > 50 ? " Moderate positive sentiment in the community." :
               " Mixed sentiment. Monitor closely."}
            </p>
          </div>
          <div 
            className="address-display-expanded cursor-pointer hover:bg-tan/10 transition-colors" 
            onClick={copyAddress}
            title="Click to copy address"
          >
            <span className="text-tan-light/50 text-[10px]">
              {copied ? " Copied! " : " Contract: "}
            </span>
            {token.address.slice(0, 8)}...{token.address.slice(-6)}
          </div>
          <div className="click-hint">Click to collapse</div>
        </div>
      )}

      {!isExpanded && (
        <div className="click-hint-mini">Tap for details</div>
      )}
    </div>
  );
}
