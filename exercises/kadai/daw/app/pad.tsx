"use client";
import { time } from "console";
import React, { useState, useEffect, useCallback, useRef } from "react";

type PadProps = {
  id: number;
  isRecording: boolean;
  isPlaying: boolean;
  stopTime: number | null;
  startTime: number | null;
};

export default function Pad({
  id,
  isRecording,
  isPlaying,
  stopTime,
  startTime,
}: PadProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [color, setColor] = useState("bg-gray-500");
  const [recordedBeats, setRecordedBeats] = useState<number[]>([]);
  const [fileName, setFileName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRefs = useRef<NodeJS.Timeout | null>(null);

  const sleep = useCallback(
    (time: number) => new Promise((r) => setTimeout(r, time)),
    []
  );

  useEffect(() => {
    console.log("recordedBeats", recordedBeats);
    (async () => {
      if (isPlaying && !isRecording) {
        console.log("===");
        console.log(
          recordedBeats[currentIndex] - recordedBeats[currentIndex - 1]
        );
        if (recordedBeats.length === 0) return;
        timeoutRefs.current = setTimeout(
          async () => {
            if (audioUrl) playAudio(audioUrl);
            setColor("bg-gray-200");
            setTimeout(() => {
              setColor("bg-gray-500");
            }, 1);
            if (currentIndex === recordedBeats.length - 1) {
              if (stopTime) {
                console.log(stopTime, recordedBeats[recordedBeats.length - 1]);
                await sleep(stopTime - recordedBeats[recordedBeats.length - 1]);
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
    audioUrl,
  ]);

  // useEffect(() => {
  //   (async () => {
  //     if (recordedBeats.length === 0) return;
  //     if (isPlaying && audioUrl && stopTime && startTime) {
  //       // let index = 0;
  //       const playSound = async () => {
  //         playAudio(audioUrl);
  //         setColor("bg-gray-200");
  //         setTimeout(() => {
  //           setColor("bg-gray-500");
  //         }, 1);
  //         if (currentIndex === 0) {
  //           await sleep(stopTime - recordedBeats[recordedBeats.length - 1]);
  //           timeoutRefs.current = setTimeout(playSound, recordedBeats[0]);
  //         } else {
  //           timeoutRefs.current = setTimeout(
  //             playSound,
  //             recordedBeats[currentIndex] - recordedBeats[currentIndex - 1]
  //           );
  //         }
  //         setCurrentIndex(
  //           (prevIndex) => (prevIndex + 1) % recordedBeats.length
  //         );
  //         // if (currentIndex === 0) {
  //         //   await sleep(stopTime - recordedBeats[recordedBeats.length - 1]);
  //         //   timeoutRefs.current = setTimeout(playSound, recordedBeats[0]);
  //         // } else {
  //         //   timeoutRefs.current = setTimeout(
  //         //     playSound,
  //         //     recordedBeats[currentIndex] - recordedBeats[currentIndex - 1]
  //         //   );
  //         // }
  //       };
  //       timeoutRefs.current = setTimeout(playSound, recordedBeats[0]);
  //       // } else {
  //       //   clearTimeout(timeoutRefs.current as NodeJS.Timeout);
  //     }
  //   })();
  //   return () => {
  //     clearTimeout(timeoutRefs.current as NodeJS.Timeout);
  //   };
  // }, [
  //   isPlaying,
  //   startTime,
  //   stopTime,
  //   recordedBeats,
  //   audioUrl,
  //   sleep,
  //   currentIndex,
  // ]);

  useEffect(() => {
    if (isRecording) {
      setRecordedBeats([]);
    }
  }, [isRecording]);

  const onClick = useCallback(() => {
    if (audioUrl === null) {
      alert("音声ファイルを選択してください");
    } else {
      // keydown イベントを記録
      if (startTime && isRecording) {
        setRecordedBeats([...recordedBeats, Date.now() - startTime]);
      }
      playAudio(audioUrl);
      setColor("bg-gray-200");
      setTimeout(() => {
        setColor("bg-gray-500");
      }, 100);
    }
  }, [audioUrl, recordedBeats, startTime, isRecording]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      if (event.key === id.toString()) {
        onClick();
      }
    };
    if (audioUrl) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [audioUrl, id, onClick, isRecording]);

  const playAudio = (audioFile: string) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if ((file && file.type === "audio/x-m4a") || file.type === "audio/wav") {
      const fileUrl = URL.createObjectURL(file);
      setAudioUrl(fileUrl);
      setFileName(file.name);
    } else {
      alert("m4aファイルを選択してください");
    }
  };

  return (
    <div className='flex flex-col'>
      <div className={`${color} p-4`} onClick={onClick}>
        {id}: {audioUrl ? fileName : "Blank"}
      </div>
      <input
        type='file'
        accept='audio/m4a, audio/wav'
        onChange={handleFileChange}
      />
    </div>
  );
}
