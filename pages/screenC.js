import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CanvasDraw from "react-canvas-draw";
import Dictaphone from "./components/Dictaphone";
import Colorful from "@uiw/react-color-colorful";
// import { Loading } from 'react-loading-dot'

function LoadingDots() {
  return (
    <div className="flex space-x-1">
      <span className="animate-dotPulse animation-delay-200 text-3xl">.</span>
      <span className="animate-dotPulse animation-delay-400 text-3xl">.</span>
      <span className="animate-dotPulse animation-delay-600 text-3xl">.</span>
    </div>
  );
}

export default function Screen() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [brushColor, setBrushColor] = useState("black");
  const [brushRadius, setBrushRadius] = useState(12);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [hex, setHex] = useState("#59c09a");
  const [notSpeaking, setNotSpeaking] = useState(true);
  const [doneSpeaking, setDoneSpeaking] = useState(false);
  const canvasRef = useRef();

  const clearCanvas = () => {
    canvasRef.current.clear();
  };

  const undoCanvas = () => {
    canvasRef.current.undo();
  };

  let recognition;

  const handleSpeechToText = () => {
    setDoneSpeaking(false);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    recognition.continuous = true;

    recognition.onstart = function () {
      console.log("Voice activated");
    };

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
      console.log(transcript);
    };

    recognition.onerror = function (event) {
      console.error("Speech recognition error detected: " + event.error);
      console.error("Additional message: " + event.message);
    };

    recognition.start();
    setNotSpeaking(false);
  };

  const stopSpeechToText = () => {
    if (recognition) {
      recognition.stop();
      setNotSpeaking(true);
      setDoneSpeaking(true);
      console.log(transcript);
    }
    setDoneSpeaking(true);
    setNotSpeaking(true);
  };

  const redoRecording = () => {
    setTranscript("");
    setDoneSpeaking(false);
  };

  const submitQuery = async (event) => {
    if (transcript.trim() === "") {
      return;
    }

    if (transcript.trim() !== "") {
      setIsLoading(true);
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: transcript,
          conversation: conversationHistory,
        }),
      });
      const data = await response.text();
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      setChatResponse(parsedData);

      // Append the user's input and the AI's response to the conversation history
      setConversationHistory([
        ...conversationHistory,
        { user: transcript, ai: parsedData },
      ]);

      setTranscript("");
      setDoneSpeaking(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="flex justify-center items-center p-4 pl-10 pr-10 bg-amber-50">
        <h1 className="text-2xl text-black font-bold">Mind Palette</h1>
      </header>

      <div className="flex items-center h-screen flex-col md:pt-2 pt-2">
        <div className="flex justify-center mt-4 space-x-4 flex-row text-centerx">
          <CanvasDraw
            hideInterface
            brushColor={hex}
            brushRadius={brushRadius}
            canvasWidth={1000}
            canvasHeight={600}
            ref={canvasRef}
            lazyRadius={0}
          />
          <div className="flex flex-col">
            <button
              className="rounded outline border-blue-500 m-5"
              onClick={undoCanvas}
            >
              Undo Stroke
            </button>
            <button
              className="rounded outline border-blue-500 m-5"
              onClick={clearCanvas}
            >
              Clear Canvas
            </button>
            <Colorful
              className="m-5"
              color={hex}
              onChange={(color) => {
                setHex(color.hexa);
              }}
            />
            <p className="text-center">Brush size</p>
            <input
              type="range"
              min="3"
              max="20"
              value={brushRadius}
              onChange={(e) => setBrushRadius(e.target.value)}
            />
          </div>
        </div>

      </div>
    </>
  );
}
