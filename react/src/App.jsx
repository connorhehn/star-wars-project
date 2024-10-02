import { useState, useEffect } from 'react'
import './App.css'
import Home from './components/Home'
import Character from './components/Character';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";


function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/characters")
      .then(res => res.json())
      .then(data => setCharacters(data))
      .catch(err => console.error(err));
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home data={characters}/>}/>
          <Route exact path="/characters" element={<Character />}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
