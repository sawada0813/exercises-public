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
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

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

  const handleChange = (e, unit) => {
    const value = e.target.value;
    if (unit === "hours") {
      setHours(value);
    } else if (unit === "minutes") {
      setMinutes(value);
    } else if (unit === "seconds") {
      setSeconds(value);
    }
  };

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
        reset={reset}
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
      <select value={hours} onChange={(e) => handleChange(e, "hours")}>
        {Array.from({ length: 24 }, (_, i) => (
          <option key={i} value={String(i).padStart(2, "0")}>
            {String(i).padStart(2, "0")}
          </option>
        ))}
      </select>
      :
      <select value={minutes} onChange={(e) => handleChange(e, "minutes")}>
        {Array.from({ length: 60 }, (_, i) => (
          <option key={i} value={String(i).padStart(2, "0")}>
            {String(i).padStart(2, "0")}
          </option>
        ))}
      </select>
      :
      <select value={seconds} onChange={(e) => handleChange(e, "seconds")}>
        {Array.from({ length: 60 }, (_, i) => (
          <option key={i} value={String(i).padStart(2, "0")}>
            {String(i).padStart(2, "0")}
          </option>
        ))}
      </select>
      <Button
        className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'
        variant='outlined'
        onClick={() => {
          // const [hour, minute, second] = alarmTime.split(":").map(Number);
          const alarm = new Date();
          alarm.setHours(Number(hours));
          alarm.setMinutes(Number(minutes));
          alarm.setSeconds(Number(seconds));
          const now = new Date();
          const diff = alarm.getTime() - now.getTime();
          console.log(diff);
          if (diff > 0) {
            setTimeout(() => {
              setIsPlaying(true);
            }, diff);
          } else {
            alert("無効な時間です");
          }
        }}
      >
        アラームセット
      </Button>
    </div>
  );
}
