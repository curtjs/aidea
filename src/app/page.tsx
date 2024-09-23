"use client"
import axios from "axios";
import React, { MouseEventHandler, useState } from "react";

interface ResponseMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [programType, setProgramType] = useState<string>("")
  const [timeFrame, setTimeFrame] = useState<string>("")
  const [responses, setResponses] = useState<ResponseMessage[]>([])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let msg = `
    You are a Programming Idea Generator.

    Program Type > ${programType}
    If program type is invalid, say "<programType> doesn't seem programmable!"

    Time Frame: ${timeFrame}
    Time frame is How quickly the idea should be completed
    If invalid, say "Invalid time frame"

    Tags: funny

    Simply state the idea, e.x: "A todo list"
    `

    setResponses((prev) => [...prev, { role: "user", content: msg }])
    try {
      const response = await axios.post('/api/chat ', { msg })

      const gptResponse: ResponseMessage = {
        role: "assistant",
        content: response.data.content,
      };

      setResponses((prev) => [...prev, gptResponse])
    } catch (error) {
      console.log("oop: ", error)
    } finally {
      setProgramType('');
      setTimeFrame('')
    }
  }

  return (
    <div className="m-8">
      {/* Intro */}
      <p className="text-2xl font-bold">aidea</p>
      <p>programming ideas for those who lack creativity</p>

      {/* Form */}
      <div>
        <p>I want to create a</p>
        <input
        value={programType}
        onChange={(e) => setProgramType(e.target.value)}
        placeholder="simple web app, game, etc." />
        <p>within</p>
        <input 
        value={timeFrame}
        onChange={(e) => setTimeFrame(e.target.value)}
        placeholder="one hour, week, etc." />

        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Responses */}
      <div>
        {responses.map((res, index) => (
          <div key={index} style={{ textAlign: res.role === "user" ? "right" : "left" }}>
            <strong>{res.role === "user" ? "You" : "GPT"}:</strong> {res.content}
          </div>
        ))}
      </div>
    </div>
  );
}
