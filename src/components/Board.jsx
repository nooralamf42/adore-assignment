import Task from "./Task";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addTask, deleteTask } from "../reducers/taskReducer";
import TaskForm from "./TaskForm";

const Board = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState({});
  const [isCloneEnabled, setIsCloneEnabled] = useState(false);
  const dispatch = useDispatch();

  const editTaskHandler = (task) => {
    setIsModalOpen(true);
    setEditTaskData(task);
  };

  const deleteTaskHandler = (id) => {
    dispatch(deleteTask(id));
    setIsModalOpen(false);
  };

  const cloneTaskHandler = (task) => {
    dispatch(addTask({ ...task, id: nanoid() }));
    setIsCloneEnabled(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditTaskData({});
  };

  return (
    <div className="container">
      {!isCloneEnabled && tasks.length >= 0 ? (
        <div className="board-body">
          <h2 className="total-tasks">Tasks ({tasks.length})</h2>
          <button
            className="clone-task-btn btn"
            disabled={isCloneEnabled || tasks.length === 0}
            onClick={() => setIsCloneEnabled(!isCloneEnabled)}
          >
            Clone Task
          </button>
          <button className="add-task-btn btn" onClick={() => openModal()}>
            Create Task
          </button>
        </div>
      ) : (
        <h1 className="clone-task-text">Click on the task you want to clone</h1>
      )}
      <ul>
        {tasks.map((task) => (
          <li key={nanoid()}>
            <Task
              task={task}
              deleteTaskHandler={deleteTaskHandler}
              editTaskHandler={editTaskHandler}
              isCloneEnabled={isCloneEnabled}
              cloneTaskHandler={cloneTaskHandler}
            />
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <TaskForm closeModal={closeModal} taskData={editTaskData} />
      )}
    </div>
  );
};

export default Board;
