"use client";

import React, { useState } from "react";

interface TokenCardProps {
  token: {
    symbol: string;
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
  const whale = token.whaleActivity || Math.floor(Math.random() * 100);
  const smartMoney = token.smartMoneyFlow || Math.floor(Math.random() * 100);
  
  return (
    <div 
      className={`token-card-compact group ${isExpanded ? 'expanded' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="rank-badge-small">#{index + 1}</span>
        <span className="score-badge-small">{token.score}</span>
      </div>
      
      <h3 className="token-symbol-small">{token.symbol}</h3>
      
      {!isExpanded ? (
        <div className="mt-2 space-y-1.5">
          <div className="stat-row-compact">
            <span className="stat-icon-small"></span>
            <div className="stat-bar-container-small">
              <div className="stat-bar whale-bar" style={{ width: `${whale}%` }}></div>
            </div>
            <span className="stat-value-small">{whale}%</span>
          </div>
          
          <div className="stat-row-compact">
            <span className="stat-icon-small"></span>
            <div className="stat-bar-container-small">
              <div className="stat-bar smart-bar" style={{ width: `${smartMoney}%` }}></div>
            </div>
            <span className="stat-value-small">{smartMoney}%</span>
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
          <div className="address-display-expanded">
            <span className="text-tan-light/50 text-[10px]">Contract: </span>
            {token.address.slice(0, 8)}...{token.address.slice(-6)}
          </div>
          <div className="click-hint">Click to collapse</div>
        </div>
      )}
      
      {!isExpanded && (
        <div className="click-hint-small">Click for details</div>
      )}
    </div>
  );
}
