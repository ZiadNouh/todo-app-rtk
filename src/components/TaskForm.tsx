import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";
import { ChevronDown, ChevronUp } from "lucide-react";

const TaskForm = () => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

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

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Create a New Task</h2>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded hover:bg-gray-100 cursor-pointer"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <Formik
          initialValues={{ name: "", description: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(addTask(values));
            resetForm();
            setIsExpanded(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder="Task Name"
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
                  placeholder="Task Description"
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

              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
              >
                Add Task
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default TaskForm;
