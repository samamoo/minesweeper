import React, { useState, useEffect, useRef } from 'react';
// Components
import FlagCounter from './FlagCounter';
import Timer from './Timer';
import Cell from './Cell';
// Helpers
import { makeGrid, checkEmpties, checkWin } from '../helpers/helpers';
// Styles
import './index.css';

export default function Board() {
  const [ time, setTime ] = useState(0);
  const [ flagCount, setFlagCount ] = useState(40);
  const [ board, setBoard ] = useState([]); 
  const [ gameOver, setGameOver ] = useState(false);
  const [ level, setLevel ] = useState("med");

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
    generateBoard(16, 16, 40);
  },[]);

  // Create the board and set state of the board
  const generateBoard = (rows, cols, bombs) => {
    let grid = makeGrid(rows, cols, bombs);
    setBoard(grid);
  }

  const resetBoard = () => {
    generateBoard(16, 16, 40);
    setGameOver(false);
    setTime(0);
    setFlagCount(40);
  }

  // Select a Cell / On Left Click
  const selectCell = (data) => {
    if (data.value === "bomb") {
      console.log("GAME OVER")
      setGameOver(true);
      // Trigger popup 
    }
    let updateState = board;
    if (updateState[data.x][data.y].flagged === true) {
      updateState[data.x][data.y].flagged = false;
      setFlagCount(flagCount+1)
    }
    if (updateState[data.x][data.y].value === 0) {
      const newBoard = checkEmpties(board, data.x, data.y);
      updateState = newBoard;
    }
    // If all cells that are NOT bombs are revealed, the game is won
    //  (rows*cols)-bombs = num of tiles that must be selected

    updateState[data.x][data.y].selected = true;
    setBoard(updateState);
    if (checkWin(updateState)) {
      console.log("WINNER WINNER CHICKEN DINNER")
    }
  }
  
  // Flag a Cell / On Right Click
  const flagCell = (e, data) => {
    e.preventDefault();
    let updateState = board;
    if (updateState[data.x][data.y].flagged === true) {
      updateState[data.x][data.y].flagged = false;
      setFlagCount(flagCount+1)
    } else {
      updateState[data.x][data.y].flagged = true;
      setFlagCount(flagCount-1)
    }
    setBoard(updateState)
  }

  const selectLevel = (e) => {
    console.log(e.target.value)
    if (e.target.value === "easy") {
      setTime(0);
      setLevel("easy");
      setFlagCount(15);
      generateBoard( 10, 10, 15);
    }
    if (e.target.value === "med") {
      setTime(0);
      setLevel("med");
      setFlagCount(40);
      generateBoard(16, 16, 40);
    }
  }

  if (!board) {
    return(
      <div>LOADING...</div>
    )
  }
  
  return( board &&
    <div className="board">
      <header className="board-header">
        <form>
          <select name="level" id="level" onChange={(e) => selectLevel(e)}>
            <option value="easy">Easy</option>
            <option value="med" selected="selected">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </form>

        
        <FlagCounter flagCount={flagCount}/>
        <Timer time={time}/>
        <button className="new-game-button" type="button" onClick={() => resetBoard()}>New Game</button>
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