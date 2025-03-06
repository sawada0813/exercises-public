"use client";
import React, { useState, useEffect } from "react";
// デジタル時計を描画するコンポーネント

export default function Clock() {
  // Hydration failed というエラーが出るので動的に変化する Data ではなく null を初期値とする
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return <div id={"clock"}>{time?.toLocaleTimeString()}</div>;
}
