
const API_URL = import.meta.env.VITE_API_URL;

export const apiRequest = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const getTasks = () => apiRequest("/tasks");

export const createTask = (task) =>
  apiRequest("/tasks", {
    method: "POST",
    body: JSON.stringify(task)
  });

export const updateTask = (id, task) =>
  apiRequest(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(task)
  });

export const deleteTask = (id) =>
  apiRequest(`/tasks/${id}`, {
    method: "DELETE"
  });

export const toggleTask = (id) =>
  apiRequest(`/tasks/${id}/toggle`, {
    method: "PATCH"
  });
