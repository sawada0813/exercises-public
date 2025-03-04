"use client";
import React from "react";
import Pad from "./pad";

type SoundPadsProps = {
  isRecording: boolean;
  isPlaying: boolean;
  stopTime: number | null;
};

export default function SoundPads({
  isRecording,
  isPlaying,
  stopTime,
}: SoundPadsProps) {
  return (
    <div className='grid grid-cols-5 grid-rows-2 gap-4'>
      <Pad
        id={1}
        isRecording={isRecording}
        isPlaying={isPlaying}
        stopTime={stopTime}
      />
      <Pad
        id={2}
        isRecording={isRecording}
        isPlaying={isPlaying}
        stopTime={stopTime}
      />
      <Pad
        id={3}
        isRecording={isRecording}
        isPlaying={isPlaying}
        stopTime={stopTime}
      />
      <Pad
        id={4}
        isRecording={isRecording}
        isPlaying={isPlaying}
        stopTime={stopTime}
      />
      <Pad id={5} isRecording={isRecording} isPlaying={isPlaying} />
      <Pad
        id={6}
        isRecording={isRecording}
        isPlaying={isPlaying}
        stopTime={stopTime}
      />
      <Pad
        id={7}
        isRecording={isRecording}
        isPlaying={isPlaying}
        stopTime={stopTime}
      />
      <Pad
        id={8}
        isRecording={isRecording}
        isPlaying={isPlaying}
        stopTime={stopTime}
      />
      <Pad
        id={9}
        isRecording={isRecording}
        isPlaying={isPlaying}
        stopTime={stopTime}
      />
      <Pad
        id={0}
        isRecording={isRecording}
        isPlaying={isPlaying}
        stopTime={stopTime}
      />
    </div>
  );
}
