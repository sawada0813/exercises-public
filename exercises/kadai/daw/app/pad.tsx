"use client";
import React from "react";

export default function Pad(props: { id: number }) {
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);

  const playAudio = (audioFile: string) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  const handleFileChange = (event) => {
    console.log(event.target.files);
    const file = event.target.files[0];
    if (file && file.type === "audio/x-m4a") {
      const fileUrl = URL.createObjectURL(file);
      setAudioUrl(fileUrl);
    } else {
      alert("m4aファイルを選択してください");
    }
  };

  const onClick = () => {
    console.log(audioUrl);
    if (audioUrl === null) {
      alert("音声ファイルを選択してください");
    } else {
      playAudio(audioUrl);
    }
  };

  return (
    <>
      <div className='bg-blue-500 p-4' onClick={onClick}>
        Box {props.id}
      </div>
      <input type='file' accept='audio/m4a' onChange={handleFileChange} />
    </>
  );
}
