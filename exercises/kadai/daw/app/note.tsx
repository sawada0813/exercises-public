"use client";
import React from "react";

type NoteProps = {
  note: string;
  audioUrl: string | null;
};

export default function Note({ note, audioUrl }: NoteProps) {
  const generateNote = (note: string) => {
    const audioContext = new window.AudioContext();
    if (audioUrl === null) return;
    const audioElement = new Audio(audioUrl); // 使用する音声ファイルのパスを指定
    const audioSourceNode = audioContext.createMediaElementSource(audioElement);

    const gainNode = audioContext.createGain();
    audioSourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    audioElement.preservesPitch = false;
    switch (note) {
      case "C":
        audioElement.playbackRate = 1.0;
        return audioElement;
      case "D":
        audioElement.playbackRate = 1.122462;
        return audioElement;
      case "E":
        audioElement.playbackRate = 1.259921;
        return audioElement;
      case "F":
        audioElement.playbackRate = 1.33484;
        return audioElement;
      case "G":
        audioElement.playbackRate = 1.498307;
        return audioElement;
      case "A":
        audioElement.playbackRate = 1.681793;
        return audioElement;
      case "B":
        audioElement.playbackRate = 1.887749;
        return audioElement;
      default:
        return;
    }
  };

  const playAudio = (note: string) => {
    const audioElement = generateNote(note);
    // 音声を再生
    if (audioElement) {
      audioElement.play();
    }
  };
  const handleClick = (note: string) => {
    playAudio(note);
  };

  return (
    <div
      className='w-12 h-48 bg-white border-2 border-black'
      onClick={() => handleClick(note)}
    >
      {note}
    </div>
  );
}
