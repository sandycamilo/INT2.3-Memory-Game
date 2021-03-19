import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Title from './Title'
import Game from './Game'


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Title} />
        <Route path="/game" component={Game} />
      </div>
    </Router>
  );
}

export default App;
