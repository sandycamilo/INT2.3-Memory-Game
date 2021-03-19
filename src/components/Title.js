import React from 'react'
import './App.css' 
import Game from './Game'
import { NavLink } from 'react-router-dom'

function howToPlay() {
  alert("Repeat back the pattern based on the sounds you hear and the colors you see :)");
}

function Title() {
  return (
    <div className="Title">
      <div class="app-header">
        <div class="title">
          <p id="glow">memory game</p>
        </div>
        <div class="buttons">
          <button class="instructions" onClick={howToPlay}>
          <p>how to play?</p>
          </button>
        <NavLink to="/game">
          <button class="game">
            <p>let's play!</p>
          </button>
        </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Title;