import React from 'react'
import './Game.css'
import Button from '../Button/Button'

function Game() {
  return (
    <div class="pattern-buttons">
      <div class="pattern-title">
        <div class="gameButtonArea">
          <button id="startBtn" onclick="startGame()">
            Start
          </button>
          <button class="hidden" id="stopBtn" nclick="stopGame()">
            Stop
          </button>
        </div>
        <Button />
      </div>
    </div>
  )
}

export default Game