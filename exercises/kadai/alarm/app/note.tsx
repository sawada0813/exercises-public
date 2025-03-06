"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";

type NoteProps = {
  note: string;
  audioUrl: string | null;
  tune: string;
  isRecording: boolean;
  isPlaying: boolean;
  stopTime: number | null;
  startTime: number | null;
  reset: boolean;
};

export default function Note({
  note,
  audioUrl,
  tune,
  isRecording,
  isPlaying,
  stopTime,
  startTime,
  reset,
}: NoteProps) {
  const [color, setColor] = useState(
    note.includes("#") ? "bg-black" : "bg-white"
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recordedBeats, setRecordedBeats] = useState<number[]>([]);
  const textColor = note.includes("#") ? "text-white" : "text-black";
  const timeoutRefs = useRef<NodeJS.Timeout | null>(null);
  const [dummyIncrement, setDummyIncrement] = useState(0);

  if (note === "C2") {
    console.log(recordedBeats);
  }

  const generateNote = useCallback(
    (note: string) => {
      const audioContext = new window.AudioContext();
      if (audioUrl === null) return;
      const audioElement = new Audio(audioUrl); // 使用する音声ファイルのパスを指定
      const audioSourceNode =
        audioContext.createMediaElementSource(audioElement);

      const gainNode = audioContext.createGain();
      audioSourceNode.connect(gainNode);
      gainNode.connect(audioContext.destination);
      audioElement.preservesPitch = false;
      switch (note) {
        case "C4":
          audioElement.playbackRate = 1.0;
          return audioElement;
        case "C#4":
          audioElement.playbackRate = 1.059463;
          return audioElement;
        case "D4":
          audioElement.playbackRate = 1.122462;
          return audioElement;
        case "D#4":
          audioElement.playbackRate = 1.189207;
          return audioElement;
        case "E4":
          audioElement.playbackRate = 1.259921;
          return audioElement;
        case "F4":
          audioElement.playbackRate = 1.33484;
          return audioElement;
        case "F#4":
          audioElement.playbackRate = 1.414214;
          return audioElement;
        case "G4":
          audioElement.playbackRate = 1.498307;
          return audioElement;
        case "G#4":
          audioElement.playbackRate = 1.587401;
          return audioElement;
        case "A4":
          audioElement.playbackRate = 1.681793;
          return audioElement;
        case "A#4":
          audioElement.playbackRate = 1.781797;
          return audioElement;
        case "B4":
          audioElement.playbackRate = 1.887749;
          return audioElement;
        case "C5":
          audioElement.playbackRate = 2.0;
          return audioElement;
        case "C#5":
          audioElement.playbackRate = 2.118926;
          return audioElement;
        case "D5":
          audioElement.playbackRate = 2.244924;
          return audioElement;
        case "D#5":
          audioElement.playbackRate = 2.378414;
          return audioElement;
        case "E5":
          audioElement.playbackRate = 2.519842;
          return audioElement;
        default:
          return;
      }
    },
    [audioUrl]
  );

  const playAudio = useCallback(
    (note: string) => {
      const audioElement = generateNote(note);
      // 音声を再生
      if (audioElement) {
        audioElement.addEventListener("ended", () => {
          releaseAudioElement(audioElement);
        });
        console.log(audioElement);
        audioElement.play();
      }
    },
    [generateNote]
  );

  useEffect(() => {
    if (reset) {
      setRecordedBeats([]);
    }
  }, [reset]);

  useEffect(() => {
    if (isPlaying) {
      setCurrentIndex(0);
    }
  }, [isPlaying]);

  const handleClick = useCallback(
    (note: string) => {
      // keydown イベントを記録
      if (startTime && isRecording) {
        setRecordedBeats([...recordedBeats, Date.now() - startTime]);
      }
      playAudio(note);
      const prevColor = color;
      setColor("bg-gray-200");
      setTimeout(() => {
        setColor(prevColor);
      }, 100);
    },
    [color, recordedBeats, startTime, isRecording, playAudio]
  );

  const sleep = useCallback(
    (time: number) => new Promise((r) => setTimeout(r, time)),
    []
  );

  useEffect(() => {
    (async () => {
      if (isPlaying && !isRecording) {
        if (recordedBeats.length === 0) return;
        if (recordedBeats.length === 1) {
          timeoutRefs.current = setTimeout(async () => {
            if (audioUrl) playAudio(audioUrl);
            setColor("bg-gray-200");
            setTimeout(() => {
              setColor("bg-gray-500");
            }, 1);
            if (stopTime) await sleep(stopTime - recordedBeats[0]);
            setDummyIncrement((prevIndex) => prevIndex + 1);
          }, recordedBeats[0]);
        } else {
          timeoutRefs.current = setTimeout(
            async () => {
              playAudio(note);
              const prevColor = color;
              setColor("bg-gray-200");
              setTimeout(() => {
                setColor(prevColor);
              }, 1);
              if (currentIndex === recordedBeats.length - 1) {
                if (stopTime) {
                  await sleep(
                    stopTime - recordedBeats[recordedBeats.length - 1]
                  );
                }
              }
              setCurrentIndex(
                (prevIndex) => (prevIndex + 1) % recordedBeats.length
              );
            },
            currentIndex === 0
              ? recordedBeats[currentIndex]
              : recordedBeats[currentIndex] - recordedBeats[currentIndex - 1]
          );
        }
      }
    })();
    return () => {
      // useEffectが再実行される時やコンポーネントがアンマウントされる時にタイマーをクリア
      if (timeoutRefs.current) {
        clearTimeout(timeoutRefs.current);
      }
    };
  }, [
    isPlaying,
    isRecording,
    recordedBeats,
    currentIndex,
    stopTime,
    sleep,
    playAudio,
    color,
    note,
    dummyIncrement,
    audioUrl,
  ]);
  useEffect(() => {
    if (isRecording) {
      setRecordedBeats([]);
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
  }, [audioUrl, handleClick, isRecording, note, tune]);

  function releaseAudioElement(audioElement: HTMLAudioElement) {
    // 再生を停止
    audioElement.pause();

    // 音声リソースをクリア
    audioElement.src = "";
    audioElement.load();

    // DOMから削除 (もしDOMに追加している場合)
    if (audioElement.parentNode) {
      audioElement.parentNode.removeChild(audioElement);
    }
  }

  return (
    <div
      className={`w-12 h-48 ${color} border-2 border-black text-center ${textColor}`}
      onClick={() => handleClick(note)}
    >
      {note}
    </div>
  );
}
