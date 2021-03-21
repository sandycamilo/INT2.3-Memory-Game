import React from 'react';
import './Button.css'

const Button = props => {
  return (
    <div className="pattern_buttons">
      <div class="pattern_one">
      <button class="game_buttons" id="one" onMouseDown="startColor()" onMouseU="stopColor()"></button>
      <button class="game_buttons" id="two" onMouseDown="startColor()" onMouseU="stopColor()"></button>
      <button class="game_buttons" id="three" onMouseDown="startColor()" onMouseU="stopColor()"></button>
      </div>
      <div class="pattern_two">
      <button class="game_buttons" id="four" onMouseDown="startColor()" onMouseU="stopColor()"></button>
      <button class="game_buttons" id="five" onMouseDown="startColor()" onMouseU="stopColor()"></button>
      <button class="game_buttons" id="six" onMouseDown="startColor()" onMouseU="stopColor()"></button>
      </div>
    </div>
  );
};

export default Button



