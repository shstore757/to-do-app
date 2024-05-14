import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const FormTask = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const baseURL = "https://apitask-nine.vercel.app/";

  const handleSubmitAPI = async (e) => {
    e.preventDefault();
    if (title !== "") {
      try {
        const response = await fetch(`${baseURL}api/tasks/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });

        if (!response.ok) {
          throw new Error("Failed to add task");
        }
        navigate("/");
        window.location.reload();
        formRef.current.reset();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleSaveLocalStorage = () => {
    if (title !== "") {
      const task = { id: Date.now(), title, description };
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      localStorage.setItem("tasks", JSON.stringify([...savedTasks, task]));
      navigate("/");
      window.location.reload();
      formRef.current.reset();
    }
  };

  return (
    <div className="border border-forth p-6 mx-auto h-[420px] w-[360px] md:w-[500px] shadow-md shadow-neutral">
      <form ref={formRef} onSubmit={handleSubmitAPI}>
        <h1 className="font-bold text-2xl text-secondary">Add Task</h1>
        <label htmlFor="title" className="text-md text-secondary">
          Title:
        </label>
        <input
          type="text"
          name="title"
          className="bg-zinc-300 rounded-sm p-2 mb-2 block w-full text-neutral"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description" className="text-md text-secondary">
          Description:
        </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="4"
          className="bg-zinc-300 rounded-sm p-2 mb-2 block w-full h-fit text-neutral"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="border-compl border-2 rounded-sm text-forth text-xl font-bold block w-full p-2 shadow-md shadow-neutral hover:text-2xl transition-all"
        >
          Save {">>>"} (API)
        </button>
        <button
          type="button"
          onClick={handleSaveLocalStorage}
          className="border-compl border-2 rounded-sm text-forth text-xl font-bold block w-full p-2 shadow-md shadow-neutral mt-2 hover:text-2xl transition-all"
        >
          Save {">>>"} (Local)
        </button>
      </form>
    </div>
  );
};

export default FormTask;
