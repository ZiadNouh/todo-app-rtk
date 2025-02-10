import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Task {
  id: string;
  name: string;
  description: string;
  status: "To-Do" | "In Progress" | "Done";
}

interface TaskState {
  tasks: Task[];
}

const loadTasksFromLocalStorage = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    return [];
  }
};

const saveTasksToLocalStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
};

const initialState: TaskState = {
  tasks: loadTasksFromLocalStorage(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id" | "status">>) => {
      const newTask: Task = {
        id: uuidv4(),
        status: "To-Do",
        ...action.payload,
      };
      state.tasks.push(newTask);
      saveTasksToLocalStorage(state.tasks);
    },
    editTask: (
      state,
      action: PayloadAction<Partial<Task> & { id: string }>
    ) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
        saveTasksToLocalStorage(state.tasks);
      }
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: Task["status"] }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        saveTasksToLocalStorage(state.tasks);
      }
    },
    reorderTasks: (
      state,
      action: PayloadAction<{ status: Task["status"]; tasks: Task[] }>
    ) => {
      const { status, tasks } = action.payload;
      state.tasks = state.tasks.filter((t) => t.status !== status);
      state.tasks.push(...tasks);
      saveTasksToLocalStorage(state.tasks);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveTasksToLocalStorage(state.tasks);
    },
  },
});

export const { addTask, editTask, updateTaskStatus, reorderTasks, deleteTask } =
  taskSlice.actions;
export default taskSlice.reducer;
