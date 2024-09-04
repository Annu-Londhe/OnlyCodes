import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { name: taskName, description: taskDescription };
    const response = await axios.post('http://localhost:5000/api/tasks', newTask);
    onAddTask(response.data);
    setTaskName('');
    setTaskDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4">
      <input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
        className="border p-2 rounded mb-2 md:mb-0 md:mr-2 flex-grow"
      />
      <input
        type="text"
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="border p-2 rounded mb-2 md:mb-0 md:mr-2 flex-grow"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Task</button>
    </form>
  );
};

export default TaskForm;
