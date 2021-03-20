import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../components/Home/Home'
import Game from '../components/Game/Game'

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
      </div>
    </Router>
  );
}

export default App
