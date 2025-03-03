"use client";
import React, { useState, useEffect, useCallback } from "react";

export default function Pad(props: { id: number }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [color, setColor] = useState("bg-blue-500");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBeats, setRecordedBeats] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (isPlaying && audioUrl) {
      recordedBeats.forEach((beat) => {
        setTimeout(() => {
          playAudio(audioUrl);
          setColor("bg-blue-200");
          setTimeout(() => {
            setColor("bg-blue-500");
          }, 100);
        }, beat);
      });
      setIsPlaying(false);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isRecording) {
      const startTime = Date.now();
      setRecordedBeats([]);
      setStartTime(startTime);
      setTimeout(() => {});
    }
  }, [isRecording]);

  const onClick = useCallback(() => {
    if (audioUrl === null) {
      alert("音声ファイルを選択してください");
    } else {
      // keydown イベントを記録
      if (startTime) {
        setRecordedBeats([...recordedBeats, Date.now() - startTime]);
      }
      playAudio(audioUrl);
      setColor("bg-blue-200");
      setTimeout(() => {
        setColor("bg-blue-500");
      }, 100);
    }
  }, [audioUrl, isRecording, recordedBeats, startTime]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === "r" && !isRecording) {
        setIsRecording(true);
      } else if (event.key === "r" && isRecording) {
        setIsRecording(false);
        setIsPlaying(true);
      } else if (event.key === " ") {
        setIsPlaying(true);
      } else if (event.key === props.id.toString()) {
        onClick();
      }
    };
    if (audioUrl) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [audioUrl, props.id, onClick, isRecording]);

  const playAudio = (audioFile: string) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if ((file && file.type === "audio/x-m4a") || file.type === "audio/wav") {
      const fileUrl = URL.createObjectURL(file);
      setAudioUrl(fileUrl);
      setFileName(file.name);
    } else {
      alert("m4aファイルを選択してください");
    }
  };

  return (
    <div className='flex flex-col'>
      <div className={`${color} p-4`} onClick={onClick}>
        {audioUrl ? fileName : "Blank"}
      </div>
      <input
        type='file'
        accept='audio/m4a, audio/wav'
        onChange={handleFileChange}
      />
    </div>
  );
}
