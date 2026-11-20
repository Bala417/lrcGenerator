import React, { useEffect, useState } from "react";
import LyricCard from "./LyricCard";
import { useSelector } from "react-redux";
import AudioPlayer from "./AudioPlayer";
import lyricTimeFormatter from "../utils/lyricTimeFormatter";
import { saveDraft } from "../utils/draftStore";
import { useNavigate } from "react-router";
// import AudioLyricPlayer from "./AudioLyricPlayer";
import { useAudioPlayer } from "react-use-audio-player";

const LyricEditor = ({ setLyricsTextArray, lyricsTextArray }) => {
  const [lyricsText, setLyricsText] = useState("");
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState("editorMode");
  const metaData = useSelector((state) => state.lyric.metaData) || "";
  const lrcContent = JSON.parse(useSelector((state) => state.lyric.lrc));
  const currentTimestamp = useSelector((state) => state.player.currentTime);
  const musicFile = useSelector((state) => state.player.musicFile);

  const { load } = useAudioPlayer();
  // only this span re-renders at 4Hz — the parent editor does not
  //   const LiveTime = () => {
  //     const t = useSelector((s) => s.player.currentTime);
  //     return <span>{t.toFixed(2)}s</span>;
  //   };
  //   console.log("currentTimestamp", currentTimestamp);
  //   console.log("lyric test", lyricsText);
  //   console.log("lyric array", lyricsText?.split("\n"));
  console.log("lyricsTextArray", lyricsTextArray);

  const handleStamping = (lyricSentence) => {
    const lrcTime = lyricTimeFormatter(currentTimestamp);
    const lrcString = `${lrcTime} ${lyricSentence.text}`;
    // const navigate = useNavigate();

    setLyricsTextArray((prev) =>
      prev.map((lyr) =>
        lyr.id === lyricSentence.id
          ? { ...lyr, time: currentTimestamp } // replace just this line
          : lyr,
      ),
    );

    // console.log("lrcString", lrcString);
  };

  const handleTimestampRemove = () => {
    setLyricsTextArray((prev) =>
      prev.map((item) => {
        return { ...item, time: null };
      }),
    );
  };
  const handleLrcExport = () => {
    const fileName = metaData?.common?.album || "lyric";

    const blob = new Blob([lrcContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const formattedName = fileName.endsWith(".lrc")
      ? fileName
      : `${fileName}.lrc`;

    const link = document.createElement("a");
    link.href = url;
    link.download = formattedName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    load("/path/to/your-song.mp3", {
      autoplay: false,
      html5: true, // Recommended for streaming longer audio files
      format: "mp3",
    });
  }, [load]);
  return (
    <div className="p-3 bg-base-100 m-3 rounded-xl ">
      {displayMode === "editorMode" && (
        <div>
          <h1 className="p-2 font-semibold text-primary text-xl">
            2. Paste Lyrics
          </h1>
          <textarea
            className="textarea h-130 w-full "
            spellCheck={false}
            placeholder="Paste the lyrics here + click NEXT button for time stamping"
            value={lyricsText}
            onChange={(e) => setLyricsText(e.target.value)}
          ></textarea>
          <div className="m-2 text-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                setLyricsTextArray(
                  (lyricsText ?? "").split(/\r?\n/).map((text, i) => ({
                    id: i + 1, // stable, unique
                    time: null, // not timestamped yet
                    text, // keep as-is (or text.trim() if you prefer)
                  })),
                );
                setDisplayMode("timeStampingMode");
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {displayMode === "timeStampingMode" && (
        <div className="">
          <h1 className="p-2 font-semibold text-primary text-xl">
            3. Lyrics Stamping
          </h1>
          <div className="h-130 overflow-scroll">
            {lyricsTextArray?.map((lyricSentence, index) => {
              //   console.log("lyricSentence", lyricSentence);
              return (
                <LyricCard
                  key={index}
                  lyricSentence={lyricSentence}
                  handleStamping={handleStamping}
                  lyricsTextArray={lyricsTextArray}
                  setLyricsTextArray={setLyricsTextArray}
                />
              );
            })}
          </div>
          <div className="flex gap-5 justify-center">
            <button
              className="btn  btn-primary btn-outline"
              onClick={() => setDisplayMode("editorMode")}
            >
              Back
            </button>
            <button
              className="btn  btn-secondary btn-outline"
              onClick={handleTimestampRemove}
            >
              Reset
            </button>
            <button
              className="btn  btn-secondary btn-outline"
              onClick={handleLrcExport}
            >
              Download .lrc
            </button>
            {/* 
            <button
              className="btn"
              onClick={() => {
                document.getElementById("my_modal_1").showModal();
                setIsPlayerOpen(true);
              }}
            >
              Player
            </button> */}
          </div>
        </div>
      )}

      {/* <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {isPlayerOpen && (
            <AudioLyricPlayer audioSrc={musicFile?.url} lyrics={lrcContent} />
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => setIsPlayerOpen(false)}>
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog> */}
    </div>
  );
};

export default LyricEditor;
