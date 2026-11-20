import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { RiDeleteBinLine } from "react-icons/ri";
import { dbPromise } from "../utils/db";
import { clearAudio, saveAudio } from "../utils/audioStore";
import { ExtractMetadata } from "./ExtractMetadata";
import { useDispatch, useSelector } from "react-redux";
import { setMusicFile } from "../utils/redux/playerSlice";
import { lyricMetadata } from "../utils/redux/lyricSlice";
import lyricTimeFormatter from "../utils/lyricTimeFormatter";
import { toMinSec } from "../utils/toMinSec";

const AudioManager = ({ setIsAudioFileChanged }) => {
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const blobUrl = file && URL.createObjectURL(file);

  // console.log("filessss", blobUrl);

  useEffect(() => {
    dispatch(
      setMusicFile({
        url: blobUrl,
        fileType: file?.type || "",
        name: file?.name || "",
      }),
    );
    (async () => {
      const arrayBufferFile = await file?.arrayBuffer();
      const metaData = await ExtractMetadata(arrayBufferFile);

      dispatch(
        lyricMetadata(
          JSON.stringify({
            artist: metaData?.common?.artist || "",
            title: metaData?.common?.title || "",
            album: metaData?.common?.album || "",
            lyricist: metaData?.common?.lyricist
              ? metaData?.common?.lyricist[0]
              : "",
            length: `${toMinSec(metaData?.format?.duration)}` || "",
          }),
        ),
      );
      // console.log("mmm", metaData);
    })();
  }, [file]);

  return (
    <div className="p-3">
      <section className="container">
        <h1 className="p-2 font-semibold text-primary text-xl">
          1. Upload music
        </h1>

        <div className="text-center">
          <input
            type="file"
            className="file-input file-input-primary w-full "
            // value={file}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
      </section>
    </div>
  );
};

export default AudioManager;
