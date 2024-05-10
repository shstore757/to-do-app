import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: getTasksFromLocalStorage(), // Obtener las tareas guardadas en la local storage
};

function getTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Guardar en la local storage
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Guardar en la local storage
    },
    updateTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
        localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Guardar en la local storage
      }
    },
    clearEmptyTitleTasks: (state) => {
      state.tasks = state.tasks.filter(
        (task) => task.title.trim() !== "" && task.description.trim() !== ""
      );
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Guardar en la local storage
    },
    clearAllTasks: (state) => {
      state.tasks = []; // Eliminamos todas las tareas
      localStorage.removeItem("tasks"); // Eliminamos todas las tareas de la localStorage
    },
    clearEmptyTasks: (state) => {
      state.tasks = state.tasks.filter((task) => task.title !== "");
      localStorage.setItem("tasks", JSON.stringify(state.tasks)); // Actualizamos la localStorage
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  clearEmptyTitleTasks,
  clearAllTasks,
  clearEmptyTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
