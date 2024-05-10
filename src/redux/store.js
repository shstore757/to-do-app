import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import tasksReducer from "./tasksSlice";
import darkModeReducer from "./darkModeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer, 
    darkMode: darkModeReducer ,
  },
});

export default store;

