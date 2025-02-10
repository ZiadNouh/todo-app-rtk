import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../features/tasks/taskSlice";

interface SortableTaskItemProps {
  task: Task;
}

const SortableTaskItem = ({ task }: SortableTaskItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 mb-2 bg-white rounded shadow"
    >
      <h3 className="font-medium">{task.name}</h3>
      <p className="text-gray-600">{task.description}</p>
    </div>
  );
};

export default SortableTaskItem;
