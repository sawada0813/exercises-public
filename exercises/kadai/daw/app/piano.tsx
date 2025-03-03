"use client";
import React, { useState } from "react";
import Note from "./note";

export default function Piano() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

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
    <div>
      <div className='flex justify-center items-center space-x-1'>
        <Note note='C' audioUrl={audioUrl} tune={"a"} />
        <Note note='C#' audioUrl={audioUrl} tune={"w"} />
        <Note note='D' audioUrl={audioUrl} tune={"s"} />
        <Note note='D#' audioUrl={audioUrl} tune={"e"} />
        <Note note='E' audioUrl={audioUrl} tune={"d"} />
        <Note note='F' audioUrl={audioUrl} tune={"f"} />
        <Note note='F#' audioUrl={audioUrl} tune={"t"} />
        <Note note='G' audioUrl={audioUrl} tune={"g"} />
        <Note note='G#' audioUrl={audioUrl} tune={"y"} />
        <Note note='A' audioUrl={audioUrl} tune={"h"} />
        <Note note='A#' audioUrl={audioUrl} tune={"u"} />
        <Note note='B' audioUrl={audioUrl} tune={"j"} />
      </div>
      <input
        type='file'
        accept='audio/m4a, audio/wav'
        onChange={handleFileChange}
      />
    </div>
  );
}
