import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "../features/tasks/taskSlice";
import SortableTaskItem from "./SortableTaskItem";

interface TaskListProps {
  tasks: Task[];
  status: Task["status"];
}

const TaskList = ({ tasks, status }: TaskListProps) => {
  return (
    <div className="flex-1 p-4 bg-gray-100 rounded" data-status={status}>
      <h2 className="text-xl font-bold mb-4">{status}</h2>
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <SortableTaskItem key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

export default TaskList;
