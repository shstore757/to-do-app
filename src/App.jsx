// App.jsx
import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appFirebase from "../src/credentials";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/DashboardTodo";
import NavBar from "./components/layout/NavBar";
import LogoComponent from "./components/layout/LogoComponent";

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(appFirebase),
      (userFirebase) => {
        setUser(userFirebase);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <div className={`font-rubik ${user ? "bg-primary" : "bg-transparent"} -z-50`}>
      <NavBar />
      <Routes>
        <Route path="/signin" element={user ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp />} />
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/signin" />} />
      </Routes>
      <LogoComponent />
    </div>
  );
}

export default App;
