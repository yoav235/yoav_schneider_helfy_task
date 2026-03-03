import React, { useEffect, useState } from "react";
import { getAllTasks } from "../services/task_util";
import TaskSlide from "./TaskSlide";
import TaskForm from "./TaskForm";
import "./TaskList.css";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextId, setNextId] = useState(1);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date');

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

    const filteredTasks = tasks.filter(task => {
        const matchesFilter = 
            filter === 'completed' ? task.completed :
            filter === 'pending' ? !task.completed :
            true;
        
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesFilter && matchesSearch;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        switch (sortBy) {
            case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            case 'date':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'alphabetical':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    const displayTasks = sortedTasks.length === 0 
        ? [{ id: 0, title: "No tasks found", description: "", completed: false, priority: "low" }]
        : sortedTasks;

    const isEmpty = sortedTasks.length === 0;

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

    const handleTaskDeleted = () => {
        fetchTasks();
        if (currentIndex >= displayTasks.length - 1) {
            setCurrentIndex(Math.max(0, displayTasks.length - 2));
        }
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentIndex(0);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentIndex(0);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setCurrentIndex(0);
    };

    return (
        <div className="carousel-wrapper">
            <button className="carousel-arrow left" onClick={prevSlide}>
                ‹
            </button>
            <div className="carousel-section">
                <div className="header-section">
                    <h1 className="title">Task List</h1>
                    <TaskForm onTaskCreated={handleTaskCreated} nextId={nextId} />
                </div>
                <div className="search-sort-section">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search tasks by title..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <select 
                        className="sort-select"
                        value={sortBy}
                        onChange={handleSortChange}
                    >
                        <option value="date">Sort by Date</option>
                        <option value="priority">Sort by Priority</option>
                        <option value="alphabetical">Sort A-Z</option>
                    </select>
                </div>
                <div className="filter-section">
                    <button 
                        className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('all')}
                    >
                        All
                    </button>
                    <button 
                        className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('pending')}
                    >
                        Pending
                    </button>
                    <button 
                        className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('completed')}
                    >
                        Completed
                    </button>
                </div>
                <div className="carousel-container">
                    <div 
                        className="carousel-track" 
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                    {displayTasks.map((task, index) => (
                        <TaskSlide 
                            key={`${task.id}-${index}`} 
                            task={task} 
                            isEmpty={isEmpty} 
                            onTaskDeleted={handleTaskDeleted}
                            onTaskUpdated={fetchTasks}
                        />
                    ))}
                    </div>
                </div>
            </div>
            <button className="carousel-arrow right" onClick={nextSlide}>
                ›
            </button>
        </div>
    );
}

export default TaskList;