"use client";
import React, { useState, useEffect, useCallback } from "react";

type PadProps = {
  id: number;
  isRecording: boolean;
  isPlaying: boolean;
};

export default function Pad({ id, isRecording, isPlaying }: PadProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [color, setColor] = useState("bg-gray-500");
  const [recordedBeats, setRecordedBeats] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (isPlaying && audioUrl) {
      recordedBeats.forEach((beat) => {
        setTimeout(() => {
          playAudio(audioUrl);
          setColor("bg-gray-200");
          setTimeout(() => {
            setColor("bg-gray-500");
          }, 100);
        }, beat);
      });
      // setIsPlaying(false);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isRecording) {
      const startTime = Date.now();
      setRecordedBeats([]);
      setStartTime(startTime);
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
      setColor("bg-gray-200");
      setTimeout(() => {
        setColor("bg-gray-500");
      }, 100);
    }
  }, [audioUrl, isRecording, recordedBeats, startTime]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === id.toString()) {
        onClick();
      }
    };
    if (audioUrl) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [audioUrl, id, onClick, isRecording]);

  const playAudio = (audioFile: string) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: any) => {
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
        {id}: {audioUrl ? fileName : "Blank"}
      </div>
      <input
        type='file'
        accept='audio/m4a, audio/wav'
        onChange={handleFileChange}
      />
    </div>
  );
}
