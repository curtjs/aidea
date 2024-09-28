"use client";
import Dropdown from "@/components/Dropdown";
import axios from "axios";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";

interface ResponseMessage {
  role: "user" | "assistant";
  content: string;
}

export default function Home() {
  const [programType, setProgramType] = useState<string>("web app");
  const [difficulty, setDifficulty] = useState<string>("easy");

  const [response, setResponse] = useState<ResponseMessage | null>(null);

  const prompt = async () => {
    let msg = `
    Create an ${difficulty} difficulty idea based around: ${programType}, fun
    `;

    console.log("Sending prompt: ", msg);

    try {
      const response = await axios.post("/api/chat ", { msg });

      const gptResponse: ResponseMessage = {
        role: "assistant",
        content: response.data.content,
      };

      setResponse(gptResponse);
    } catch (error) {
      console.log("oop: ", error);
    }
  };

  useEffect(() => {
    prompt();
  }, []);

  return (
    <div className="m-8 flex flex-col items-center">
      {/* Intro */}
      <p className="text-3xl font-bold">aidea 💡</p>
      <p className="italic">for those who lack creativity</p>

      {/* Generated Idea */}
      <div className="mt-8 font-bold">
        You should make{" "}
        <span className="lowercase text-success">{response?.content}</span>
      </div>

      {/* Config */}
      <div className="mt-6">
        I want to make a
        <Dropdown
          options={["web app", "desktop app", "mobile app", "video game"]}
          optionSelected={(o) => setProgramType(o)}
        />
        with a
        <Dropdown
          options={["easy", "medium", "hard"]}
          optionSelected={(o) => setDifficulty(o)}
        />
        difficulty.
      </div>
      <button className="btn btn-success mt-4" onClick={prompt}>
        Generate
      </button>
    </div>
  );
}
