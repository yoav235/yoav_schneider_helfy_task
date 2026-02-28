import React, { useState } from "react";
import { createTask } from "../services/task_util";
import "./TaskForm.css";

function TaskForm({ onTaskCreated, nextId }) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        completed: false,
        priority: "low"
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTask = {
                id: nextId,
                title: formData.title,
                description: formData.description,
                completed: formData.completed,
                priority: formData.priority
            };
            await createTask(newTask);
            onTaskCreated();
            setFormData({
                title: "",
                description: "",
                completed: false,
                priority: "low"
            });
            setIsOpen(false);
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    return (
        <>
            <button className="add-button" onClick={() => setIsOpen(true)}>
                +
            </button>
            {isOpen && (
                <div className="modal-overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Add New Task</h2>
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
                                    Create Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default TaskForm;
