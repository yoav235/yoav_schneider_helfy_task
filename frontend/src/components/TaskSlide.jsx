import React from "react";
import { deleteTask } from "../services/task_util";
import TaskEditForm from "./TaskEditForm";
import "./TaskSlide.css";

function TaskSlide({ task, isEmpty, onTaskDeleted, onTaskUpdated }) {
    const handleDelete = async () => {
        try {
            await deleteTask(task.id);
            onTaskDeleted();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return (
        <div className="carousel-slide">
            <div className="task-card">
                {!isEmpty && (
                    <button className="delete-button" onClick={handleDelete}>
                        ×
                    </button>
                )}
                {!isEmpty && (
                    <div className={`status ${task.completed ? "completed" : "pending"}`}>
                        {task.completed ? "✓" : "○"}
                    </div>
                )}
                <h2>{task.title}</h2>
                {task.description && <p>{task.description}</p>}
                {!isEmpty && (
                    <div className="task-details">
                        <div className="detail-item">
                            <span className="detail-label">ID:</span>
                            <span className="detail-value">{task.id}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Priority:</span>
                            <span className={`priority ${task.priority}`}>
                                {task.priority}
                            </span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Status:</span>
                            <span className="detail-value">{task.completed ? "Completed" : "Pending"}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Created:</span>
                            <span className="detail-value">{formatDate(task.createdAt)}</span>
                        </div>
                    </div>
                )}
                {!isEmpty && (
                    <TaskEditForm task={task} onTaskUpdated={onTaskUpdated} />
                )}
            </div>
        </div>
    );
}

export default TaskSlide;
