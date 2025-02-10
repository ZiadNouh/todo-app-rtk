import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Task, updateTaskStatus } from "../features/tasks/taskSlice";
import TaskList from "./TaskList";
import SortableTaskItem from "./SortableTaskItem";

const TaskBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(
    (state: { tasks: { tasks: Task[] } }) => state.tasks.tasks
  );
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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

    if (over) {
      const targetStatus =
        over.data.current?.status || active.data.current?.status;

      if (targetStatus && active.id !== over.id) {
        dispatch(
          updateTaskStatus({
            id: active.id,
            status: targetStatus,
          })
        );
      }
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
        sensors={sensors}
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
          {activeTask ? <SortableTaskItem task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default TaskBoard;
