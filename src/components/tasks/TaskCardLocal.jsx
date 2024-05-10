import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../redux/tasksSlice";

const TaskCardLocal = ({ task }) => {
  const [edit, setEdit] = useState(false);
  const [newDone, setNewDone] = useState(task.done);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Do you want to delete this task?")) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleCheck = () => {
    const updatedDone = !newDone;
    setNewDone(updatedDone);

    dispatch(
      updateTask({
        id: task.id,
        updatedTask: {
          ...task,
          done: updatedDone,
        },
      })
    );
  };

  const handleUpdate = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      alert("Title and description cannot be empty!");
      return;
    }

    dispatch(
      updateTask({
        id: task.id,
        updatedTask: {
          ...task,
          done: newDone,
          title: newTitle,
          description: newDescription,
        },
      })
    );
    setEdit(false);
  };

  const toggleEdit = () => {
    if (!edit) {
      setNewTitle(task.title);
      setNewDescription(task.description);
    }
    setEdit(!edit);
  };

  return (
    <div className="bg-zinc-300 px-4 py-2 mb-2 flex justify-between hover:shadow-sm hover:shadow-neutral text-neutral h-fit">
      <div className="grid grid-cols-1 gap-1">
        <div>
          {!edit ? (
            <h2 className="text-2xl font-bold">
              {task.title}
              {task.done && <span className="text-green-500">✔</span>}
            </h2>
          ) : (
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              className="p-2 bg-zinc-400 text-primary w-full mb-2"
              onChange={(e) => setNewTitle(e.target.value)}
            />
          )}
          {!edit ? (
            <p>{task.description}</p>
          ) : (
            <textarea
              placeholder="Description"
              value={newDescription}
              className="p-2 bg-zinc-400 text-primary w-full h-fit"
              onChange={(e) => setNewDescription(e.target.value)}
            />
          )}
        </div>
        <div className="flex flex-row justify-items-center">
          <button
            className={`m-2 p-1 border-2 ${
              task.done
                ? "m-2 p-1 hover:translate-y-1 w-[70px] border-4 bg-green-600 border-green-600 rounded-sm text-primary transition-all"
                : "m-2 p-1 hover:translate-y-1 w-[70px] border-4 border-neutral transition-all  rounded-sm"
            }`}
            onClick={handleCheck}
            disabled={task.done}
          >
            {task.done ? "Ok" : "Check"}
          </button>
          <button
            className="m-2 p-1 border-2 border-red-600 w-[70px] hover:translate-y-1 transition-all hover:bg-red-600 hover:text-primary rounded-sm"
            onClick={handleDelete}
            disabled={!task.done}
          >
            Delete
          </button>
          <button
            className="m-2 p-1 border-2 border-compl w-[70px] hover:translate-y-1 transition-all
            focus:border-4 after:border-2 rounded-sm"
            onClick={edit ? handleUpdate : toggleEdit}
            disabled={task.done}
          >
            {edit ? "Save" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCardLocal;
