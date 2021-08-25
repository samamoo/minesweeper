import React, { useState, useEffect, useRef } from 'react';
// Components
import FlagCounter from './FlagCounter';
import Timer from './Timer';
import Cell from './Cell';
// Helpers
import { makeGrid, checkEmpties } from '../helpers/helpers';
// Styles
import './index.css';

export default function Board() {
  const [ time, setTime ] = useState(0);
  const [ flagCount, setFlagCount ] = useState(40);
  const [ board, setBoard ] = useState([]); 
  const [gameOver, setGameOver] = useState(false);

  // Start the timer on page load
  let timer = useRef(null);
  useEffect(() => {
    if (!gameOver) {
      startTimer();
    }
    return () => clearInterval(timer.current);
  },[gameOver]);

  const startTimer = () => {
    timer.current = setInterval(() => {
      setTime((prev) => prev +1)
    }, 1000); 
  }

  // Create a new board on page load
  useEffect(() => {
    generateBoard();
  },[]);

  // Create the board and set state of the board
  const generateBoard = () => {
    let grid = makeGrid(16, 16);
    setBoard(grid);
  }

  console.log(gameOver);
  // Select a Cell / On Left Click
  const selectCell = (data) => {
    if (data.value === "bomb") {
      console.log("GAME OVER")
      setGameOver(true);
      // Stop the clock
      // Trigger popup 
    }
    let updateState = board;
    if (updateState[data.x][data.y].flagged === true) {
      updateState[data.x][data.y].flagged = false;
      setFlagCount(flagCount+1)
    }
    // Check if cell.value === 0 and reveal all adjacent 0 cells
    if (updateState[data.x][data.y].value === 0) {
      const newBoard = checkEmpties(board, data.x, data.y);
      console.log(newBoard)
    }

    updateState[data.x][data.y].selected = true;
    setBoard(updateState)
  }
  
  // Flag a Cell / On Right Click
  const flagCell = (e, data) => {
    e.preventDefault();
    console.log("Flagged")
    let updateState = board;
    if (updateState[data.x][data.y].flagged === true) {
      updateState[data.x][data.y].flagged = false;
      setFlagCount(flagCount+1)
    } else {
      updateState[data.x][data.y].flagged = true;
      setFlagCount(flagCount-1)
    }
    setBoard(updateState)
    console.log(board)
  }

  if (!board) {
    return(
      <div>LOADING...</div>
    )
  }
  
  return( board &&
    <div className="board">
      <header className="board-header">
        <FlagCounter flagCount={flagCount}/>
        <Timer time={time}/>
        {/* Level Selection Component */}
        {/* Settings Component */}
      </header>

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
                selectCell={selectCell}
                flagCell={flagCell}
                />
              )
            })
          )
        })}
      </div>
    </div>
  )
}