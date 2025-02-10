import "./App.css";
import TaskBoard from "./components/TaskBoard";
import TaskForm from "./components/TaskForm";

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">TODO App</h1>
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create a New Task</h2>
          <TaskForm />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Task Board</h2>
          <TaskBoard />
        </div>
      </div>
    </div>
  );
}

export default App;
