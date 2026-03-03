import React, { useEffect, useState } from "react";
import { getAllTasks, syncTasks } from "../services/task_util";
import TaskSlide from "./TaskSlide";
import TaskForm from "./TaskForm";
import "./TaskList.css";

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [nextId, setNextId] = useState(1);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [isTransitioning, setIsTransitioning] = useState(true);

    const fetchTasks = async () => {
        try {
            const data = await getAllTasks();
            setTasks(data);
            localStorage.setItem('tasks', JSON.stringify(data));
            if (data.length > 0) {
                const maxId = Math.max(...data.map(task => task.id));
                setNextId(maxId + 1);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        const initializeTasks = async () => {
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                try {
                    const parsedTasks = JSON.parse(savedTasks);
                    setTasks(parsedTasks);
                    
                    let calculatedNextId = 1;
                    if (parsedTasks.length > 0) {
                        const maxId = Math.max(...parsedTasks.map(task => task.id));
                        calculatedNextId = maxId + 1;
                        setNextId(calculatedNextId);
                    }
                    
                    // Sync localStorage tasks to backend
                    await syncTasks(parsedTasks, calculatedNextId);
                    console.log("Synced tasks from localStorage to backend");
                    
                    // Then fetch from backend to ensure consistency
                    fetchTasks();
                } catch (error) {
                    console.error("Error loading tasks from localStorage:", error);
                    fetchTasks();
                }
            } else {
                fetchTasks();
            }
        };
        
        initializeTasks();
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

    // Create infinite carousel by cloning first and last items
    let extendedTasks;
    if (sortedTasks.length === 0) {
        extendedTasks = [];
    } else if (sortedTasks.length === 1) {
        extendedTasks = [sortedTasks[0], sortedTasks[0], sortedTasks[0]];
    } else {
        extendedTasks = [sortedTasks[sortedTasks.length - 1], ...sortedTasks, sortedTasks[0]];
    }

    const nextSlide = () => {
        if (sortedTasks.length === 0) return;
        setIsTransitioning(true);
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const prevSlide = () => {
        if (sortedTasks.length === 0) return;
        setIsTransitioning(true);
        setCurrentIndex(prevIndex => prevIndex - 1);
    };

    // Handle infinite loop transition
    const handleTransitionEnd = () => {
        if (sortedTasks.length === 0) return;
        
        if (sortedTasks.length === 1) {
            // For single task, reset to middle position
            if (currentIndex === 0 || currentIndex === 2) {
                setIsTransitioning(false);
                setCurrentIndex(1);
            }
        } else {
            // For multiple tasks
            if (currentIndex === 0) {
                setIsTransitioning(false);
                setCurrentIndex(sortedTasks.length);
            } else if (currentIndex === sortedTasks.length + 1) {
                setIsTransitioning(false);
                setCurrentIndex(1);
            }
        }
    };

    const handleTaskCreated = () => {
        setNextId(nextId + 1);
        fetchTasks();
    };

    const handleTaskDeleted = () => {
        fetchTasks();
        // Reset to first actual slide after deletion
        setCurrentIndex(1);
    };

    const handleTaskUpdated = () => {
        fetchTasks();
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentIndex(1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentIndex(1);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setCurrentIndex(1);
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
                        style={{ 
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: isTransitioning ? 'transform 0.5s ease' : 'none'
                        }}
                        onTransitionEnd={handleTransitionEnd}
                    >
                    {sortedTasks.length === 0 ? (
                        <TaskSlide 
                            key="empty-slide" 
                            task={{ id: 0, title: "No tasks found", description: "", completed: false, priority: "low" }} 
                            isEmpty={true} 
                            onTaskDeleted={handleTaskDeleted}
                            onTaskUpdated={handleTaskUpdated}
                        />
                    ) : (
                        extendedTasks.map((task, index) => (
                            <TaskSlide 
                                key={`${task.id}-${index}`} 
                                task={task} 
                                isEmpty={false} 
                                onTaskDeleted={handleTaskDeleted}
                                onTaskUpdated={handleTaskUpdated}
                            />
                        ))
                    )}
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