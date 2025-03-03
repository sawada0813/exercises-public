"use client";
import Clock from "./clock";
import SoundPads from "./soundPads";
import Piano from "./piano";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "r" && !isRecording) {
        setIsRecording(true);
        setStartTime(Date.now());
      } else if (event.key === "r" && isRecording && startTime) {
        setIsRecording(false);
        setIsPlaying(true);
        const endTime = Date.now();
        setTimeout(() => {
          setIsPlaying(false);
        }, endTime - startTime);
      } else if (event.key === " ") {
        setIsPlaying(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRecording, startTime]);

  return (
    <div>
      <SoundPads isRecording={isRecording} isPlaying={isPlaying} />
      <Piano />
      <Clock />
      {isPlaying ? <p>Playing...</p> : null}
      {isRecording ? <p>Recording...</p> : null}
    </div>
  );
}
