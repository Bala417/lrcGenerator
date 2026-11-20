import React, { useEffect, useState, useRef } from "react";
import { useAudioPlayer } from "react-use-audio-player";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaRedo,
} from "react-icons/fa";
import { loadAudio } from "../utils/audioStore";
import { ExtractMetadata } from "./ExtractMetadata";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTime } from "../utils/redux/playerSlice";

export default function AudioPlayer({
  isAudioFileChanged,
  setMetadata,

  //   title = "Track Title",
  //   artist = "Artist Name",
}) {
  const musicFile = useSelector((state) => state.player.musicFile);
  const metaData = JSON.parse(useSelector((state) => state.lyric.metadata));

  const {
    load,
    togglePlayPause,
    isPlaying,
    isLoading,
    duration,
    seek,
    getPosition,
    volume,
    setVolume,
    isMuted,
    toggleMute,
  } = useAudioPlayer();

  const [pos, setPos] = useState(0);
  // const [src, setSrc] = useState(null);
  const [srcUrl, setSrcUrl] = useState(null);
  const audioRef = useRef(null);

  console.log("musicFile", musicFile);
  console.log("metadata", metaData);

  // useEffect(() => {
  //   setSrcUrl(musicFile.path);
  // }, [musicFile]);

  const lastDispatchedTime = useRef(0);
  const dispatch = useDispatch();
  // const currentTime = useSelector((state) => state.player.currentTime);
  // console.log("currentTime", currentTime);
  // useEffect(() => {});
  // useEffect(() => {
  //   if (!src) return;

  //   // Convert Blob to URL string
  //   const url = URL.createObjectURL(src);

  //   load(url, {
  //     html5: true, // ⚠️ Important: force HTML5 mode
  //     format: "mp3", // if the URL has no extension, specify format
  //   });

  //   // Cleanup: revoke URL
  //   return () => URL.revokeObjectURL(url);
  // }, [src, load]);

  // Smoothly update the scrubber position while playing
  useEffect(() => {
    let animationFrameId;

    const updatePosition = () => {
      setPos(getPosition());
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    if (isPlaying) {
      animationFrameId = requestAnimationFrame(updatePosition);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, getPosition]);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setPos(newTime);
    seek(newTime);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      // console.log("currentTime", currentTime);
      // THROTTLE: Only dispatch if the time has changed by > 0.5 seconds
      // This prevents Redux from being flooded with actions every few milliseconds
      if (Math.abs(currentTime - lastDispatchedTime.current) >= 0.5) {
        lastDispatchedTime.current = currentTime;
        dispatch(setCurrentTime(currentTime));
      }
    }
  };

  return (
    <div className="card w-ful m-3  bg-base-200 shadow-xl border border-base-300">
      <div className="card-body  gap-4 p-2">
        {/* Track Info */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="card-title text-lg font-bold">
              {metaData?.title || "Not available"}
            </h2>
            <p className="text-sm text-base-content/70">
              {metaData?.artist || "Not available"}
            </p>
          </div>
          {isLoading && (
            <span className="loading loading-spinner loading-sm text-primary"></span>
          )}
        </div>

        <div>
          <audio
            controls
            src={musicFile?.url}
            className="w-full  h-12 rounded-xl"
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
          ></audio>
        </div>
      </div>
    </div>
  );
}
