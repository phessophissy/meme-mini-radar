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

    // Process the response and extract top 30 tokens
    const tokens = json.data
      ?.slice(0, 30)
      .map((item: any, index: number) => {
        const whaleActivity = Math.min(100, Math.floor((item.holders_count || 1) * 3 + (item.value_usd / 100000)));
        const smartMoneyFlow = Math.min(100, Math.max(0,
          50 + Math.floor((item.balance_24h_percent_change || 0) * 10000)
        ));

        return {
          symbol: item.token_symbol || "UNKNOWN",
          name: item.token_name || item.token_symbol || "Unknown",
          address: item.token_address || "0x0000000000000000000000000000000000000000",
          score: Math.max(0, Math.min(100, 100 - (index * 3))),
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
  const mockTokens = [
    { symbol: "BRETT", name: "Brett", address: "0x532f27101965dd16442E59d40670FaF5eBB142E4", score: 97, whaleActivity: 88, smartMoneyFlow: 92 },
    { symbol: "TOSHI", name: "Toshi", address: "0xAC1Bd2486aAf3B5C0fc3Fd868558b082a531B2B4", score: 94, whaleActivity: 76, smartMoneyFlow: 85 },
    { symbol: "BASED", name: "Based", address: "0xBa5E6fa2f33f3955f0cef50c63dCC84861eAb663", score: 91, whaleActivity: 82, smartMoneyFlow: 78 },
    { symbol: "AERO", name: "Aerodrome", address: "0x940181a94a35a4569e4529a3cdfb74e38fd98631", score: 88, whaleActivity: 65, smartMoneyFlow: 71 },
    { symbol: "DEGEN", name: "Degen", address: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed", score: 85, whaleActivity: 71, smartMoneyFlow: 68 },
    { symbol: "VIRTUAL", name: "Virtual", address: "0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b", score: 82, whaleActivity: 59, smartMoneyFlow: 64 },
    { symbol: "NORMIE", name: "Normie", address: "0x7F12d13B34F5F4f0a9449c16Bcd42f0da47AF200", score: 79, whaleActivity: 68, smartMoneyFlow: 58 },
    { symbol: "MOCHI", name: "Mochi", address: "0xF6e932Ca12afa26665dC4dDE7e27be02A7c02e50", score: 76, whaleActivity: 54, smartMoneyFlow: 61 },
    { symbol: "KEYCAT", name: "Keyboard Cat", address: "0x9EF1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e", score: 73, whaleActivity: 61, smartMoneyFlow: 52 },
    { symbol: "HIGHER", name: "Higher", address: "0x0578d8A44db98B23BF096A382e016e29a5Ce0ffe", score: 70, whaleActivity: 48, smartMoneyFlow: 55 },
    { symbol: "REGEN", name: "Regen", address: "0x2F0b4300074aFC01726262d4cC9C1D2619d7297a", score: 67, whaleActivity: 52, smartMoneyFlow: 45 },
    { symbol: "ONCHAIN", name: "Onchain", address: "0x4200000000000000000000000000000000000042", score: 64, whaleActivity: 41, smartMoneyFlow: 48 },
    { symbol: "BUILD", name: "Build", address: "0x3C281A39944a2319aA653D81Cfd93Ca10983D234", score: 61, whaleActivity: 45, smartMoneyFlow: 39 },
    { symbol: "FREN", name: "Fren", address: "0x0f5B804Fc82Cc2C4F9623Ad6A4C65D6B7e7fE2Bd", score: 58, whaleActivity: 38, smartMoneyFlow: 42 },
    { symbol: "MFER", name: "Mfer", address: "0x2bad52988bDb3D89c67F1fB93cC49C0c5a9f7F1c", score: 55, whaleActivity: 35, smartMoneyFlow: 33 },
    { symbol: "DOGE", name: "Dogecoin", address: "0x4200000000000000000000000000000000000001", score: 52, whaleActivity: 88, smartMoneyFlow: 92 },
    { symbol: "PEPE", name: "Pepe", address: "0x4200000000000000000000000000000000000002", score: 49, whaleActivity: 76, smartMoneyFlow: 85 },
    { symbol: "SHIB", name: "Shiba Inu", address: "0x4200000000000000000000000000000000000003", score: 46, whaleActivity: 82, smartMoneyFlow: 78 },
    { symbol: "FLOKI", name: "Floki Inu", address: "0x4200000000000000000000000000000000000004", score: 43, whaleActivity: 65, smartMoneyFlow: 71 },
    { symbol: "BONK", name: "Bonk", address: "0x4200000000000000000000000000000000000005", score: 40, whaleActivity: 71, smartMoneyFlow: 68 },
    { symbol: "WIF", name: "Dogwifhat", address: "0x4200000000000000000000000000000000000006", score: 37, whaleActivity: 59, smartMoneyFlow: 64 },
    { symbol: "BOME", name: "Book of Meme", address: "0x4200000000000000000000000000000000000007", score: 34, whaleActivity: 68, smartMoneyFlow: 58 },
    { symbol: "MEME", name: "Memecoin", address: "0x4200000000000000000000000000000000000008", score: 31, whaleActivity: 54, smartMoneyFlow: 61 },
    { symbol: "WOJAK", name: "Wojak", address: "0x420000000000000000000000000000000000000b", score: 28, whaleActivity: 52, smartMoneyFlow: 45 },
    { symbol: "MOON", name: "Mooncoin", address: "0x420000000000000000000000000000000000000c", score: 25, whaleActivity: 41, smartMoneyFlow: 48 },
    { symbol: "CHAD", name: "Chad", address: "0x420000000000000000000000000000000000000e", score: 22, whaleActivity: 38, smartMoneyFlow: 42 },
    { symbol: "HODL", name: "Hodl", address: "0x420000000000000000000000000000000000000f", score: 19, whaleActivity: 35, smartMoneyFlow: 33 },
    { symbol: "APU", name: "Apu Apustaja", address: "0x420000000000000000000000000000000000001c", score: 16, whaleActivity: 34, smartMoneyFlow: 24 },
    { symbol: "SMOL", name: "Smol", address: "0x420000000000000000000000000000000000001d", score: 13, whaleActivity: 26, smartMoneyFlow: 31 },
    { symbol: "BULB", name: "Bulb", address: "0x420000000000000000000000000000000000001e", score: 10, whaleActivity: 32, smartMoneyFlow: 19 },
  ];

  console.log(" Using mock data - Nansen API unavailable");
  return mockTokens;
}
