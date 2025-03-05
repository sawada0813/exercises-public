"use client";
import Clock from "./clock";
import SoundPads from "./soundPads";
import Piano from "./piano";
import React, { useState, useEffect, useCallback } from "react";

import { Button } from "@mui/material";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stopTime, setStopTime] = useState<number | null>(null);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "r" && !isRecording) {
        setIsRecording(true);
        setStartTime(Date.now());
      } else if (event.key === "r" && isRecording && startTime) {
        setIsRecording(false);
        setIsPlaying(false);
        setStopTime(Date.now() - startTime);
      } else if (event.key === " " && startTime) {
        setIsPlaying(true);
        setStopTime(Date.now() - startTime);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRecording, startTime, isPlaying, handlePlayPause]);

  const handleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setIsPlaying(true);
      setStopTime(null);
      setStartTime(Date.now());
    } else if (startTime) {
      setIsRecording(false);
      setStopTime(Date.now() - startTime);
    }
  };

  return (
    <div>
      <SoundPads
        isRecording={isRecording}
        isPlaying={isPlaying}
        startTime={startTime}
        stopTime={stopTime}
      />
      <Piano
        isRecording={isRecording}
        isPlaying={isPlaying}
        startTime={startTime}
        stopTime={stopTime}
      />
      <Clock />
      {isPlaying ? <p>Playing...</p> : null}
      {isRecording ? <p>Recording...</p> : null}
      <Button variant='outlined' onClick={handlePlayPause}>
        {isPlaying ? "停止" : "再生"}
      </Button>
      <Button variant='outlined' onClick={handleRecord}>
        {isRecording ? "録音停止" : "録音開始"}
      </Button>
    </div>
  );
}
