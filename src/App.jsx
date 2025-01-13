import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './App.css'
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [reload, setReload] = useState(false)


  const handleMessage = () => {
    setReload(!reload)
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/')
      .then(res => {
        setFlashcards(res.data)
      })
  }, [reload])


  return (
    <>
      <div className="container">
        <FlashcardList flashcards={flashcards} callback={handleMessage} />
      </div>
    </>
  );
}

export default App;