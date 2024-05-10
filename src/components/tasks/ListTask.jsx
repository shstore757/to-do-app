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
import axios from "axios";

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

// Custom hooks para cargar tareas
function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const axiosTasks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/tasks/`
        );
        const data = res.data;
        setTasks(data.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error axiosing tasks:", error);
        setError(error);
        setLoading(false);
      }
    };

    axiosTasks();

    return () => {
      // Cleanup
    };
  }, []);

  // Función para eliminar una tarea
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`
      );
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
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`,
        updatedTaskData
      );
      const updatedTask = res.data;
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
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}/done/`
      );
      const updatedTask = res.data;
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
        <Text style={styles.title}>API Tasks List</Text>
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
      <PDFDownloadLink document={<MyDocument />} fileName="task-list.pdf">
        {({ loading }) => (loading ? "Cargando documento..." : "Descargar PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default ListTask;
