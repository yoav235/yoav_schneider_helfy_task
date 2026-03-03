import { API_URL } from "./constants";

export const getAllTasks = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export const createTask = async (task) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
        return response.json();
    }
    catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
}

export const updateTask = async (task, id) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...task, id }),
        });
        return response.json();
    }
    catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        }); 
        return response.json();
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
}

export const updateTaskStatus = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        return response.json();
    } catch (error) {
        console.error("Error updating task status:", error);
        throw error;
    }
}

export const syncTasks = async (tasks, nextId) => {
    try {
        const response = await fetch(`${API_URL}/tasks/sync_tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tasks, nextId }),
        });
        return response.json();
    } catch (error) {
        console.error("Error syncing tasks:", error);
        throw error;
    }
}