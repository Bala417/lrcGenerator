import React, { useEffect, useState, useRef } from "react";
import AudioManager from "../component/AudioManager";

import AudioPlayer from "../component/AudioPlayer";
import { loadAudio } from "../utils/audioStore";
import LyricEditor from "../component/LyricEditor";
import MetaData from "../component/MetaData";
import LyricsPreview from "../component/LyricsPreview";

const Home = () => {
  const [file, setFile] = useState(null);
  const [isAudioFileChanged, setIsAudioFileChanged] = useState(null);
  const [metaData, setMetadata] = useState(null);
  const [lyricsTextArray, setLyricsTextArray] = useState(null);

  return (
    <div className="bg-base-300 flex gap-5 ">
      <div className="w-[70%]  m-auto flex  gap-5 ">
        <div className="w-[70%] flex flex-col  mt-3 rounded-xl bg-base-200">
          <AudioManager setIsAudioFileChanged={setIsAudioFileChanged} />
          <AudioPlayer
            isAudioFileChanged={isAudioFileChanged}
            setMetadata={setMetadata}
            metaData={metaData}
          />
          <div className="  mt-3 rounded-xl bg-base-200">
            <LyricEditor
              setLyricsTextArray={setLyricsTextArray}
              lyricsTextArray={lyricsTextArray}
            />
          </div>
        </div>

        <div>
          <MetaData
            metaData={metaData}
            isAudioFileChanged={isAudioFileChanged}
          />
          <LyricsPreview lyricsTextArray={lyricsTextArray} />
        </div>
      </div>
    </div>
  );
};

export default Home;
