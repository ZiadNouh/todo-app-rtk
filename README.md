# Task Manager with Drag-and-Drop

A React-based Task Manager application featuring drag-and-drop functionality using `@dnd-kit`, task editing with `Formik` and `Yup` for validation, and Redux for state management. This app allows users to add, edit, delete, and reorder tasks seamlessly.

## Features

- **Drag-and-Drop**: Reorder tasks using intuitive drag-and-drop interactions powered by `@dnd-kit`.
- **Task Management**: Add, edit, delete tasks with real-time updates.
- **Form Validation**: Robust form validation using `Formik` and `Yup`.
- **Status Updates**: Change task statuses (To-Do, In Progress, Done) with dropdown selection.
- **Confirmation Modals**: Confirm deletions to prevent accidental data loss.
- **Responsive UI**: Clean, modern design with TailwindCSS.

## Demo

![Task Manager Demo](https://todo-app-rtk-rho.vercel.app/)

## Technologies Used

- **Frontend:** React, TypeScript
- **State Management:** Redux Toolkit
- **Drag-and-Drop:** @dnd-kit
- **Form Handling & Validation:** Formik, Yup
- **Icons:** Lucide-React
- **Styling:** TailwindCSS

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the application:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Build for production:**
   ```bash
   npm run build
   # or
   yarn build
   ```

## Usage

1. **Adding a Task:** Use the form to add a task with a name and description.
2. **Editing a Task:** Click the edit icon to modify the task details.
3. **Deleting a Task:** Click the trash icon and confirm the deletion in the modal.
4. **Reordering Tasks:** Drag and drop tasks to reorder them.
5. **Changing Task Status:** Use the dropdown to update task status.

