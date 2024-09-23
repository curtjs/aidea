import { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { msg } = await request.json();
  
    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: msg }],
      }, {
        headers: {
          'Authorization': `Bearer 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`, // Use your actual API key
          'Content-Type': 'application/json',
        }
      });
  
      return NextResponse.json(response.data.choices[0].message);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to fetch response' }, { status: 500 });
    }
  }