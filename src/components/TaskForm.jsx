import React from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { addTask, editTask } from "../reducers/taskReducer";

export default function TaskForm({ closeModal, taskData = {} }) {
  const dispatch = useDispatch();

  const addTaskHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newTask = {
      id: nanoid(),
      title: formData.get("title"),
      description: formData.get("description"),
      status: taskData.title!== undefined ? formData.get("status") : "Pending",
    };
    if(taskData.title!== undefined){
      dispatch(editTask({id: taskData.id, newTask}));
    }else{
      dispatch(addTask(newTask));
    }
    closeModal();
  };
  return (
    <div className="task-modal">
      <div className="task-modal-content">
        <form className="task-modal-form" onSubmit={(e)=>addTaskHandler(e)}>
          <input required type="text" placeholder="Title" name="title" defaultValue={taskData.title} />
          <textarea required type="text" placeholder="Description" name="description" defaultValue={taskData.description} />
          <div className="task-modal-form-status">
          {taskData.title!== undefined && <select id="status" name="status" defaultValue={taskData.status}>
          <label htmlFor="status">Status</label>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>}
          </div>
          <button className={taskData.title!== undefined ? "update-button" : "create-button"} type="submit">{taskData.title!== undefined ? "Update Task" : "Create Task"}</button>
        </form>
        <button className="close-btn" onClick={() => closeModal()}>Close</button>
      </div>
    </div>
  );
}
