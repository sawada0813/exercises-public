"use client";
import React, { useState } from "react";
import Note from "./note";

type PianoProps = {
  isRecording: boolean;
  isPlaying: boolean;
};

export default function Piano({ isRecording, isPlaying }: PianoProps) {
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
        <Note
          note='C1'
          audioUrl={audioUrl}
          tune={"a"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='C#1'
          audioUrl={audioUrl}
          tune={"w"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='D1'
          audioUrl={audioUrl}
          tune={"s"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='D#1'
          audioUrl={audioUrl}
          tune={"e"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='E1'
          audioUrl={audioUrl}
          tune={"d"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='F1'
          audioUrl={audioUrl}
          tune={"f"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='F#1'
          audioUrl={audioUrl}
          tune={"t"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='G1'
          audioUrl={audioUrl}
          tune={"g"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='G#1'
          audioUrl={audioUrl}
          tune={"y"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='A1'
          audioUrl={audioUrl}
          tune={"h"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='A#1'
          audioUrl={audioUrl}
          tune={"u"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='B1'
          audioUrl={audioUrl}
          tune={"j"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='C2'
          audioUrl={audioUrl}
          tune={"k"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='C#2'
          audioUrl={audioUrl}
          tune={"o"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='D2'
          audioUrl={audioUrl}
          tune={"l"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='D#2'
          audioUrl={audioUrl}
          tune={"p"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
        <Note
          note='E2'
          audioUrl={audioUrl}
          tune={";"}
          isRecording={isRecording}
          isPlaying={isPlaying}
        />
      </div>
      <input
        type='file'
        accept='audio/m4a, audio/wav'
        onChange={handleFileChange}
      />
    </div>
  );
}
