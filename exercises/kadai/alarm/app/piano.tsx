"use client";
import React, { useState } from "react";
import Note from "./note";

type PianoProps = {
  isRecording: boolean;
  isPlaying: boolean;
  stopTime: number | null;
  startTime: number | null;
  reset: boolean;
};

export default function Piano({
  isRecording,
  isPlaying,
  stopTime,
  startTime,
  reset,
}: PianoProps) {
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
      <div className='flex flex-col items-center justify-center space-y-4'>
        <div className='flex justify-center items-center space-x-4'>
          <Note
            note='C4'
            audioUrl={audioUrl}
            tune={"a"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='C#4'
            audioUrl={audioUrl}
            tune={"w"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='D4'
            audioUrl={audioUrl}
            tune={"s"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='D#4'
            audioUrl={audioUrl}
            tune={"e"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='E4'
            audioUrl={audioUrl}
            tune={"d"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='F4'
            audioUrl={audioUrl}
            tune={"f"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='F#4'
            audioUrl={audioUrl}
            tune={"t"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='G4'
            audioUrl={audioUrl}
            tune={"g"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='G#4'
            audioUrl={audioUrl}
            tune={"y"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='A4'
            audioUrl={audioUrl}
            tune={"h"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='A#4'
            audioUrl={audioUrl}
            tune={"u"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='B4'
            audioUrl={audioUrl}
            tune={"j"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='C5'
            audioUrl={audioUrl}
            tune={"k"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='C#5'
            audioUrl={audioUrl}
            tune={"o"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='D5'
            audioUrl={audioUrl}
            tune={"l"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='D#5'
            audioUrl={audioUrl}
            tune={"p"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
          <Note
            note='E5'
            audioUrl={audioUrl}
            tune={";"}
            isRecording={isRecording}
            isPlaying={isPlaying}
            startTime={startTime}
            stopTime={stopTime}
            reset={reset}
          />
        </div>
        <input
          type='file'
          accept='audio/m4a, audio/wav'
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
