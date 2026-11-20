import { configureStore } from "@reduxjs/toolkit";

import lyricReducer from "./lyricSlice";
import playerSlice from "./playerSlice";

export const store = configureStore({
  reducer: {
    lyric: lyricReducer,
    player: playerSlice,
  },
});
