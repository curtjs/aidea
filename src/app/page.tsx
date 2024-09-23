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
    You are a Programming Idea Generator. Your task is to create very unique ideas using around 10 words

    Program Type > ${programType}
    If program type is invalid, say "<programType> doesn't seem programmable!"

    Time Frame: ${timeFrame}
    Time frame is How quickly the idea should be completed
    If invalid, say "Invalid time frame"

    Simply state the idea, e.x: A todo list
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
      <p className="text-3xl font-bold">aidea</p>
      <p className="italic">for those who lack creativity</p>

      {/* Idea */}
      <div className="mt-8 font-bold">
        {response?.content}
      </div>
    </div>
  );
}
