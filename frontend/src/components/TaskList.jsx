import React, { useEffect, useState } from "react";
import { getAllTasks } from "../services/task_util";
import TaskSlide from "./TaskSlide";
import TaskForm from "./TaskForm";
import "./TaskList.css";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextId, setNextId] = useState(1);

    const fetchTasks = async () => {
        try {
            const data = await getAllTasks();
            setTasks(data);
            if (data.length > 0) {
                const maxId = Math.max(...data.map(task => task.id));
                setNextId(maxId + 1);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const displayTasks = tasks.length === 0 
        ? [{ id: 0, title: "Please add a task", description: "", completed: false, priority: "low" }]
        : tasks;

    const isEmpty = tasks.length === 0;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % displayTasks.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? displayTasks.length - 1 : prevIndex - 1
        );
    };

    const handleTaskCreated = () => {
        setNextId(nextId + 1);
        fetchTasks();
    };

    return (
        <div className="carousel-wrapper">
            <button className="carousel-arrow left" onClick={prevSlide}>
                ‹
            </button>
            <div className="carousel-container">
                <TaskForm onTaskCreated={handleTaskCreated} nextId={nextId} />
                <div 
                    className="carousel-track" 
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {displayTasks.map((task, index) => (
                        <TaskSlide key={`${task.id}-${index}`} task={task} isEmpty={isEmpty} />
                    ))}
                </div>
            </div>
            <button className="carousel-arrow right" onClick={nextSlide}>
                ›
            </button>
        </div>
    );
}

export default TaskList;