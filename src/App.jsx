import React, { useState, useEffect, useRef } from 'react'
import FlashcardList from './FlashcardList'
import './App.css'
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [reload, setReload] = useState(false)
  const [taskName, setTaskName] = useState('')


  const handleMessage = () => {
    setReload(!reload)
  }

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/')
      .then(res => {
        setFlashcards(res.data)
      })
  }, [reload])

  const handleAdd = (event) => {
    event.preventDefault()
    console.log('handleSubmit: ' + taskName)
    axios.post(`http://127.0.0.1:8000/api/`, { title: taskName })
      .then(response => {
        // Handle successful delete, e.g., update UI
        console.log("successful Add: id:" + response.data['id'] + ", title: " + response.data['title'])
      })
      .catch(error => {
        console.error('Error Add:', error)
      })
    // clear the text box
    setTaskName('')
    // Reload the component
    setReload(!reload)
  }

  return (
    <>
      <form className="header" onSubmit={handleAdd}>
        <div className="form-group">
          <input type='text' placeholder='Add task name' 
          value={taskName} 
          onChange={(e) => { setTaskName(e.target.value) }} />
        </div>
        <div className="form-group">
          <button className="btn" type='submit'>Add Task</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} callback={handleMessage} />
      </div>
    </>
  )
}

export default App;