const express = require('express');
const { getTasks, addTask, updatestatus, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', addTask);
router.put('/tasks/:id', updatestatus);
router.delete('/tasks/:id', deleteTask);
// router.put('/api/tasks/:id', updateTask);


module.exports = router;
