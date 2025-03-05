"use client";
import React, { useState, useEffect } from "react";

type NoteProps = {
  note: string;
  audioUrl: string | null;
  tune: string;
  isRecording: boolean;
  isPlaying: boolean;
};

export default function Note({
  note,
  audioUrl,
  tune,
  isRecording,
  isPlaying,
  stopTime,
  startTime,
}: NoteProps) {
  const [color, setColor] = useState(
    note.includes("#") ? "bg-black" : "bg-white"
  );
  const [recordedBeats, setRecordedBeats] = useState<number[]>([]);
  const textColor = note.includes("#") ? "text-white" : "text-black";

  const playAudio = (note: string) => {
    const audioElement = generateNote(note);
    // 音声を再生
    if (audioElement) {
      audioElement.play();
    }
  };

  const handleClick = (note: string) => {
    // keydown イベントを記録
    if (startTime) {
      setRecordedBeats([...recordedBeats, Date.now() - startTime]);
    }
    playAudio(note);
    const prevColor = color;
    setColor("bg-gray-200");
    setTimeout(() => {
      setColor(prevColor);
    }, 100);
  };

  useEffect(() => {
    if (isPlaying && audioUrl) {
      recordedBeats.forEach((beat) => {
        setTimeout(() => {
          playAudio(note);
          const prevColor = color;
          setColor("bg-gray-200");
          setTimeout(() => {
            setColor(prevColor);
          }, 100);
        }, beat);
      });
      // setIsPlaying(false);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isRecording) {
      setRecordedBeats([]);
      setTimeout(() => {});
    }
  }, [isRecording]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === tune) {
        handleClick(note);
      }
    };
    if (audioUrl) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [audioUrl, handleClick, isRecording]);

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
      case "C1":
        audioElement.playbackRate = 1.0;
        return audioElement;
      case "C#1":
        audioElement.playbackRate = 1.059463;
        return audioElement;
      case "D1":
        audioElement.playbackRate = 1.122462;
        return audioElement;
      case "D#1":
        audioElement.playbackRate = 1.189207;
        return audioElement;
      case "E1":
        audioElement.playbackRate = 1.259921;
        return audioElement;
      case "F1":
        audioElement.playbackRate = 1.33484;
        return audioElement;
      case "F#1":
        audioElement.playbackRate = 1.414214;
        return audioElement;
      case "G1":
        audioElement.playbackRate = 1.498307;
        return audioElement;
      case "G#1":
        audioElement.playbackRate = 1.587401;
        return audioElement;
      case "A1":
        audioElement.playbackRate = 1.681793;
        return audioElement;
      case "A#1":
        audioElement.playbackRate = 1.781797;
        return audioElement;
      case "B1":
        audioElement.playbackRate = 1.887749;
        return audioElement;
      case "C2":
        audioElement.playbackRate = 2.0;
        return audioElement;
      case "C#2":
        audioElement.playbackRate = 2.118926;
        return audioElement;
      case "D2":
        audioElement.playbackRate = 2.244924;
        return audioElement;
      case "D#2":
        audioElement.playbackRate = 2.378414;
        return audioElement;
      case "E2":
        audioElement.playbackRate = 2.519842;
        return audioElement;
      default:
        return;
    }
  };

  return (
    <div
      className={`w-12 h-48 ${color} border-2 border-black text-center ${textColor}`}
      onClick={() => handleClick(note)}
    >
      {note}
    </div>
  );
}
