import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InfinitySpin } from "react-loader-spinner";
import { addTask, deleteTask, updateTask } from "../../redux/tasksSlice";
import TaskCardLocal from "./TaskCardLocal";

function ListTaskRedux() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      dispatch(addTask(savedTasks));
    }
    setLoading(false);
  }, [dispatch]);

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
    // No necesitas actualizar el almacenamiento local aquí, Redux ya actualiza las tareas
  };

  const handleUpdateTask = (taskId, updatedTaskData) => {
    if (
      updatedTaskData.title.trim() === "" ||
      updatedTaskData.description.trim() === ""
    ) {
      // No actualiza la tarea si el título o la descripción están vacíos
      return;
    }

    dispatch(updateTask({ id: taskId, updatedTask: updatedTaskData }));
    // No actualices el almacenamiento local aquí, Redux ya actualiza las tareas
  };

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
        <span className="text-compl">Local</span> Tasks List
      </h2>
      <h3 className="text-center text-secondary">Individual</h3>
      <div>
        {tasks &&
          tasks.map(
            (task) =>
              // Asegúrate de que la tarea tenga una propiedad 'id'
              task &&
              task.id && (
                <TaskCardLocal
                  key={task.id}
                  task={task}
                  onDeleteTask={handleDeleteTask}
                  onUpdateTask={handleUpdateTask}
                />
              )
          )}
      </div>
    </div>
  );
}

export default ListTaskRedux;
