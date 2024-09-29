import axios from "axios";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const rateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(20, "1 d"),
});

export async function POST(request: Request) {
  const { msg } = await request.json();
  const ip = request.headers.get("x-forwarded-for");

  if (!ip) {
    return NextResponse.json(
      { error: "Failed to fetch response" },
      { status: 500 }
    );
  }

  const { success } = await rateLimit.limit(ip);

  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "ft:gpt-4o-mini-2024-07-18:personal::AASc4brM",
        messages: [{ role: "user", content: msg }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_KEY}`, // Use your actual API key
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch response" },
      { status: 500 }
    );
  }
}
