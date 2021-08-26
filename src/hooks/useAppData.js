import { useState, useEffect, useRef } from 'react';
import { makeGrid, checkEmpties, checkWin } from '../helpers/helpers';

export default function useAppData() {
  const [state, setState] = useState({
    level: "med",
    gameOver: false,
    flagCount: 40,
    board: [],
    startTimer: false,
    time: 0,
  });
  let timer = useRef(null);

  // Create a new board on page load
  useEffect(() => {
    generateBoard(16, 16, 40);
  },[]);

  // Start the clock
  const clockBegin = () => {
    timer.current = setInterval(() => {
      setState((prev) => ({...prev, time: state.time+1}))
    }, 1000); 
  };
  // Stop the clock
  const stopClock = () => {
    clearInterval(timer.current);
  };

  // Create the board and set state of the board
  const generateBoard = (rows, cols, bombs) => {
    let grid = makeGrid(rows, cols, bombs);
    setState({...state, board: grid});
  }

  // Reset the board and all state
  const resetBoard = (level) => {
    if (level === "med") {
      generateBoard(16, 16, 40);
      setState({...state, flagCount: 40, gameOver: false, startTimer: false, time: 0,})
    } else if (level === "easy") {
      generateBoard(10, 10, 15);
      setState({...state, flagCount: 15, gameOver: false, startTimer: false, time: 0,})
    }
    stopClock();
  }

  // Select level/difficulty
  const selectLevel = (e) => {
    if (e.target.value === "easy") {
      setState({...state, level: "easy", flagCount: 15, });
      generateBoard( 10, 10, 15);
      console.log(state)
    }
    if (e.target.value === "med") {
      setState({...state, level: "med", flagCount: 40, });
      generateBoard(16, 16, 40);
    }
    resetBoard(e.target.value);
  }

  // Flag a Cell / On Right Click
  const flagCell = (e, data) => {
    e.preventDefault();
    let updateState = state.board;
    if (updateState[data.x][data.y].flagged === true) {
      updateState[data.x][data.y].flagged = false;
      setState({...state, flagCount: state.flagCount+1})
    } else {
      updateState[data.x][data.y].flagged = true;
      setState({...state, flagCount: state.flagCount-1})
    }
    setState({...state, board: updateState});
  }

  // Select a Cell / On Left Click
  const selectCell = (data) => {
    if (!state.startTimer) {
      setState({...state, startTimer: true})
      clockBegin();
    }
    if (data.value === "bomb") {
      console.log("GAME OVER");
      setState({...state, gameOver: true})
      stopClock();
      // Trigger LOSE popup 
    }
    let updateState = state.board;
    if (updateState[data.x][data.y].flagged === true) {
      updateState[data.x][data.y].flagged = false;
      setState({...state, flagCount: state.flagCount+1})
    }
    if (updateState[data.x][data.y].value === 0) {
      const newBoard = checkEmpties(state.board, data.x, data.y);
      updateState = newBoard;
    }
    updateState[data.x][data.y].selected = true;
    setState({...state, board: updateState})
    if (data.level === "easy" && checkWin(updateState, 15)) {
      // Trigger WIN modal
      console.log("WINNER WINNER CHICKEN DINNER")
      stopClock();
    }
    if (data.level === "med" && checkWin(updateState, 40)) {
      // Trigger WIN modal
      console.log("WINNER WINNER CHICKEN DINNER")
      stopClock();
    }
  }

  return { state, selectLevel, resetBoard, flagCell, selectCell };
}