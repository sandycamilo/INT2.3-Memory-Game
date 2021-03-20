import React from 'react';
import './Button.css'

const a = <button class="game_buttons"></button>;
const Pattern = () => <div>{a}</div>;

const Button = props => {
  return (
    <div className="pattern_buttons">
      <div class="pattern_one">
        <Pattern />
        <Pattern />
        <Pattern />
      </div>
      <div class="pattern_two">
        <Pattern />
        <Pattern />
        <Pattern />
      </div>
    </div>
  );
};

export default Button



