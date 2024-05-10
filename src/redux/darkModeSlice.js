// darkModeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: false,
  reducers: {
    toggleDarkMode: (state) => !state,
    setDarkMode: (state, action) => action.payload,
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
