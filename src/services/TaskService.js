import axios from "axios";

class TaskService {
  BASE_URL = `http://asd-g7-backend.australiaeast.cloudapp.azure.com/`;

  getTasksByUser(userId) {
    return axios.get(`${this.BASE_URL}tasks/users/${userId}/tasks/`,
      { headers: {
        "Content-Type": "multipart/form-data",
      },}
    );  
  }

  getTasksByProject(projectID) { 
    return axios.get(`${this.BASE_URL}tasks/projects/${projectID}/tasks/`,
      { headers: {
        "Content-Type": "multipart/form-data",
      },}
    );  
  }

  deleteTask(taskId) {
    return axios.delete(`${this.BASE_URL}tasks/${taskId}/`,
      { headers: {
        "Content-Type": "multipart/form-data",
      },}
    );
  }

  createTask(newTask, taskFile) {
    const formData = new FormData();
  
    // Append all properties of newTask to formData
    for (const key in newTask) {
      if (newTask.hasOwnProperty(key)) {
        formData.append(key, newTask[key]);
      }
    }
  
    // Append the file if it exists
    if (taskFile) {
      formData.append('uploaded_files', taskFile); // Use a specific key for the file
    }
    console.log(taskFile)
  
    return axios.post(`${this.BASE_URL}tasks/create/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  updateTask(taskId, updatedTask) {
    return axios.patch(`${this.BASE_URL}tasks/${taskId}/`, updatedTask,
      { headers: {
        "Content-Type": "multipart/form-data",
      },}
    );
  }

  getArchivedTasksByUser(userId) {
    return axios.get(`${this.BASE_URL}tasks/users/${userId}/tasks/archived/`);
  }

  archiveTask(taskId) {
    return axios.post(`${this.BASE_URL}tasks/archive/`, { task_id: taskId });
  }  
}

const taskService = new TaskService();

export default taskService;
