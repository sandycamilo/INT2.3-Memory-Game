import React from 'react';
import './Button.css'
import {guess, startTone, stopTone} from '../Script.js'

const Button = props => {
  return (
      <button
      id = {props.id}
      className="game_buttons"
      onClick={() => guess(props.id)}
      onMouseDown={() => startTone(props.id)}
      onMouseUp={() => stopTone()}
      >
      </button>
    );
  }


export default Button;



