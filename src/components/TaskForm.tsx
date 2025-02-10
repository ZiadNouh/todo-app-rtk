import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTask } from "../features/tasks/taskSlice";

const TaskForm = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
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
      dispatch(addTask(values));
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Task Name"
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
          placeholder="Task Description"
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

      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
