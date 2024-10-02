import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

// Components
import Home from './components/Home'
import Character from './components/Character';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/characters/:id" element={<Character />}/>
          <Route exact path="/planets/:id" element={<Planet />}/>
          <Route exact path="/films/:id" element={<Films />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
