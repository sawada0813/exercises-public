"use client";
import React from "react";
import Pads from "./pad";

export default function SoundPads() {
  return (
    <div className='grid grid-cols-5 grid-rows-2 gap-4'>
      <Pads />
      <Pads />
      <Pads />
      <Pads />
      <Pads />
      <Pads />
      <Pads />
      <Pads />
      <Pads />
      <Pads />
    </div>
  );
}
