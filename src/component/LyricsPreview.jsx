import React, { useEffect, useState } from "react";
import { loadDraft } from "../utils/draftStore";
import lyricTimeFormatter from "../utils/lyricTimeFormatter";
import { useDispatch, useSelector } from "react-redux";
import { setLrc } from "../utils/redux/lyricSlice";

const LyricsPreview = ({ lyricsTextArray }) => {
  // const [lyricPreview, setLyricpreview] = useState("");
  const dispatch = useDispatch();
  const [lyric, setLyric] = useState(null);
  console.log("lyricsTextArray", lyricsTextArray);
  const metaData = JSON.parse(useSelector((state) => state.lyric.metadata));
  console.log("metaDatapreview", metaData);

  // const lyrics = lyricsTextArray
  //   ?.map((lrc) => {
  //     return `${lyricTimeFormatter(lrc.time)} ${lrc.text}`;
  //   })
  //   .join("\n");

  useEffect(() => {
    const lyricText = lyricsTextArray
      ?.map((lrc) => {
        return `${lyricTimeFormatter(lrc.time)} ${lrc.text}`;
      })
      .join("\n");
    const lyricMetadata = `[ar:${metaData?.artist || ""}]\n[ti:${metaData?.title || ""}]\n[al:${metaData?.album || "-"}]\n[lr:${metaData?.lyricist || ""}]\n[by:${metaData?.creator || ""}]\n[length:${metaData?.length || ""}]`;

    const completeLyric = `${lyricMetadata}\n\n${lyricText}`;
    setLyric(completeLyric);
    dispatch(setLrc(JSON.stringify(completeLyric)));
    // console.log("lyric", lyric);
    // setLyric((prev)=>)
  }, [metaData]);

  console.log("lyrics", lyric);
  return (
    <div className="bg-base-100 p-3 rounded-xl text-primary font-semibold">
      <h1>PREVIEW</h1>

      <textarea
        className="textarea h-90 text-xs text-nowrap"
        placeholder="Lyrics"
        disabled
        value={lyric}
      ></textarea>
    </div>
  );
};

export default LyricsPreview;
