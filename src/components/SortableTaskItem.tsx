import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
import DeleteConfirmationModal from "./modals/DeleteConfirmation";

interface SortableTaskItemProps {
  task: Task;
}

const SortableTaskItem: React.FC<SortableTaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Task name is required")
      .min(3, "Task name must be at least 3 characters")
      .max(50, "Task name must be at most 50 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(200, "Description must be at most 200 characters"),
  });

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTask(task.id));
    setIsModalOpen(false);
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
      <Formik
        initialValues={{
          name: task.name,
          description: task.description,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(
            editTask({
              id: task.id,
              ...values,
            })
          );
          setIsEditing(false);
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-2 p-4 bg-gray-50 rounded-lg">
            <div>
              <Field
                name="name"
                className={`w-full p-2 border rounded ${
                  touched.name && errors.name
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                name="description"
                as="textarea"
                className={`w-full p-2 border rounded ${
                  touched.description && errors.description
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <ErrorMessage
                name="description"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
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
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="mt-3 relative">
        <button
          onClick={() => setShowStatusDropdown(!showStatusDropdown)}
          className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-lg text-sm text-gray-700 hover:bg-gray-200 cursor-pointer"
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
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default SortableTaskItem;
