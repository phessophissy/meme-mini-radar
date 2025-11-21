import { NextResponse } from "next/server";
import { getTopMemeTokens } from "../../../lib/nansen";

export async function GET() {
  try {
    const top15 = await getTopMemeTokens();
    
    return NextResponse.json({ 
      success: true,
      top15,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("API route error:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch meme tokens",
        top15: []
      },
      { status: 500 }
    );
  }
}
