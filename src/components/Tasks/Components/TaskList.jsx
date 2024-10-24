import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/TaskList.css';
import Task from './Task';
import taskService from '../../../services/TaskService';

const TaskList = ({ userId, tasks, projectId, projectName, projectDescription, deleteTask, createTask, updateTask}) => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState([]);
  const [taskForm, setTaskForm] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskStartDate, setTaskStartDate] = useState('');
  const [taskEndDate, setTaskEndDate] = useState('');
  const [taskFile, setTaskFile] = useState(null); // State for file upload
  const [newTaskButtonColor, setNewTaskButtonColor] = useState('#007BFF');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);


  const handleBack = () => navigate('/Projects');

  const toggleForm = () => {
    const newColor = !taskForm ? 'red' : '#007BFF';
    setNewTaskButtonColor(newColor);
    setTaskForm((prev) => !prev);
  };

  const resetForm = () => {
    setTaskName('');
    setTaskDescription('');
    setTaskPriority('Medium');
    setTaskStartDate('');
    setTaskEndDate('');
    setTaskFile(null);
    setEditingIndex(null);
  };

  const formatDateForAPI = (dateString) => {
    return new Date(dateString).toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title: taskName,
      description: taskDescription,
      start_date: formatDateForAPI(taskStartDate),
      due_date: formatDateForAPI(taskEndDate),
      priority: taskPriority,
      status: false,
      repeat_interval: null,
      is_archived: false,
      // archived_at: null,
      owner: userId,
      project: projectId,
    };
    // console.log(taskFile)
    // const formData = new FormData();
    // formData.append("name", name); // Add text data
    // if (file) {
    //   formData.append("file", file); // Add file data
    // }

    try {
      if (editingIndex !== null) {
        const taskId = taskList[editingIndex].id;
        await updateTask(taskId, newTask, taskFile); // Pass file for update
      } else {
        
        await createTask(newTask, taskFile); // Pass file for creation
        console.log(taskFile)
        
      }
    } catch (error) {
      console.error('Error creating/updating task:', error);
    }

    resetForm();
    setTaskForm(false);
    setNewTaskButtonColor('#007BFF');
  };

  const handleEditTask = (taskId) => {
    const task = taskList.find(t => t.id === taskId);
    if (task) {
      setTaskName(task.title);
      setTaskDescription(task.description);
      setTaskStartDate(task.start_date.split('T')[0]);
      setTaskEndDate(task.due_date.split('T')[0]);
      setTaskPriority(task.priority);
      setEditingIndex(taskList.findIndex(t => t.id === taskId));
      setTaskForm(true);
      setNewTaskButtonColor('red');
    } else {
      console.error('Task not found for ID:', taskId);
    }
  };

  const handleDeleteTask = (taskId) => deleteTask(taskId);

  const handleArchiveTask = async (taskId) => {
    const taskToUpdate = taskList.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    const newArchivedState = !taskToUpdate.is_archived;
    const currentTimestamp = newArchivedState ? new Date().toISOString() : null;

    try {
      await taskService.archiveTask(taskId);

      setTaskList((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, is_archived: newArchivedState, archived_at: currentTimestamp }
            : task
        )
      );
    } catch (error) {
      console.error('Failed to archive/reassign task', error);
    }
  };

  const toggleTaskStatus = async (taskId) => {
    const taskToUpdate = taskList.find(task => task.id === taskId);
    if (taskToUpdate) {
      const newStatus = !taskToUpdate.status;
      await updateTask(taskToUpdate.id, { ...taskToUpdate, status: newStatus });
    }
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: !task.status } : task
      )
    );



  };

  return (
    <div className="main-container">
      <div className="task-list-header">
        <button className="back-button" onClick={handleBack}>Back</button>
        <div className="projectTitleDescription">
          <h2>{projectName}</h2>
          <p>{projectDescription}</p>
        </div>
        <button
          onClick={toggleForm}
          className="new-task-button"
          style={{ backgroundColor: newTaskButtonColor }}
        >
          {taskForm ? "Cancel Task" : "New Task"}
        </button>
      </div>
      {taskForm && (
        <div className="task-form-list">
          <form className="new-task-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="taskName">Task Name</label>
              <input
                id="taskName"
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription">Task Description</label>
              <input
                id="taskDescription"
                type="text"
                placeholder="Enter task description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskStartDate">Start Date</label>
              <input
                id="taskStartDate"
                type="date"
                value={taskStartDate}
                onChange={(e) => setTaskStartDate(e.target.value)}
                required
                className="set-task-date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskEndDate">End Date</label>
              <input
                id="taskEndDate"
                type="date"
                value={taskEndDate}
                onChange={(e) => setTaskEndDate(e.target.value)}
                required
                className="set-task-date"
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskPriority">Priority</label>
              <select
                id="taskPriority"
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
                className="priority-dropdown"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="taskFile">Attach File</label>
              <input
                id="taskFile"
                type="file"
                onChange={(e) => setTaskFile(e.target.files[0])}
              />
            </div>
            <div className="submit-button-container">
              <button type="submit" className="submit-button">
                {editingIndex !== null ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      )}
      <div>
        {taskList.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          taskList.map((task) => (
            <div key={task.id}>
              <Task
                title={task.title}
                description={task.description}
                startDate={task.start_date}
                endDate={task.due_date}
                priority={task.priority}
                status={task.status}
                files={task.files}
                isArchived={task.is_archived}
                onEdit={() => handleEditTask(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
                onArchive={() => handleArchiveTask(task.id)}
                onToggleStatus={() => toggleTaskStatus(task.id)}
              />            
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;

