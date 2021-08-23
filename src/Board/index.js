import React, { useState, useEffect } from 'react';
// Components
import BombCounter from './BombCounter';
import Timer from './Timer';
// Helpers
import { makeGrid } from '../helpers/helpers';
// Styles
import './index.css';

export default function Board() {
  const [ time, setTime ] = useState(0);
  const [ bombCount, setBombCount ] = useState(40);
  const [ board, setBoard ] = useState([]); 

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev +1)
    }, 1000);
  },[]);

  useEffect(() => {
    generateBoard();
  },[]);

  const generateBoard = () => {
    let grid = makeGrid(16, 16);
    setBoard(grid);
  }
  
  return(
    <div className="board">
      <header className="board-header">
        <BombCounter bombCount={bombCount}/>
        <Timer time={time}/>
        {/* Settings Component */}
        {/* Level Selection Component */}
      </header>
      <div className="board-container">
        {/* Generate Cells */}
      </div>
    </div>
  )
}