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
        <Note note='C1' audioUrl={audioUrl} tune={"a"} />
        <Note note='C#1' audioUrl={audioUrl} tune={"w"} />
        <Note note='D1' audioUrl={audioUrl} tune={"s"} />
        <Note note='D#1' audioUrl={audioUrl} tune={"e"} />
        <Note note='E1' audioUrl={audioUrl} tune={"d"} />
        <Note note='F1' audioUrl={audioUrl} tune={"f"} />
        <Note note='F#1' audioUrl={audioUrl} tune={"t"} />
        <Note note='G1' audioUrl={audioUrl} tune={"g"} />
        <Note note='G#1' audioUrl={audioUrl} tune={"y"} />
        <Note note='A1' audioUrl={audioUrl} tune={"h"} />
        <Note note='A#1' audioUrl={audioUrl} tune={"u"} />
        <Note note='B1' audioUrl={audioUrl} tune={"j"} />
        <Note note='C2' audioUrl={audioUrl} tune={"k"} />
        <Note note='C#2' audioUrl={audioUrl} tune={"o"} />
        <Note note='D2' audioUrl={audioUrl} tune={"l"} />
        <Note note='D#2' audioUrl={audioUrl} tune={"p"} />
        <Note note='E2' audioUrl={audioUrl} tune={";"} />
      </div>
      <input
        type='file'
        accept='audio/m4a, audio/wav'
        onChange={handleFileChange}
      />
    </div>
  );
}
