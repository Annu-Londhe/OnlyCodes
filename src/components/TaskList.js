import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from "./TaskForm"
const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-500'>
      <h1 className='text-3xl font-bold mb-4"'>To-Do List</h1>
      <TaskForm onAddTask={addTask} />
      <ul  className="w-full max-w-md">
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
