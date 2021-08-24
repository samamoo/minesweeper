import React, { useState, useEffect } from 'react';
// Components
import FlagCounter from './FlagCounter';
import Timer from './Timer';
import Cell from './Cell';
// Helpers
import { makeGrid } from '../helpers/helpers';
// Styles
import './index.css';

export default function Board() {
  const [ time, setTime ] = useState(0);
  const [ bombCount, setBombCount ] = useState(40);
  const [ board, setBoard ] = useState([]); 

  // Start the timer on page load
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev +1)
    }, 1000);
  },[]);

  // Create a new board on page load
  useEffect(() => {
    generateBoard();
  },[]);

  // Create the board and set state of the board
  const generateBoard = () => {
    let grid = makeGrid(16, 16);
    setBoard(grid);
  }

  if (!board) {
    return(
      <div>LOADING...</div>
    )
  }
  
  return( board &&
    <div className="board">
      <header className="board-header">
        <FlagCounter bombCount={bombCount}/>
        <Timer time={time}/>
        {/* Settings Component */}
        {/* Level Selection Component */}
      </header>

      <div className="board-container">
        {/* Generate Cells */}
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
                />
              )
            })
          )
        })}
      </div>
    </div>
  )
}