import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from './components/TaskList'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeToggle />
      <div>
        <TaskList />
      </div>
      
    </>
  )
}

export default App
