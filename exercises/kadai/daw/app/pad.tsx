"use client";
import React, { useState, useEffect, useCallback } from "react";

export default function Pad(props: { id: number }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [color, setColor] = useState("bg-blue-500");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBeats, setRecordedBeats] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);

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
      if (event.key === "r" && !isRecording) {
        setIsRecording(true);
      } else if (event.key === "r" && isRecording) {
        setIsRecording(false);
        console.log(recordedBeats);
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
    } else {
      alert("m4aファイルを選択してください");
    }
  };

  return (
    <>
      <div className={`${color} p-4`} onClick={onClick}>
        Box {props.id}
      </div>
      <input
        type='file'
        accept='audio/m4a, audio/wav'
        onChange={handleFileChange}
      />
    </>
  );
}
