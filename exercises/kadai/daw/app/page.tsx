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
  const [reset, setReset] = useState(false);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleRecord = useCallback(() => {
    if (!isRecording) {
      setIsRecording(true);
      setIsPlaying(true);
      setStopTime(null);
      setStartTime(Date.now());
    } else if (startTime) {
      setIsRecording(false);
      setStopTime(Date.now() - startTime);
    }
  }, [isRecording, startTime]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      // if (event.key === "r" && !isRecording) {
      if (event.key === "r") {
        handleRecord();
      } else if (event.key === " ") {
        setIsPlaying(true);
        if (startTime) setStopTime(Date.now() - startTime);
        if (event.key === " " && isPlaying) {
          setIsPlaying(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRecording, startTime, isPlaying, handlePlayPause, handleRecord]);

  const handleReset = useCallback(() => {
    setReset(!reset);
  }, [reset]);

  return (
    <div>
      <SoundPads
        isRecording={isRecording}
        isPlaying={isPlaying}
        startTime={startTime}
        stopTime={stopTime}
        reset={reset}
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
      <Button variant='outlined' onClick={handleReset}>
        リセット
      </Button>
    </div>
  );
}
