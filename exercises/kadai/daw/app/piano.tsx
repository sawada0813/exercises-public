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
        <Note note='C' audioUrl={audioUrl} />
        <Note note='D' audioUrl={audioUrl} />
        <Note note='E' audioUrl={audioUrl} />
        <Note note='F' audioUrl={audioUrl} />
        <Note note='G' audioUrl={audioUrl} />
        <Note note='A' audioUrl={audioUrl} />
        <Note note='B' audioUrl={audioUrl} />
      </div>
      <input
        type='file'
        accept='audio/m4a, audio/wav'
        onChange={handleFileChange}
      />
    </div>
  );
}
