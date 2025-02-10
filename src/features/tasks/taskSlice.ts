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

const initialState: TaskState = {
  tasks: [],
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
      }
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: Task["status"] }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
    reorderTasks: (
      state,
      action: PayloadAction<{ status: Task["status"]; tasks: Task[] }>
    ) => {
      const { status, tasks } = action.payload;

      state.tasks = state.tasks.filter((t) => t.status !== status);
      state.tasks.push(...tasks);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTask, editTask, updateTaskStatus, reorderTasks, deleteTask } =
  taskSlice.actions;
export default taskSlice.reducer;
