import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import TaskList from './components/TaskList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <TaskList />
      </div>
      
    </>
  )
}

export default App
