import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import appFirebase from "../../credentials";

const auth = getAuth(appFirebase);

const SignUp = () => {
  const formRef = React.createRef();
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };

  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((state) => state.user.email);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
      );
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      formRef.current.reset();
    } catch (error) {
      console.error("Error:", error.code, error.message);
      if (error.code === "auth/weak-password") {
        setError(
          "Password is too weak. It should contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long"
        );
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary flex flex-col justify-center items-center gap-2 font-rubik p-2 pb-20">
      {currentUser && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-primary border-2 border-secondary p-8 rounded shadow-lg">
            <p className="text-forth">
              You are already signed in. Please sign out to register a new
              account.
            </p>
          </div>
        </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm p-1">
        <img className="mx-auto h-32 w-auto" src="/logo.svg" alt="Logo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-forth">
          <span className="text-compl font-bold animate-pulse">Sign Up</span> to
          your account
        </h2>
      </div>

      <div className="mt-10 p-2 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-forth"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="example@example.com"
                className="block w-full rounded-md border-0 py-1.5 text-forth shadow-sm ring-1 ring-inset ring-neutral placeholder-text-gray-400 focus:ring-2 focus:ring-inset p-2 focus:ring-compl sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-forth"
              >
                Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="block w-full rounded-md border-0 py-1.5 text-forth shadow-sm ring-1 ring-inset ring-neutral placeholder-text-gray-400 focus:ring-2 transition-all focus:ring-inset p-2 focus:ring-compl sm:text-sm sm:leading-6"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-compl px-3 py-1.5 text-sm font-semibold leading-6 text-primary shadow-sm hover:font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-third font-rubik"
              disabled={loading || currentUser}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
