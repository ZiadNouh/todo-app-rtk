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
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(addTask(values));
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Task Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        className="p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        className="p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
