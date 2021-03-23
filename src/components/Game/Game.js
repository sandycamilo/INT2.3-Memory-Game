import React from 'react'
import './Game.css'
import Button from '../Button/Button'
import {startGame, stopGame} from '../Script'


function Game() { 
  return (
    <div className="pattern-buttons">
      <div className="pattern-title">
        <div className="gameButtonArea">
          <button id="startBtn" onClick={() => startGame()}>
            Start
          </button>
          <button className="hidden" id="stopBtn" onClick={() => stopGame()}>
            Stop
          </button>
        </div>
        <div className="pattern_one">
          <Button id="one" />
          <Button id="two" />
          <Button id="three" />
        </div>
        <div className="pattern_two">
          <Button id="four" />
          <Button id="five" />
          <Button id="six" />
        </div>
      </div>
    </div>
  )
}

export default Game