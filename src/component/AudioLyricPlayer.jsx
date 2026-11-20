import React, { useState, useEffect, useRef } from "react";
import { useAudioPlayer } from "react-use-audio-player";

const AudioLyricPlayer = ({ audioSrc, lyrics = SAMPLE_LYRICS }) => {
  const {
    togglePlayPause,
    playing,
    duration,
    seek,
    getPosition,
    isLoading,
    error,
  } = useAudioPlayer();

  const [currentTime, setCurrentTime] = useState(0);
  const [activeLineIndex, setActiveLineIndex] = useState(0);

  const frameRef = useRef(null);
  const lyricsContainerRef = useRef(null);
  const activeLineRef = useRef(null);

  // 1. Poll audio position smoothly using requestAnimationFrame
  useEffect(() => {
    const updatePosition = () => {
      const pos = getPosition();
      setCurrentTime(pos);

      // Find the current active lyric line
      let currentIndex = 0;
      for (let i = 0; i < lyrics.length; i++) {
        if (pos >= lyrics[i].time) {
          currentIndex = i;
        } else {
          break;
        }
      }
      setActiveLineIndex(currentIndex);

      if (playing) {
        frameRef.current = requestAnimationFrame(updatePosition);
      }
    };

    if (playing) {
      frameRef.current = requestAnimationFrame(updatePosition);
    } else {
      cancelAnimationFrame(frameRef.current);
    }

    return () => cancelAnimationFrame(frameRef.current);
  }, [playing, getPosition, lyrics]);

  // 2. Auto-scroll to the active lyric line
  useEffect(() => {
    if (activeLineRef.current && lyricsContainerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [activeLineIndex]);

  // Format seconds into MM:SS
  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle progress bar click
  const handleSeek = (e) => {
    const progressBar = e.currentTarget;
    const clickPosition =
      (e.clientX - progressBar.getBoundingClientRect().left) /
      progressBar.offsetWidth;
    const newTime = clickPosition * duration;
    seek(newTime);
    setCurrentTime(newTime);
  };

  if (error)
    return <div style={{ color: "red" }}>Error loading audio: {error}</div>;

  return (
    <div style={styles.container}>
      {/* Synced Lyrics Display */}
      <div ref={lyricsContainerRef} style={styles.lyricsBox}>
        {lyrics.map((line, index) => {
          const isActive = index === activeLineIndex;
          return (
            <p
              key={index}
              ref={isActive ? activeLineRef : null}
              onClick={() => {
                seek(line.time);
                setCurrentTime(line.time);
              }}
              style={{
                ...styles.lyricLine,
                ...(isActive ? styles.activeLyric : styles.inactiveLyric),
              }}
            >
              {line.text}
            </p>
          );
        })}
      </div>

      {/* Audio Controls */}
      <div style={styles.controls}>
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          style={styles.playButton}
        >
          {isLoading ? "Loading..." : playing ? "Pause" : "Play"}
        </button>

        <span style={styles.timeText}>{formatTime(currentTime)}</span>

        {/* Scrubber Bar */}
        <div onClick={handleSeek} style={styles.progressBarContainer}>
          <div
            style={{
              ...styles.progressBarFill,
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
            }}
          />
        </div>

        <span style={styles.timeText}>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default AudioLyricPlayer;
