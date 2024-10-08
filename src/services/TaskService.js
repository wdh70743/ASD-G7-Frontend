import axios from "axios";

class TaskService {
  BASE_URL = `/tasks/`;

  getTasksByUser(userId) {
    return axios.get(`${this.BASE_URL}users/${userId}/tasks/`);  
  }

  getTasksByProject(projectID) { 
    return axios.get(`${this.BASE_URL}projects/${projectID}/tasks/`);  
  }

  deleteTask(taskId) {
    return axios.delete(`${this.BASE_URL}${taskId}/`);
  }

  createTask(newTask) {
    return axios.post(`${this.BASE_URL}/create/`, newTask);
  }

  updateTask(taskId, updatedTask) {
    return axios.patch(`${this.BASE_URL}${taskId}/`, updatedTask);
  }

  getArchivedTasksByUser(userId) {
    return axios.get(`${this.BASE_URL}users/${userId}/tasks/archived/`);
  }

  archiveTask(taskId) {
    return axios.post(`${this.BASE_URL}archive/`, { task_id: taskId });
  }  
}

const taskService = new TaskService();

export default taskService;
