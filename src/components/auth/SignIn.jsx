import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import appFirebase from "../../credentials";

const auth = getAuth(appFirebase);

const SignIn = () => {
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

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Error:", error.code, error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-primary flex flex-col justify-center items-center p-2 gap-2 font-rubik pb-20">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-primary border-2 border-secondary p-8 rounded shadow-lg">
            <p className="text-forth">Loading...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-primary border-2 border-secondary p-8 rounded shadow-lg">
            <p className="text-forth">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 bg-compl text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-32 w-auto"
          src="/logo.svg"
          alt="Your Company Logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-forth">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
                type="email"
                autoComplete="email"
                required
                placeholder="example@example.com"
                className="block w-full rounded-md border-0 py-1.5 text-forth shadow-sm ring-1 ring-inset ring-neutral placeholder-text-gray-400 focus:ring-2 focus:ring-inset p-2 focus:ring-compl sm:text-sm sm:leading-6"
                onChange={handleChange}
                disabled={currentUser ? true : false} // Deshabilitar si hay un usuario en sesión
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
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-third hover:text-third/80"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="block w-full rounded-md border-0 py-1.5 text-forth shadow-sm ring-1 ring-inset ring-neutral placeholder-text-gray-400 focus:ring-2 focus:ring-inset p-2 focus:ring-compl sm:text-sm sm:leading-6"
                onChange={handleChange}
                disabled={currentUser ? true : false} // Deshabilitar si hay un usuario en sesión
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-sm bg-compl px-3 py-2 text-md font-semibold leading-6 text-primary shadow-sm hover:text-xl hover:shadow-lg hover:shadow-neutral transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-third"
              disabled={currentUser ? true : false} // Deshabilitar si hay un usuario en sesión
            >
              Sign in
            </button>
          </div>
          <div className="">
            <h4 className="text-secondary text-md">
              If you already have an account
            </h4>
            <button
              onClick={handleSignUp}
              className="bg-forth p-2 text-primary text-lg rounded-sm hover:shadow-lg hover:shadow-neutral"
              disabled={currentUser ? true : false} // Deshabilitar si hay un usuario en sesión
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
