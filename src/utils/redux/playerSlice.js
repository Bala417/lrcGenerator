import { createSlice, current } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: { currentTime: 0, musicFile: null },
  reducers: {
    setCurrentTime(state, action) {
      //   console.log("action", action.payload);
      return { ...state, currentTime: action.payload };
    },
    setMusicFile(state, action) {
      return { ...state, musicFile: action.payload };
    },
    // todoToggled(state, action) {
    //   const todo = state.find((todo) => todo.id === action.payload);
    //   todo.completed = !todo.completed;
    // },
  },
});

export const { setCurrentTime, setMusicFile } = playerSlice.actions;
export default playerSlice.reducer;
