import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/DashboardTodo";
import NavBar from "./components/layout/NavBar";
import { useDispatch } from "react-redux";

//Modulos de Firebase
import appFirebase from "../src/credentials";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(appFirebase);

import LogoComponent from "./components/layout/LogoComponent";

function App() {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);



  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUser(userFirebase);
    } else {
      setUser(null);
    }
  });

  return (
    <div
      className={`font-rubik ${user ? "bg-primary" : "bg-transparent"} -z-50`}
    >
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/signin" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />

          {user ? (
            <Route path="/" Component={Dashboard} />
          ) : (
            <Route path="/signin" Component={SignIn} />
          )}
        </Routes>
      </BrowserRouter>
      <LogoComponent />
      {/* <img src="/logo.svg" alt="" className=" mx-auto" /> */}
    </div>
  );
}

export default App;
