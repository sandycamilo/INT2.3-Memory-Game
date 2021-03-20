import React from 'react'
import './Game.css'
import Button from '../Button/Button'

function Game() {
  return (
    <div class="pattern-buttons">
      <div class="pattern-title">
        {/* <div class="gameButtonArea"> */}
          <button id="startGame">
            Start
          </button>
          <button id="stopGame">
            Stop
          </button>
        {/* </div> */}
        <Button />
      </div>
    </div>
  )
}

export default Game