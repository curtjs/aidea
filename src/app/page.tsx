"use client"
import axios from "axios";
import React, { MouseEventHandler, useEffect, useState } from "react";

interface ResponseMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [programType, setProgramType] = useState<string>("a web app")
  const [timeFrame, setTimeFrame] = useState<string>("2 days")
  const [response, setResponse] = useState<ResponseMessage | null>(null)

  const handleSubmit = async () => {
    let msg = `
    Create an easy difficulty idea based around: ${programType}, fun
    `
    try {
      const response = await axios.post('/api/chat ', { msg })

      const gptResponse: ResponseMessage = {
        role: "assistant",
        content: response.data.content,
      };

      setResponse(gptResponse)
    } catch (error) {
      console.log("oop: ", error)
    } finally {
      setProgramType('');
      setTimeFrame('')
    }
  }

  useEffect(() => {
    handleSubmit();
  }, [])

  return (
    <div className="m-8 flex flex-col items-center">
      {/* Intro */}
      <p className="text-3xl font-bold">aidea 💡</p>
      <p className="italic">for those who lack creativity</p>

      {/* Idea */}
      <div className="mt-8 font-bold">
        {response?.content}
      </div>
    </div>
  );
}
