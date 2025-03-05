"use client";
import React, { useState, useEffect, useCallback } from "react";

type PadProps = {
  id: number;
  isRecording: boolean;
  isPlaying: boolean;
  stopTime: number | null;
  startTime: number | null;
};

export default function Pad({
  id,
  isRecording,
  isPlaying,
  stopTime,
  startTime,
}: PadProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [color, setColor] = useState("bg-gray-500");
  const [recordedBeats, setRecordedBeats] = useState<number[]>([]);
  const [fileName, setFileName] = useState("");

  const sleep = (time: number) => new Promise((r) => setTimeout(r, time));

  useEffect(() => {
    (async () => {
      let timerID;
      if (isPlaying && audioUrl && stopTime && startTime) {
        let index = 0;
        const playSound = async () => {
          playAudio(audioUrl);
          setColor("bg-gray-200");
          setTimeout(() => {
            setColor("bg-gray-500");
          }, 1);
          index = (index + 1) % recordedBeats.length;
          if (index === 0) {
            await sleep(stopTime - recordedBeats[recordedBeats.length - 1]);
            timerID = setTimeout(playSound, recordedBeats[0]);
          } else {
            timerID = setTimeout(
              playSound,
              recordedBeats[index] - recordedBeats[index - 1]
            );
          }
        };
        timerID = setTimeout(playSound, recordedBeats[0]);
      } else {
        clearInterval(timerID);
      }
    })();
  }, [isPlaying, startTime, stopTime, recordedBeats, audioUrl]);

  useEffect(() => {
    if (isRecording) {
      setRecordedBeats([]);
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
  }, [audioUrl, recordedBeats, startTime]);

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
