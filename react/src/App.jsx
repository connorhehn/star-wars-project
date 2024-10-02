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
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/characters" element={<Character />}/>

        </Routes>
      </Router>
    </>
  )
}

export default App
