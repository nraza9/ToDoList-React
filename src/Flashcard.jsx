import React, { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import axios from 'axios'


export default function Flashcard({ flashcard, callback }) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')


  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(setMaxHeight, [flashcard.title])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)

    //Following line will run when component is removed from UI
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  const handleDelete = (e) => {
    axios.delete(`http://127.0.0.1:8000/api/${e.target.id}/`)
      .then(response => {
        // Handle successful delete, e.g., update UI
        console.log(response)
        console.log("successful delete: " + response.data)
        callback()
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  }


  function doFlip(e) {
    console.log('doFlip');
    setFlip(!flip)
  };

  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
      //onClick={doFlip}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <span>{flashcard.title}</span>
        <button id={flashcard.id} onClick={handleDelete}>🗑️</button>
      </div>
      <div className="back" ref={backEl}>{flashcard.id}</div>
    </div>


  )
}