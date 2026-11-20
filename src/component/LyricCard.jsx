import React from "react";
import { IoMdStopwatch } from "react-icons/io";
import lyricTimeFormatter from "../utils/lyricTimeFormatter";
import { IoIosRemoveCircle } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
const LyricCard = ({
  lyricSentence,
  handleStamping,
  setLyricsTextArray,
  lyricsTextArray,
}) => {
  // const lrcTime = `[${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}.${centis}] `;
  const lrcTime = lyricTimeFormatter(lyricSentence.time);
  console.log("timeeee", lyricSentence);

  const handleRemoveTimestamp = () => {
    // const lyric = lyricsTextArray.find((l) => l.id === lyricSentence.id);
    setLyricsTextArray((prev) =>
      prev.map((item) =>
        item.id === lyricSentence.id ? { ...lyricSentence, time: null } : item,
      ),
    );

  };
  return (
    <div className="flex gap-3 p-2 items-center justify-between">
      <div className="flex gap-3">
        <button
          className={`btn btn-circle  text-primary-content active:btn-secondary ${lyricSentence.time ? "btn-secondary" : "btn-primary"}`}
          onClick={() => handleStamping(lyricSentence)}
        >
          <IoMdStopwatch size={30} />
        </button>
        <p className="text-xl text-wrap">{lyricSentence.text}</p>
      </div>
      <div className="flex gap-3">
        <p>{lrcTime}</p>
        {lyricSentence.time && (
          <button
            className="btn btn-circle  btn-xs btn-primary  "
            onClick={handleRemoveTimestamp}
          >
            <IoMdRemove />
          </button>
        )}
      </div>
    </div>
  );
};

export default LyricCard;
