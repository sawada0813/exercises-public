"use client";
import React from "react";
import Pad from "./pad";

export default function SoundPads() {
  return (
    <div className='grid grid-cols-5 grid-rows-2 gap-4'>
      <Pad id={1} />
      <Pad id={2} />
      <Pad id={3} />
      <Pad id={4} />
      <Pad id={5} />
      <Pad id={6} />
      <Pad id={7} />
      <Pad id={8} />
      <Pad id={9} />
      <Pad id={0} />
    </div>
  );
}
