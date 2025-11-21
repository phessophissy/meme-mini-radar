# Base Mini-App Deployment Instructions

##  Completed Steps

1.  Installed @farcaster/miniapp-sdk
2.  Created manifest at `public/.well-known/farcaster.json`
3.  Added MiniApp SDK integration in page.tsx
4.  Added fc:miniapp metadata to layout.tsx

##  Next Steps to Complete Base Mini-App Deployment

### Step 1: Add Your Base Account Address

Edit `public/.well-known/farcaster.json` and update the `ownerAddress` field with your Base wallet address:

```json
"baseBuilder": {
  "ownerAddress": "0xYOUR_BASE_WALLET_ADDRESS_HERE"
}
```

### Step 2: Deploy to Production

```powershell
cd C:\Users\HomePC\meme-mini-radar\frontend
git add -A
git commit -m "Add Base mini-app configuration"
git push origin main
vercel --prod
```

### Step 3: Generate Account Association Credentials

1. Go to: https://www.base.dev/preview?tab=account
2. Enter your app URL: `meme-mini-radar.vercel.app`
3. Click "Submit"
4. Click "Verify" and follow instructions
5. Copy the generated `accountAssociation` fields (header, payload, signature)
6. Update `public/.well-known/farcaster.json` with these values
7. Commit and redeploy

### Step 4: Preview Your App

1. Go to: https://www.base.dev/preview
2. Enter your app URL to see embeds
3. Click the launch button to test
4. Use "Account association" tab to verify credentials
5. Use "Metadata" tab to check all fields

### Step 5: Publish to Base App

1. Create a post in the Base app (https://base.app)
2. Include your app URL: https://meme-mini-radar.vercel.app
3. Your app will be published and discoverable!

##  Current Manifest Configuration

- **Name**: Meme Mini-Radar
- **Category**: DeFi
- **Tags**: meme, tokens, whales, smart-money, base, defi, analytics, trading
- **Icon**: /logo.png (needs to be added - save the radar logo image)
- **Splash Color**: #1a1a2e (dark gradient)

##  Important Notes

1. **Logo Required**: Save your Meme Mini-Radar logo to `public/logo.png` before deploying
2. **Webhook**: Currently set to `/api/webhook` - you can implement this later if needed
3. **Screenshots**: You'll need to take 2-3 screenshots of your app for the manifest
4. **Account Association**: Must be completed after first deployment for ownership verification

##  Useful Links

- Base Build: https://www.base.dev/preview
- Base App: https://base.app
- Documentation: https://docs.base.org/mini-apps
- Your App: https://meme-mini-radar.vercel.app
