import React, { useState } from 'react';
import axios from 'axios';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleStatusChange = async () => {
    const updatedStatus = { ...task, status: !task.status };
    const response = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updatedStatus);
    onUpdateTask(response.data);
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
    onDeleteTask(task._id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
    handleUpdateTask();
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const response = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, editedTask);
    onUpdateTask(response.data);
    setIsEditing(false);
  };

  return (
    <li  className="flex flex-col sm:flex-col md:flex-row items-center justify-between p-4 bg-yellow-50 shadow-md rounded-lg mb-4 ">
      {isEditing ? (
        <form onSubmit={handleUpdateTask}  className="flex flex-col md:flex-row items-center w-full">
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleInputChange}
            className="border p-2 rounded mb-2 md:mb-0 md:mr-2 flex-grow"

          />
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleInputChange}
               className="border p-2 rounded mb-2 md:mb-0 md:mr-2 flex-grow"
          />
          <div className="flex flex-row items-center justify-between p-4 bg-yellow-500 sm:flex-col shadow-md rounded-lg ">
            
          <button type="submit"  className="bg-blue-500 text-white p-2 rounded mr-2 md ">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}  className="bg-gray-500 text-white p-2 rounded">Cancel</button>
          
          </div>
        </form>
      ) : (
        <>
          <span  className={`flex-grow ${task.status ? 'line-through' : ''}`} >
            {task.name}: {task.description}
          </span >
          <div  className="flex items-center">
          <button onClick={handleStatusChange} className="bg-green-500 text-white p-2 rounded mr-2">
            {task.status ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button onClick={handleEditClick} className="bg-yellow-500 text-white p-2 rounded mr-2">Edit</button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;
