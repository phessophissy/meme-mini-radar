# Deploy Meme Mini-Radar on Farcaster 

##  Already Configured!

Your app is ready for Farcaster deployment with:
-  Farcaster manifest at `/.well-known/farcaster.json`
-  MiniApp SDK integrated
-  Embed metadata configured
-  Live at https://meme-mini-radar.vercel.app

##  How to Deploy on Farcaster

### Option 1: Share as a Frame (Easiest)

1. **Go to any Farcaster client** (Warpcast, Supercast, etc.)
2. **Create a new cast** (post)
3. **Paste your app URL**: `https://meme-mini-radar.vercel.app`
4. **Post it!**

The URL will automatically render as an interactive frame with:
- Your logo
- "Track Whales Now" button
- When clicked, opens your mini-app

### Option 2: Use Farcaster Mini-App

Your app already has the mini-app configuration at:
`https://meme-mini-radar.vercel.app/.well-known/farcaster.json`

**To complete mini-app setup:**

1. **Add your Base wallet address** to the manifest:
   ```powershell
   cd C:\Users\HomePC\meme-mini-radar\frontend
   # Edit public/.well-known/farcaster.json
   # Change "ownerAddress": "0x" to your wallet address
   ```

2. **Generate account association**:
   - Go to: https://www.base.dev/preview?tab=account
   - Enter: `meme-mini-radar.vercel.app`
   - Click "Verify" and sign with your wallet
   - Copy the generated credentials
   - Update the `accountAssociation` fields in the manifest

3. **Redeploy**:
   ```powershell
   git add public/.well-known/farcaster.json
   git commit -m "Add Farcaster account association"
   git push origin main
   vercel --prod
   ```

4. **Share on Farcaster**:
   - Post your URL in any Farcaster client
   - Your app will appear as a mini-app!

### Option 3: Warpcast Deep Link

Share this direct link in Farcaster:
```
https://warpcast.com/~/compose?text=Check%20out%20Meme%20Mini-Radar!%20https://meme-mini-radar.vercel.app
```

##  Test Your Farcaster Integration

1. **Verify manifest is accessible**:
   https://meme-mini-radar.vercel.app/.well-known/farcaster.json

2. **Test in Warpcast**:
   - Open Warpcast mobile app or https://warpcast.com
   - Create a new cast
   - Paste: `https://meme-mini-radar.vercel.app`
   - See the preview with your logo and launch button

3. **Preview with Base Build**:
   https://www.base.dev/preview
   (Enter your URL to see how it renders)

##  Current Frame Configuration

When shared on Farcaster, your app displays:
- **Image**: Meme Mini-Radar logo
- **Button**: "Track Whales Now"
- **Action**: Launches the mini-app
- **Description**: "Real-time whale & smart money tracker"

##  Pro Tips

1. **Share in crypto channels**: Post in Farcaster channels like /base, /memes, /defi
2. **Tag relevant users**: @base, @coinbase
3. **Use hashtags**: Include #Base #Memes #Whales in your cast
4. **Post updates**: Share when you spot whale activity

##  Your App URLs

- **Main App**: https://meme-mini-radar.vercel.app
- **Manifest**: https://meme-mini-radar.vercel.app/.well-known/farcaster.json
- **GitHub**: https://github.com/phessophissy/meme-mini-radar

##  Ready to Launch!

**Simplest way to start:**
1. Open Warpcast (https://warpcast.com or mobile app)
2. Create a new cast
3. Type something like:
   ```
    Introducing Meme Mini-Radar!
   
   Track the top 15 meme tokens whales are buying on Base 
   Live updates every 5 mins powered by Nansen 
   
   https://meme-mini-radar.vercel.app
   ```
4. Post and watch your app go live! 

Your frame will render automatically and people can launch your mini-app right from their Farcaster feed!
