"use client";
import React from "react";
import Pad from "./pad";

type SoundPadsProps = {
  isRecording: boolean;
  isPlaying: boolean;
  stopTime: number | null;
  startTime: number | null;
  reset: boolean;
};

export default function SoundPads({
  isRecording,
  isPlaying,
  stopTime,
  startTime,
  reset,
}: SoundPadsProps) {
  return (
    <div className='grid grid-cols-5 grid-rows-2 gap-4'>
      <Pad
        id={1}
        isRecording={isRecording}
        isPlaying={isPlaying}
        startTime={startTime}
        stopTime={stopTime}
        reset={reset}
      />
      <Pad
        id={2}
        isRecording={isRecording}
        isPlaying={isPlaying}
        startTime={startTime}
        stopTime={stopTime}
        reset={reset}
      />
      <Pad
        id={3}
        isRecording={isRecording}
        isPlaying={isPlaying}
        startTime={startTime}
        stopTime={stopTime}
        reset={reset}
      />
      <Pad
        id={4}
        isRecording={isRecording}
        isPlaying={isPlaying}
        startTime={startTime}
        stopTime={stopTime}
        reset={reset}
      />
      <Pad
        id={5}
        isRecording={isRecording}
        isPlaying={isPlaying}
        startTime={startTime}
        stopTime={stopTime}
        reset={reset}
      />
      <Pad
        id={6}
        isRecording={isRecording}
        isPlaying={isPlaying}
        startTime={startTime}
        stopTime={stopTime}
        reset={reset}
      />
      <Pad
        id={7}
        isRecording={isRecording}
        isPlaying={isPlaying}
        startTime={startTime}
        stopTime={stopTime}
        reset={reset}
      />
      <Pad
        id={8}
        isRecording={isRecording}
        isPlaying={isPlaying}
        startTime={startTime}
        stopTime={stopTime}
        reset={reset}
      />
      <Pad
        id={9}
        isRecording={isRecording}
        isPlaying={isPlaying}
        startTime={startTime}
        stopTime={stopTime}
        reset={reset}
      />
      <Pad
        id={0}
        isRecording={isRecording}
        isPlaying={isPlaying}
        startTime={startTime}
        stopTime={stopTime}
        reset={reset}
      />
    </div>
  );
}
