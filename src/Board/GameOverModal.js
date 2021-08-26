import React from 'react';
import './GameOverModal.css';

export default function GameOverModal(props) {
  return(
    <div className="game-over">
      <div className="game-over-message">
        <h1>GAME OVER!</h1>
        <h4>You stepped in the doo-doo!</h4>
      </div>
      <div className="game-buttons">
        <button className="cancel-button" type="button" onClick={props.closeLoseModal}>Cancel</button>
        <button className="new-game-button" type="button" onClick={() => props.resetBoard(props.level)}>Start New Game</button>
      </div>
    </div>
  )
}