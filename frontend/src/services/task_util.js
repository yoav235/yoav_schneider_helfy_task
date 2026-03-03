import { API_URL } from "./constants";

export const getAllTasks = async () => {
    try {
        const response = await fetch(`${API_URL}/tasks/get_all_tasks`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export const createTask = async (task) => {
    try {
        const response = await fetch(`${API_URL}/tasks/create_task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
    }
    catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
}

export const updateTask = async (task, id) => {
    try {
        const response = await fetch(`${API_URL}/tasks/update_task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(task),
        });
    }
    catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_URL}/tasks/delete_task/${id}`, {
            method: 'DELETE',
        }); 
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
}

export const updateTaskStatus = async (task) => {
    try {
        const response = await fetch(`${API_URL}/tasks/update_task_status`, {
            method: 'PATCH',
        });
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