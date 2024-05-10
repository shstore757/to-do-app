import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "", // Ahora email representa el estado de autenticación
  password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
    },
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    logoutUser: (state) => {
      state.email = ""; // Al cerrar sesión, limpiamos el email
      state.password = ""; // También limpiamos la contraseña por seguridad
    },
  },
});

export const { addUser, changeEmail, logoutUser } = userSlice.actions;
export default userSlice.reducer;
