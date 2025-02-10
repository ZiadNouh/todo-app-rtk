import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Task,
  updateTaskStatus,
  reorderTasks,
} from "../features/tasks/taskSlice";
import TaskList from "./TaskList";

const TaskBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(
    (state: { tasks: { tasks: Task[] } }) => state.tasks.tasks
  );
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filterTasks = (status: Task["status"]) =>
    tasks.filter(
      (task) =>
        task.status === status &&
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleDragStart = (event: any) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    const overTask = tasks.find((t) => t.id === over.id);

    if (!activeTask || !overTask) return;

    if (activeTask.status === overTask.status) {
      const filteredTasks = filterTasks(activeTask.status);
      const oldIndex = filteredTasks.findIndex((t) => t.id === active.id);
      const newIndex = filteredTasks.findIndex((t) => t.id === over.id);

      if (oldIndex !== newIndex) {
        const reorderedTasks = arrayMove(filteredTasks, oldIndex, newIndex);
        dispatch(
          reorderTasks({
            status: activeTask.status,
            tasks: reorderedTasks,
          })
        );
      }
    } else {
      dispatch(
        updateTaskStatus({
          id: active.id,
          status: overTask.status,
        })
      );
    }

    setActiveTask(null);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border rounded w-full"
      />

      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4">
          {["To-Do", "In Progress", "Done"].map((status) => (
            <TaskList
              key={status}
              tasks={filterTasks(status as Task["status"])}
              status={status as Task["status"]}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="p-2 mb-2 bg-white rounded shadow">
              <h3 className="font-medium">{activeTask.name}</h3>
              <p className="text-gray-600">{activeTask.description}</p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TaskBoard;
