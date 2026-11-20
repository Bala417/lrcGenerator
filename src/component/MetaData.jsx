import React, { useEffect, useState } from "react";
import { lyricMetadata } from "../utils/redux/lyricSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
const MetaData = ({ isAudioFileChanged }) => {
  const { register, handleSubmit, setValue } = useForm();
  // const [artist, setArtist] = useState("");
  // const [title, setTitle] = useState("");
  // const [album, setAlbum] = useState("");
  // const [lyricist, setLyricist] = useState("");
  // const [length, setLength] = useState("");
  // const [creator, setCreator] = useState("");

  const dispatch = useDispatch();
  const metaData = JSON.parse(useSelector((state) => state.lyric.metadata));
  console.log("metaData", metaData);

  const onSubmit = (data) => {
    // console.log("data", data);
    const { artist, title, album, creator, lyricist, length } = data;
    dispatch(
      lyricMetadata(
        JSON.stringify({ artist, title, album, creator, lyricist, length }),
      ),
    );
  };

  useEffect(() => {
    if (metaData) {
      setValue("artist", metaData?.artist);
      setValue("title", metaData?.title);
      setValue("album", metaData?.album);
      setValue("lyricist", metaData?.lyricist);
      setValue("length", metaData?.length);
      setValue("creator", metaData?.creator ? metaData?.creator : "");
    }
  }, [metaData]);

  return (
    <div className="p-5 bg-base-100 my-3 rounded-xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
          <legend className="fieldset-legend">Meta Data </legend>

          <label className="label">Artist (ar)</label>
          <input
            type="text"
            className="input input-sm"
            {...register("artist")}
            placeholder="Singer, lyrist etc"
          />
          <label className="label">Title (ti)</label>
          <input
            type="text"
            className="input input-sm"
            placeholder="Song Title or Name"
            {...register("title")}
          />

          <label className="label">Album (al)</label>
          <input
            type="text"
            className="input input-sm"
            placeholder="E.g. Movie or album name"
            {...register("album")}
          />
          <label className="label">Lyricist</label>
          <input
            type="text"
            className="input input-sm"
            placeholder="Lyricist"
            {...register("lyricist")}
          />
          <label className="label">Music Duration</label>
          <input
            type="text"
            className="input input-sm"
            placeholder="eg. 5:10 "
            {...register("length")}
          />
          <label className="label">Created by (by)</label>
          <input
            type="text"
            className="input input-sm"
            placeholder="Your Name"
            {...register("creator")}
          />
        </fieldset>
        <div className="text-center mt-2">
          <button className="btn btn-primary ">Add</button>
        </div>
      </form>
    </div>
  );
};

export default MetaData;
