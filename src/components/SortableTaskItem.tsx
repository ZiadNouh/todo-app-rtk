import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Task,
  deleteTask,
  editTask,
  updateTaskStatus,
} from "../features/tasks/taskSlice";
import { useDispatch } from "react-redux";
import { Trash2, Edit, ChevronDown } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface SortableTaskItemProps {
  task: Task;
}

const SortableTaskItem: React.FC<SortableTaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { status: task.status },
  });

  const formik = useFormik({
    initialValues: {
      name: task.name,
      description: task.description,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Task name is required")
        .min(3, "Task name must be at least 3 characters")
        .max(50, "Task name must be at most 50 characters"),
      description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters")
        .max(200, "Description must be at most 200 characters"),
    }),
    onSubmit: (values) => {
      dispatch(
        editTask({
          id: task.id,
          ...values,
        })
      );
      setIsEditing(false);
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleStatusChange = (newStatus: Task["status"]) => {
    dispatch(
      updateTaskStatus({
        id: task.id,
        status: newStatus,
      })
    );
    setShowStatusDropdown(false);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  if (isEditing) {
    return (
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-2 p-4 bg-gray-50 rounded-lg"
      >
        <div>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border rounded ${
              formik.touched.name && formik.errors.name
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
          )}
        </div>
        <div>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full p-2 border rounded ${
              formik.touched.description && formik.errors.description
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 mb-2 bg-white rounded-lg shadow-md relative group"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{task.name}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
        </div>
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="mt-3 relative">
        <button
          onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-lg text-sm text-gray-700 hover:bg-gray-200"
        >
          <span>{task.status}</span>
          <ChevronDown size={16} />
        </button>
        {showStatusDropdown && (
          <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-md">
            {["To-Do", "In Progress", "Done"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status as Task["status"])}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {status}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortableTaskItem;
