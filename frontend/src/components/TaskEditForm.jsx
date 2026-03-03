import React, { useState } from "react";
import { updateTask } from "../services/task_util";
import "./TaskEditForm.css";

function TaskEditForm({ task, onTaskUpdated }) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description,
        completed: task.completed,
        priority: task.priority
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTask(formData, task.id);
            onTaskUpdated();
            setIsOpen(false);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleOpen = () => {
        setFormData({
            title: task.title,
            description: task.description,
            completed: task.completed,
            priority: task.priority
        });
        setIsOpen(true);
    };

    return (
        <>
            <button className="edit-button" onClick={handleOpen}>
                Edit
            </button>
            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Task</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="completed"
                                        checked={formData.completed}
                                        onChange={handleChange}
                                    />
                                    Completed
                                </label>
                            </div>
                            <div className="form-group">
                                <label>Priority</label>
                                <select
                                    name="priority"
                                    value={formData.priority}
                                    onChange={handleChange}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div className="form-actions">
                                <button type="button" onClick={() => setIsOpen(false)} className="cancel-button">
                                    Cancel
                                </button>
                                <button type="submit" className="submit-button">
                                    Update Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default TaskEditForm;
