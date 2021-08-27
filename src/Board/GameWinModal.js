import React from 'react';
import './GameOverModal.css';

export default function GameWinModal(props) {
  return(
    <div className="game-over">
      <div className="game-over-message">
        <h1>YOU WIN!</h1>
        <h4>You dodged all of the doo-doo!</h4>
        <h4>Your time is {props.time} seconds!</h4>
      </div>
      <div className="game-buttons">
        <button className="cancel-button" type="button" onClick={props.closeWinModal}>Cancel</button>
        <button className="new-game-button" type="button" onClick={() => props.resetBoard(props.level)}>Start New Game</button>
      </div>
    </div>
  )
}