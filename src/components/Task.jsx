import React from "react";

const Task = ({ task, deleteTaskHandler, editTaskHandler, isCloneEnabled , cloneTaskHandler}) => {
  let statusClass = "";
  if (task.status === "Completed") {
    statusClass = "completed";
  } else if (task.status === "Pending") {
    statusClass = "pending";
  } else if (task.status === "In Progress") {
    statusClass = "in-progress";
  }

  const cloneTask = (task) => {
    cloneTaskHandler(task)
  }
  return (
    <div onClick={()=>isCloneEnabled && cloneTask(task)} className={`task-card ${statusClass}`}>
      <h3>{task.title}</h3>
      <p className="task-status">{task.status}</p>
      <div className="task-description">
        <p>{task.description}</p>
        {
          !isCloneEnabled && (
            <div className="task-actions">
              <button onClick={() => deleteTaskHandler(task.id)}>Delete</button>
              <button onClick={() => editTaskHandler(task)}>Edit</button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Task;
