import React from "react";
import { useDispatch } from "react-redux";
import { clearAllTasks, clearEmptyTasks } from "../../redux/tasksSlice"; // Cambiamos la acción

import FormTask from "../tasks/FormTask";
import ListTask from "../tasks/ListTask";
import ListTaskRedux from "../tasks/ListTaskRedux";

import appFirebase from "../../credentials";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(appFirebase);

const DashboardTodo = () => {
  const dispatch = useDispatch();

  const handleClearAllTasks = () => {
    dispatch(clearAllTasks()); // Usamos la nueva acción para borrar todas las tareas
  };

  const handleClearEmptyTasks = () => {
    dispatch(clearEmptyTasks());
  };

  return (
    <div className="h-[95vh] pt-10 pb-20">
      <div className="flex flex-col pb-10 gap-2">
        <h3 className="text-4xl text-secondary font-rubik text-center">
          Dashboard TO-DO
        </h3>
        <button
          onClick={() => signOut(auth)}
          className="bg-forth w-24 p-1 mx-auto text-primary rounded-sm shadow-sm shadow-neutral hover:text-xl"
        >
          LogOut
        </button>
        {/* Botón para borrar todas las tareas de la localStorage */}
        <button
          onClick={handleClearAllTasks}
          className="bg-red-500 text-white px-4 py-2 mx-auto
        rounded-sm shadow-sm shadow-neutral hover:bg-red-600"
        >
          Delete All Local Storage Tasks
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-2 justify-items-center">
        <FormTask />
        <ListTaskRedux />
        <ListTask />
      </div>
    </div>
  );
};

export default DashboardTodo;
