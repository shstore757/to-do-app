import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { InfinitySpin } from "react-loader-spinner";

// Custom hooks para cargar tareas
function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/`);
      if (!res.ok) {
        throw new Error(
          `Failed to fetch tasks: ${res.status} - ${res.statusText}`
        );
      }
      const data = await res.json();
      setTasks(data.reverse());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();

    // Cleanup
    return () => {};
  }, []);

  // Función para eliminar una tarea
  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error(
          `Failed to delete task: ${res.status} - ${res.statusText}`
        );
      }
      // Actualizar la lista de tareas después de eliminar
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task. Please try again later.");
    }
  };

  // Función para actualizar una tarea
  const updateTask = async (taskId, updatedTaskData) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedTaskData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error(
          `Failed to update task: ${res.status} - ${res.statusText}`
        );
      }
      const updatedTask = await res.json();
      // Actualizar la tarea en la lista de tareas
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Failed to update task. Please try again later.");
    }
  };

  // Función para marcar una tarea como completada
  const checkTask = async (taskId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}/done/`,
        {
          method: "POST",
        }
      );
      if (!res.ok) {
        throw new Error(
          `Failed to check task: ${res.status} - ${res.statusText}`
        );
      }
      // Actualizar la lista de tareas después de marcar como completada
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, done: true } : task
        )
      );
    } catch (error) {
      console.error("Error checking task:", error);
      throw new Error("Failed to check task. Please try again later.");
    }
  };

  return { tasks, loading, error, deleteTask, updateTask, checkTask };
}

const ListTask = () => {
  const { tasks, loading, error, deleteTask, updateTask, checkTask } =
    useTasks();

  if (loading) {
    return (
      <InfinitySpin
        visible={true}
        width="222"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div
      className="border border-forth p-6 w-[365px] md:w-[500px] mx-auto mb-2
    shadow-md shadow-neutral"
    >
      <h2 className="text-3xl text-center m-2 text-secondary">
        {" "}
        <span className="text-compl">API</span> Tasks List
      </h2>
      <h3 className="text-center text-secondary">Community</h3>
      <div>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDeleteTask={deleteTask}
            onUpdateTask={updateTask}
            onCheckTask={checkTask}
          />
        ))}
      </div>
    </div>
  );
};

export default ListTask;
