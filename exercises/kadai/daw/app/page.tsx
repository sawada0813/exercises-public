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
  const [fixed, setFixed] = useState(false); // 1度録音したら変更できないようにする

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleRecord = useCallback(() => {
    if (!isRecording && !isPlaying) {
      setIsRecording(true);
      setIsPlaying(true);
      setStopTime(null);
      setStartTime(Date.now());
    } else if (startTime) {
      setIsRecording(false);
      setStopTime(Date.now() - startTime);
      setFixed(true);
    }
  }, [isRecording, startTime]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "r") {
        handleRecord();
      } else if (event.key === " ") {
        setIsPlaying(!isPlaying);
        if (startTime && !fixed) setStopTime(Date.now() - startTime);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isRecording, startTime, isPlaying, handlePlayPause, handleRecord, fixed]);

  const handleReset = useCallback(() => {
    setReset(!reset);
    setFixed(false);
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
      {isPlaying ? <p>Playing...</p> : null}
      {isRecording ? <p>Recording...</p> : null}
      <div className='flex space-x-4'>
        <Button
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
          variant='outlined'
          onClick={handlePlayPause}
        >
          {isPlaying ? "停止" : "再生"}
        </Button>
        <Button
          className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
          variant='outlined'
          onClick={handleRecord}
        >
          {isRecording ? "録音停止" : "録音開始"}
        </Button>
        <Button
          className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
          variant='outlined'
          onClick={handleReset}
        >
          リセット
        </Button>
      </div>
      <Clock />
    </div>
  );
}
