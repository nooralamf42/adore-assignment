const lcTasks = JSON.parse(localStorage.getItem("adoreTasks"))
console.log(lcTasks)
const initialState = {
    tasks: lcTasks || [],
    loading: false,
  };
  const ADD_TASK = 'ADD_TASK';
  const DELETE_TASK = 'DELETE_TASK';
  const EDIT_TASK = 'EDIT_TASK';
  export const addTask = (task) => ({
    type: ADD_TASK,
    payload: task,
  });

  export const editTask = (taskId) => ({
    type: EDIT_TASK,
    payload: taskId,
  });

  export const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId,
  });

  export default function taskReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_TASK:
        localStorage.setItem('adoreTasks', JSON.stringify([...state.tasks, action.payload]))
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
        };
      case EDIT_TASK:
        localStorage.setItem('adoreTasks', JSON.stringify(state.tasks.map(task => task.id === action.payload.id ? action.payload.newTask : task)))
        return {
          ...state,
          tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload.newTask : task),
        };
      case DELETE_TASK:
        localStorage.setItem('adoreTasks', JSON.stringify(state.tasks.filter(task => task.id !== action.payload)))
        return {
          ...state,
          tasks: state.tasks.filter(task => task.id !== action.payload),
        };
      default:
        return state;
    }
  }

  //create 