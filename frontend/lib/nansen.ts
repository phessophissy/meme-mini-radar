export async function getTopMemeTokens() {
  try {
    // Using Smart Money Holdings endpoint to get tokens smart money is buying
    const res = await fetch("https://api.nansen.ai/api/v1/smart-money/holdings", {
      method: "POST",
      headers: {
        "apiKey": process.env.NANSEN_API_KEY || "faiPiZmitocKPy3n7nxYSGOPTSs7PrC9",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chains: ["base"],
        pagination: {
          page: 1,
          per_page: 50
        },
        order_by: [
          {
            field: "value_usd",
            direction: "DESC"
          }
        ]
      })
    });

    if (!res.ok) {
      console.log(`Nansen API returned status ${res.status}, using mock data`);
      return generateMockData();
    }

    const json = await res.json();

    // Process the response and extract top 15 tokens
    const tokens = json.data
      ?.slice(0, 15)
      .map((item: any, index: number) => {
        // Calculate whale activity based on holder count and value
        const whaleActivity = Math.min(100, Math.floor((item.holders_count || 1) * 3 + (item.value_usd / 100000)));
        
        // Smart money flow based on 24h balance change
        const smartMoneyFlow = Math.min(100, Math.max(0, 
          50 + Math.floor((item.balance_24h_percent_change || 0) * 10000)
        ));
        
        return {
          symbol: item.token_symbol || "UNKNOWN",
          address: item.token_address || "0x0000000000000000000000000000000000000000",
          score: Math.max(0, Math.min(100, 100 - (index * 5))),
          whaleActivity,
          smartMoneyFlow,
          volume24h: item.value_usd ? `$${(item.value_usd / 1000000).toFixed(2)}M` : "N/A",
          marketCap: item.market_cap_usd ? `$${(item.market_cap_usd / 1000000).toFixed(2)}M` : "N/A",
          holders: item.holders_count || 0,
          age: item.token_age_days || 0
        };
      }) || [];

    if (tokens.length > 0) {
      console.log(` Loaded ${tokens.length} real tokens from Nansen API`);
      return tokens;
    }
    
    return generateMockData();
  } catch (error) {
    console.error("Error fetching Nansen data:", error);
    return generateMockData();
  }
}

function generateMockData() {
  // Mock data with realistic Base meme tokens that could appear
  const mockTokens = [
    { symbol: "BRETT", address: "0x532f27101965dd16442E59d40670FaF5eBB142E4", score: 95, whaleActivity: 88, smartMoneyFlow: 92 },
    { symbol: "TOSHI", address: "0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4", score: 88, whaleActivity: 76, smartMoneyFlow: 85 },
    { symbol: "BASED", address: "0xBa5E6fa2f33f3955f0cef50c63dCC84861eAb663", score: 82, whaleActivity: 82, smartMoneyFlow: 78 },
    { symbol: "AERO", address: "0x940181a94a35a4569e4529a3cdfb74e38fd98631", score: 76, whaleActivity: 65, smartMoneyFlow: 71 },
    { symbol: "DEGEN", address: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed", score: 71, whaleActivity: 71, smartMoneyFlow: 68 },
    { symbol: "VIRTUAL", address: "0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b", score: 68, whaleActivity: 59, smartMoneyFlow: 64 },
    { symbol: "NORMIE", address: "0x7F12d13B34F5F4f0a9449c16Bcd42f0da47AF200", score: 64, whaleActivity: 68, smartMoneyFlow: 58 },
    { symbol: "MOCHI", address: "0xF6e932Ca12afa26665dC4dDE7e27be02A7c02e50", score: 59, whaleActivity: 54, smartMoneyFlow: 61 },
    { symbol: "KEYCAT", address: "0x9EF1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e", score: 55, whaleActivity: 61, smartMoneyFlow: 52 },
    { symbol: "HIGHER", address: "0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe", score: 51, whaleActivity: 48, smartMoneyFlow: 55 },
    { symbol: "REGEN", address: "0x2F0b4300074aFC01726262d4cC9C1D2619d7297a", score: 47, whaleActivity: 52, smartMoneyFlow: 45 },
    { symbol: "ONCHAIN", address: "0x4200000000000000000000000000000000000042", score: 43, whaleActivity: 41, smartMoneyFlow: 48 },
    { symbol: "BUILD", address: "0x3C281A39944a2319aA653D81Cfd93Ca10983D234", score: 39, whaleActivity: 45, smartMoneyFlow: 39 },
    { symbol: "FREN", address: "0x0f5B804Fc82Cc2C4F9623Ad6A4C65D6B7e7fE2Bd", score: 35, whaleActivity: 38, smartMoneyFlow: 42 },
    { symbol: "MFER", address: "0x2bad52988bDb3D89c67F1fB93cC49C0c5a9f7F1c", score: 31, whaleActivity: 35, smartMoneyFlow: 33 },
  ];

  console.log(" Using mock data - Nansen API unavailable");
  return mockTokens;
}
