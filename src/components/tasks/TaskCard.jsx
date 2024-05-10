import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task, onUpdateTask, onDeleteTask, onCheckTask }) => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleDelete = useCallback(async () => {
    if (window.confirm("¿Do you want to delete this task?")) {
      try {
        await onDeleteTask(task.id);
        navigate("/");
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  }, [onDeleteTask, task.id, navigate]);

  const handleCheck = useCallback(async () => {
    try {
      await onCheckTask(task.id);
      navigate("/");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }, [onCheckTask, task.id, navigate]);

  return (
    <div className="bg-zinc-200 px-4 py-2 mb-2 flex justify-between hover:shadow-sm hover:shadow-neutral text-forth h-fit">
      <div className="grid grid-cols-1 gap-1">
        <div>
          {!edit ? (
            <h2 className="text-2xl font-bold">
              {newTitle}
              {task.done && <span className="text-green-500">✔✔✔</span>}
            </h2>
          ) : (
            <input
              type="text"
              placeholder={newTitle}
              value={newTitle}
              className="p-2 bg-primary text-third w-full mb-2"
              onChange={(e) => setNewTitle(e.target.value)}
            />
          )}
          {!edit ? (
            <p>{newDescription}</p>
          ) : (
            <textarea
              placeholder={newDescription}
              value={newDescription}
              className="p-2 bg-primary text-third w-full h-fit"
              onChange={(e) => setNewDescription(e.target.value)}
            />
          )}
        </div>
        <div className="flex flex-row justify-items-center">
          <button
            className={
              task.done
                ? "m-2 p-1 hover:translate-y-1 w-[70px] border-4 bg-green-600 border-green-600 rounded-sm text-primary transition-all"
                : "m-2 p-1 hover:translate-y-1 w-[70px] border-4 border-neutral transition-all  rounded-sm"
            }
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
            onClick={() => setEdit(!edit)}
            disabled={task.done}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
