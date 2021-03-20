import React from 'react'
import '../App.css'
import './Home.css'
import { NavLink } from 'react-router-dom'
import logo from './memory.png';
import logo_two from './game.png'

function howToPlayButton() {
  alert("Repeat back the pattern based on the sounds you hear and the colors you see :)");
}

function Title() {
  return (
    <div className="Title">
      <div class="app-header">
        <div class="title">
        <img src={logo} alt="Logo" />
        <img src={logo_two} alt="Logo" />
        </div>
        <div class="home-buttons">
          <button class="instructions" onClick={howToPlayButton}>
          <p>instructions</p>
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

export default Title