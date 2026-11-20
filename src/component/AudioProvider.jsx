import React from "react";
import { useSelector } from "react-redux";

const AudioProvider = () => {
  const currentTimestamp = useSelector((state) => state.player.currentTime);
  return <span>{currentTimestamp.toFixed(2)}</span>;
};


export default AudioProvider;
