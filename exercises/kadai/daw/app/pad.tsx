"use client";
import React, { useState, useEffect, useCallback } from "react";

export default function Pad(props: { id: number }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [color, setColor] = useState("bg-blue-500");

  const onClick = useCallback(() => {
    if (audioUrl === null) {
      alert("音声ファイルを選択してください");
    } else {
      playAudio(audioUrl);
      setColor("bg-blue-200");
      setTimeout(() => {
        setColor("bg-blue-500");
      }, 100);
    }
  }, [audioUrl]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === props.id.toString()) {
        onClick();
      }
    };
    if (audioUrl) {
      window.addEventListener("keydown", handleKeyDown);
    }
  }, [audioUrl, props.id, onClick]);

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
