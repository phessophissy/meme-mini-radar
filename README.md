#  Meme Mini-Radar

 **Live App:** https://meme-mini-radar.vercel.app

A **Base-exclusive Meme Token Whale & Smart Money Tracker** built as a BaseApp mini-app. Features a colorful cartoon-themed UI with real-time tracking powered by Nansen API.

##  Features

-  **Whale Activity Tracking** - Monitor whale movements on Base meme tokens
-  **Smart Money Flow** - Track where smart money is flowing
-  **Cartoon-Themed UI** - Colorful animated gradient design with compact mobile-friendly cards
-  **Auto-Refresh** - Updates every 5 minutes
-  **Mobile Optimized** - Fully responsive design
-  **On-Chain Storage** - Smart contract stores daily top tokens
-  **BaseApp Ready** - Deployable as a Base mini-app

##  Quick Start

### Prerequisites

- Node.js 18+ and npm
- MetaMask or another Web3 wallet (optional)

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/phessophissy/meme-mini-radar.git
cd meme-mini-radar
```

2. **Install Dependencies**
```bash
cd frontend
npm install
```

3. **Configure Environment**
Create `frontend/.env.local`:
```
NANSEN_API_KEY=your_nansen_api_key_here
```

4. **Run Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

##  Project Structure

```
meme-mini-radar/
 contracts/
    MemeMiniRadar.sol          # Smart contract for on-chain storage
 frontend/
    app/
       page.tsx               # Main dashboard
       globals.css            # Animated gradient theme
       api/
           nansen/
               route.ts       # Nansen API integration
    components/
       TokenCard.tsx          # Compact expandable token cards
       Header.tsx             # Animated header
    lib/
       nansen.ts              # Nansen API logic
    baseapp.json               # BaseApp manifest
 README.md
```

##  UI Features

- **Animated Gradient Background** - Smooth color transitions
- **Compact Token Cards** - Click to expand for details
- **Whale & Smart Money Bars** - Visual progress indicators
- **Mobile-First Design** - Optimized for all screen sizes
- **Readable Gold/Wheat Colors** - High contrast text

##  Nansen API Integration

The app uses Nansen's Smart Money Holdings endpoint:
- **Endpoint**: `https://api.nansen.ai/api/v1/smart-money/holdings`
- **Filter**: Base chain only
- **Fallback**: Mock data if API is unavailable
- **Refresh**: Every 5 minutes

##  Deploy to Vercel

1. **Push to GitHub**
```bash
git push origin main
```

2. **Deploy**
```bash
cd frontend
vercel --prod
```

3. **Add Environment Variable**
```bash
vercel env add NANSEN_API_KEY production
```

##  Smart Contract Deployment (Using Remix)

1. Open [Remix IDE](https://remix.ethereum.org)
2. Create `MemeMiniRadar.sol` and copy contract code
3. Compile with Solidity `0.8.20`
4. Deploy to Base Mainnet:
   - Network: Base
   - Chain ID: 8453
   - RPC: https://mainnet.base.org
5. Copy contract address and update `baseapp.json`

##  BaseApp Deployment

To deploy as a BaseApp mini-app:

1. Update `frontend/baseapp.json` with your contract address
2. Build: `npm run build`
3. Upload to BaseApp dashboard
4. Follow BaseApp deployment instructions

##  Tech Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS + Custom Animations
- **Smart Contract**: Solidity 0.8.20
- **Blockchain**: Base L2
- **API**: Nansen API
- **Deployment**: Vercel

##  Live Demo

Visit: **https://meme-mini-radar.vercel.app**

Features:
- Top 15 meme tokens on Base
- Real-time whale activity tracking
- Smart money flow indicators
- Click any token to see detailed metrics

##  Environment Variables

Required in `.env.local`:
```
NANSEN_API_KEY=your_api_key_here
```

Optional:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddress
```

##  License

MIT License - feel free to use and modify!

##  Acknowledgments

Built for Base  | Powered by Nansen  | Deployed on Vercel 

---

**Made with  for the Base ecosystem**
