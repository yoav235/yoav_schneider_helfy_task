import React from "react";
import "./TaskSlide.css";

function TaskSlide({ task, isEmpty }) {
    return (
        <div className="carousel-slide">
            <div className="task-card">
                <h2>{task.title}</h2>
                {task.description && <p>{task.description}</p>}
                {task.priority !== "low" && !isEmpty && (
                    <span className={`priority ${task.priority}`}>
                        {task.priority}
                    </span>
                )}
                {!isEmpty && (
                    <div className={`status ${task.completed ? "completed" : "pending"}`}>
                        {task.completed ? "✓" : "○"}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskSlide;
