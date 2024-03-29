import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
// Components
import FlagCounter from './FlagCounter';
import Timer from './Timer';
import Cell from './Cell';
import LevelSelector from './LevelSelector';
import GameOverModal from './GameOverModal';
import GameWinModal from './GameWinModal';
// Helpers
import { makeGrid, checkWin, checkBlanks } from '../helpers/helpers';
// Styles
import './index.css';
Modal.setAppElement('div');

export default function Board() {
  const [ startTimer, setStartTimer ] = useState(false);
  const [ time, setTime ] = useState(0);
  const [ flagCount, setFlagCount ] = useState(40);
  const [ board, setBoard ] = useState([]); 
  const [ gameOver, setGameOver ] = useState(false);
  const [ level, setLevel ] = useState("med");
  const [ loseModal, setLoseModal ] = useState(false);
  const [ winModal, setWinModal ] = useState(false);
  let timer = useRef(null);

  // Open/Close GameOver modal
  const openLoseModal = () => {
    setLoseModal(true);
  }
  const closeLoseModal = () => {
    setLoseModal(false);
  }
  const openWinModal = () => {
    setWinModal(true);
  }
  const closeWinModal = () => {
    setWinModal(false);
  }

  // Create a new board on page load
  useEffect(() => {
    generateBoard(16, 16, 40);
  },[]);

  // Start the clock
  const clockBegin = () => {
    timer.current = setInterval(() => {
      setTime((prev) => prev +1)
    }, 1000); 
  }
  const stopClock = () => {
    clearInterval(timer.current);
  }

  // Create the board and set state of the board
  const generateBoard = (rows, cols, bombs) => {
    let grid = makeGrid(rows, cols, bombs);
    setBoard(grid);
  }

  // Reset the board and all state
  const resetBoard = (level) => {
    if (level === "med") {
      generateBoard(16, 16, 40);
      setFlagCount(40);
    } else if (level === "easy") {
      generateBoard(10, 10, 15);
      setFlagCount(15);
    }
    setGameOver(false);
    setTime(0);
    setStartTimer(false);
    stopClock();
    closeLoseModal();
    closeWinModal();
  }

  // Select a Cell / On Left Click
  const selectCell = (data) => {
    if (!startTimer) {
      setStartTimer(true);
      clockBegin();
    }
    if (data.value === "bomb") {
      console.log("GAME OVER");
      setGameOver(true);
      stopClock();
      openLoseModal();
    }
    let updateState = board;
    if (updateState[data.x][data.y].flagged === true) {
      updateState[data.x][data.y].flagged = false;
      setFlagCount(flagCount+1)
    }
    if (updateState[data.x][data.y].value === 0) {
      const newBoard = checkBlanks(board, data.x, data.y);
      updateState = newBoard.board;
    }
    updateState[data.x][data.y].selected = true;
    setBoard(updateState);
    if (data.level === "easy" && checkWin(updateState, 15)) {
      console.log("WINNER WINNER CHICKEN DINNER")
      stopClock();
      openWinModal();
    }
    if (data.level === "med" && checkWin(updateState, 40)) {
      console.log("WINNER WINNER CHICKEN DINNER")
      stopClock();
      openWinModal();
    }
  }
  
  // Flag a Cell / On Right Click
  const flagCell = (e, data) => {
    e.preventDefault();
    let updateState = JSON.parse(JSON.stringify(board));
    if (updateState[data.x][data.y].flagged === true) {
      updateState[data.x][data.y].flagged = false;
      setFlagCount(flagCount+1)
    } else {
      updateState[data.x][data.y].flagged = true;
      setFlagCount(flagCount-1)
    }
    setBoard(updateState)
  }

  // Select level/difficulty
  const selectLevel = (e) => {
    if (e.target.value === "easy") {
      setLevel("easy");
      setFlagCount(15);
      generateBoard( 10, 10, 15);
    }
    if (e.target.value === "med") {
      setLevel("med");
      setFlagCount(40);
      generateBoard(16, 16, 40);
    }
    resetBoard(e.target.value);
  }

  // If the board is not loaded, display Loading...
  if (!board) {
    return(
      <div>LOADING...</div>
    )
  }
  
  return( board &&
    <div className="board">
      <header className="board-header">
        <LevelSelector selectLevel={selectLevel}/>
        <FlagCounter flagCount={flagCount}/>
        <Timer time={time}/>
        <button className="new-game-button" type="button" onClick={() => resetBoard(level)}>New Game</button>
      </header>

      <Modal className="game-over-modal" overlayClassName="modal-overlay" isOpen={loseModal} onRequestClose={() => setLoseModal(false)}>
        <GameOverModal closeLoseModal={closeLoseModal} resetBoard={resetBoard} level={level}/>
      </Modal>
      <Modal className="game-over-modal" overlayClassName="modal-overlay" isOpen={winModal} onRequestClose={() => setWinModal(false)}>
        <GameWinModal closeWinModal={closeWinModal} resetBoard={resetBoard} level={level} time={time}/>
      </Modal>

      <div className="board-container">
        {board.map((val, key) => {
          return(
            val.map((value, key) => {
              return(
                <Cell 
                value={value.value}
                selected={value.selected}
                flagged={value.flagged}
                x={value.x}
                y={value.y}
                gameOver={gameOver}
                selectCell={selectCell}
                flagCell={flagCell}
                level={level}
                />
              )
            })
          )
        })}
      </div>
    </div>
  )
}