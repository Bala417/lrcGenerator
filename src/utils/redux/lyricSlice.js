import { createSlice } from "@reduxjs/toolkit";

const lyricSlice = createSlice({
  name: "lyric",
  initialState: { lyric: null, metadata: null, lrc: null },
  reducers: {
    lyricData(state, action) {
      return { ...state, lyric: action.payload };
    },
    lyricMetadata(state, action) {
      return { ...state, metadata: action.payload };
    },
    setLrc(state, action) {
      return { ...state, lrc: action.payload };
    },
    // todoToggled(state, action) {
    //   const todo = state.find((todo) => todo.id === action.payload);
    //   todo.completed = !todo.completed;
    // },
  },
});

export const { lyricData, lyricMetadata, setLrc } = lyricSlice.actions;
export default lyricSlice.reducer;
