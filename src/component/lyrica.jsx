import { useEffect, useRef, useState } from "react";
import Lyrica from "lyrica"; // npm i lyrica
import { loadAudio } from "../utils/audioStore";

export function WordSyncPlayer({ enhancedLrcText, audioSrc }) {
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const lyricaInstanceRef = useRef(null);
  const [src, setSrc] = useState(null);

  useEffect(() => {
    let url;
    (async () => {
      const record = await loadAudio();
      if (!record) return;
      console.log("record", record);
      const blob = new Blob([record.buffer], { type: record.type });
      //   const result = await ExtractMetadata(blob);
      //   console.log("result", result);
      //   setMetadata(result);
      url = URL.createObjectURL(blob);
      setSrc(blob); // if you also need the Blob itself

      //   audioRef.current.src = url;
    })();

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current || !containerRef.current || !enhancedLrcText) return;

    // Destroy old instance to avoid duplicate rendering
    if (lyricaInstanceRef.current) {
      // If lyrica provides a destroy method, call it
      // lyricaInstanceRef.current.destroy();
    }

    lyricaInstanceRef.current = new Lyrica(enhancedLrcText, {
      type: "sync",
      audioElement: audioRef.current,
      containerElement: containerRef.current,
      isAdvanced: true, // Key: enable word-level parsing
      doAdvanced: true, // Render word-level segments
      animations: {
        type: "scroll",
        autoScroll: true,
      },
    });

    return () => {
      if (lyricaInstanceRef.current) {
        // Cleanup logic
      }
    };
  }, [enhancedLrcText]);

  return (
    <div>
      <audio ref={audioRef} src={src} controls />
      <div ref={containerRef} style={{ height: "400px", overflow: "auto" }} />
    </div>
  );
}
