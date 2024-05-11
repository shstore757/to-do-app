import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { InfinitySpin } from "react-loader-spinner";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  task: {
    marginBottom: 10,
    fontSize: 16,
  },
});

// Custom hook para cargar tareas usando fetch
function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/tasks/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        setTasks(data.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchTasks();

    return () => {
      // Cleanup
    };
  }, []);

  // Función para eliminar una tarea
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      // Actualizar la lista de tareas después de eliminar
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      setError(error);
    }
  };

  // Función para actualizar una tarea
  const updateTask = async (taskId, updatedTaskData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTaskData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      const updatedTask = await response.json();
      // Actualizar la tarea en la lista de tareas
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
      setError(error);
    }
  };

  // Función para marcar una tarea como completada
  const checkTask = async (taskId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}/done/`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to check task");
      }
      const updatedTask = await response.json();
      // Actualizar la lista de tareas después de marcar como completada
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, done: true } : task
        )
      );
    } catch (error) {
      console.error("Error checking task:", error);
      setError(error);
    }
  };

  return { tasks, loading, error, deleteTask, updateTask, checkTask };
}

const ListTask = () => {
  const { tasks, loading, error, deleteTask, updateTask, checkTask } =
    useTasks();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <InfinitySpin
          visible={true}
          width="222"
          color="#0284c7"
          ariaLabel="infinity-spin-loading"
        />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Community To Do List</Text>
        {tasks.map((task) => (
          <Text key={task.id} style={styles.task}>
            {task.title}
          </Text>
        ))}
      </Page>
    </Document>
  );

  return (
    <div className="border border-forth p-6 w-[365px] md:w-[500px] mx-auto mb-2 shadow-md shadow-neutral">
      <h2 className="text-3xl text-center m-2 text-secondary">
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
      <PDFDownloadLink
        document={<MyDocument />}
        fileName="task-list.pdf"
        className="text-neutral hover:text-compl"
      >
        {({ loading }) => (loading ? "Cargando documento..." : "Descargar PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default ListTask;
