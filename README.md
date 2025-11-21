#  Meme Mini-Radar

A **Base-exclusive Meme Token Sentiment Radar** built as a BaseApp mini-app. Features a colorful cartoon-themed UI with real-time sentiment tracking powered by Nansen API.

##  Features

-  **Real-time Meme Token Tracking** - Top 15 trending meme tokens on Base
-  **Cartoon-Themed UI** - Colorful bubble design with italic bold Century Gothic font
-  **On-Chain Storage** - Smart contract stores daily top tokens
-  **BaseApp Integration** - Deployable as a Base mini-app
-  **Sentiment Scores** - 0-100 scoring system for each token

##  Project Structure

```
meme-mini-radar/
 contracts/
    MemeMiniRadar.sol          # Smart contract for on-chain storage
 scripts/
    deploy.js                  # Deployment script (optional)
 frontend/
    app/
       page.tsx               # Main dashboard
       globals.css            # Cartoon theme styling
       api/
           nansen/
               route.ts       # Nansen API integration
    components/
       TokenCard.tsx          # Token display card
       Header.tsx             # Page header
    lib/
       nansen.ts              # Nansen API logic
    baseapp.json               # BaseApp manifest
    .env.local                 # Environment variables
 hardhat.config.js              # Hardhat configuration
 README.md
```

##  Quick Start

### Prerequisites

- Node.js 18+ and npm
- WSL/Ubuntu (recommended)
- MetaMask or another Web3 wallet

### Installation

1. **Install Dependencies**

```bash
# Root project (for Hardhat - optional)
cd meme-mini-radar
npm install

# Frontend
cd frontend
npm install
```

2. **Configure Environment**

The Nansen API key is already configured in `frontend/.env.local`:
```
NANSEN_API_KEY=faiPiZmitocKPy3n7nxYSGOPTSs7PrC9
```

3. **Run Development Server**

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

##  Smart Contract Deployment (Using Remix)

### Deploy with Remix IDE

1. **Open Remix IDE**
   - Go to [https://remix.ethereum.org](https://remix.ethereum.org)

2. **Create New File**
   - Create `MemeMiniRadar.sol`
   - Copy the contract code from `contracts/MemeMiniRadar.sol`

3. **Compile**
   - Select Solidity compiler version `0.8.20`
   - Click "Compile MemeMiniRadar.sol"

4. **Deploy to Base**
   - Switch to "Deploy & Run Transactions" tab
   - Environment: Select "Injected Provider - MetaMask"
   - Make sure MetaMask is connected to **Base Mainnet**
     - Network: Base
     - Chain ID: 8453
     - RPC: https://mainnet.base.org
   - Click "Deploy"
   - Confirm transaction in MetaMask

5. **Copy Contract Address**
   - After deployment, copy the contract address
   - Update `frontend/.env.local`:
     ```
     NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
     ```
   - Update `frontend/baseapp.json`:
     ```json
     "contract_addresses": {
       "base": ["0xYourContractAddress"]
     }
     ```

### Alternative: Deploy with Hardhat (Optional)

```bash
# Create .env file
cp .env.example .env

# Add your private key to .env
# PRIVATE_KEY=your_private_key_here

# Deploy to Base mainnet
npx hardhat run scripts/deploy.js --network base

# Or deploy to Base Sepolia testnet
npx hardhat run scripts/deploy.js --network baseSepolia
```

##  UI Customization

The app uses a colorful cartoon theme with:
- **Pastel gradient backgrounds** (pink  purple  yellow)
- **Bubble cards** with shadow effects on hover
- **Italic bold Century Gothic font**
- **Dynamic color coding** for different tokens

Customize colors in `frontend/components/TokenCard.tsx`:
```typescript
const colors = [
  "border-pink-400 bg-pink-50",
  "border-blue-400 bg-blue-50",
  // Add more color combinations
];
```

##  Nansen API Integration

The app uses Nansen API to fetch trending meme tokens. The API route is configured with:
- **Endpoint**: `https://api.nansen.ai/external/trending-tokens`
- **Filter**: Base chain + meme category
- **Fallback**: Mock data if API is unavailable

##  BaseApp Deployment

To deploy as a BaseApp mini-app:

1. **Build Frontend**
```bash
cd frontend
npm run build
```

2. **Update baseapp.json**
   - Set your `homepage_url`
   - Add deployed contract address

3. **Upload to BaseApp**
   - Go to BaseApp dashboard
   - Upload `baseapp.json` + build output
   - Follow BaseApp deployment instructions

##  Smart Contract Functions

### Owner Functions (Write)
- `addMemeToken(day, token, symbol, score)` - Add a token for a specific day
- `resetDay(day)` - Clear tokens for a specific day

### Public Functions (Read)
- `getDailyTokens(day)` - Get all tokens for a specific day
- `countForDay(day)` - Get count of tokens stored for a day

Example usage with ethers.js:
```javascript
const day = Math.floor(Date.now() / 86400000); // Current day
const [tokens, count] = await contract.getDailyTokens(day);
```

##  Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Custom CSS (Century Gothic)
- **Smart Contract**: Solidity 0.8.20
- **Blockchain**: Base L2
- **API**: Nansen API
- **Development**: Hardhat, Remix IDE

##  Development Notes

- The app works with or without blockchain deployment (uses mock data)
- Nansen API includes fallback to mock data if requests fail
- Contract deployment is optional for frontend development
- Use Base Sepolia testnet for testing before mainnet

##  Important Notes

- **Never commit** your private keys or API keys
- Use `.env.local` for sensitive data (already gitignored)
- Test on testnet (Base Sepolia) before mainnet deployment
- The Nansen API key provided is for development - consider getting your own for production

##  License

MIT License - feel free to use and modify!

##  Contributing

Built following the specifications for a Base-exclusive meme token sentiment radar with cartoon UI and Nansen API integration.

---

**Built for Base  | Powered by Nansen  | Designed with **
