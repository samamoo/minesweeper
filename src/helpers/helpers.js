// Build a board with set rows and columns
const makeGrid = (rows, cols, bombs) => {
  let arr = [];
  let bombLocations = [];
  let bombCount = 0;
  // Create rows
  for (let x = 0; x < rows; x++) {
    let subArr = [];
    // For each col, create a cell with values in each row
    for (let y = 0; y < cols; y++) {
      subArr.push({
        selected: false, 
        value: 0,
        flagged: false,
        x: x,
        y: y,
      })
    }
    arr.push(subArr);
  }
  // Generate & save random xy coordinates for the 40 bombs
  while (bombCount < bombs) {
    let x = Math.floor(Math.random()*rows);
    let y = Math.floor(Math.random()*cols);
    if (arr[x][y].value === 0) {
      arr[x][y].value = "bomb";
      bombLocations.push([x,y]);
      bombCount++;
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // If the cell is a bomb, skip
      if (arr[row][col].value === "bomb") {
        continue;
      }
      // Cell above is a bomb
      if (row > 0 && arr[row-1][col].value === "bomb") {
        arr[row][col].value++;
      }
      // Cell above and to the right of the bomb
      if (row > 0 && col < cols-1 && arr[row-1][col+1].value === "bomb") {
        arr[row][col].value++;
      }
      // Cell above and to the left of the bomb
      if (row > 0 && col > 0 && arr[row-1][col-1].value === "bomb") {
        arr[row][col].value++;
      }
      // Cell to the right is a bomb
      if (col < cols-1 && arr[row][col+1].value === "bomb") {
        arr[row][col].value++;
      }
      // Cell to the left is a bomb
      if (col > 0 && arr[row][col-1].value === "bomb") {
        arr[row][col].value++;
      }
      // Cell below is a bomb
      if (row < rows-1 && arr[row+1][col].value === "bomb") {
        arr[row][col].value++;
      }
      // Cell below and to the right is bomb
      if (row < rows-1 && col < cols-1 && arr[row+1][col+1].value === "bomb") {
        arr[row][col].value++;
      }
      // Cell below and to the left is a bomb
      if (row < rows-1 && col > 0 && arr[row+1][col-1].value === "bomb") {
        arr[row][col].value++
      }
    }
  }
  return arr;
}

const checkBlanks = (board, x, y, newNonMinesCount) => {
  if (board[x][y].selected) {
    return board;
  }

  let flipped = [];
  flipped.push(board[x][y]);
  while (flipped.length !== 0) {
    let single = flipped.pop();
    if (!single.selected) {
      newNonMinesCount--;
      single.selected = true;
    }
    if (single.value !== 0) {
      break;
    }
    // Top Left
    if (single.x > 0 && single.y > 0 &&
      board[single.x-1][single.y-1].value === 0 &&
      !board[single.x-1][single.y-1].selected) 
      {
        flipped.push(board[single.x-1][single.y-1]);
      }
      // Top Right
    if (single.x < board.length-1 &&
      single.y < board[0].length-1 &&
      board[single.x+1][single.y+1].value === 0 &&
      !board[single.x+1][single.y+1].selected) 
      {
        flipped.push(board[single.x+1][single.y+1])
      }
      // Bottom Left
    if (single.x < board.length -1 &&
      single.y > 0 &&
      board[single.x+1][single.y-1].value === 0 && 
      !board[single.x+1][single.y-1].selected)
      {
        flipped.push(board[single.x+1][single.y-1])
      }
      // Bottom Right
    if (single.x > 0 &&
      single.y < board[0].length-1 &&
      board[single.x-1][single.y+1].value === 0 &&
      !board[single.x-1][single.y+1].selected)
      {
        flipped.push(board[single.x-1][single.y+1])
      }
      // Top
    if (single.x > 0 &&
      board[single.x-1][single.y].value === 0 &&
      !board[single.x-1][single.y].selected) 
      {
        flipped.push(board[single.x-1][single.y])
      } 
      // Bottom
    if (single.x < board.length-1 &&
      board[single.x+1][single.y].value === 0 &&
      !board[single.x+1][single.y].selected) 
      {
        flipped.push(board[single.x+1][single.y])
      }
      // Right
    if (single.y < board[0].length-1 &&
      board[single.x][single.y+1].value === 0 &&
      !board[single.x][single.y+1].selected) 
      {
        flipped.push(board[single.x][single.y+1])
      }
      // Left
    if (single.y > 0 &&
      board[single.x][single.y-1].value === 0 &&
      !board[single.x][single.y-1].selected) 
      {
        flipped.push(board[single.x][single.y-1])
      }
    
      // Reveal
      // Top Left
    if (single.x > 0 &&
      single.y > 0 &&
      !board[single.x-1][single.y-1].selected)
      {
        board[single.x-1][single.y-1].selected = true;
        newNonMinesCount--;
      }
      // Top
    if (single.x > 0 &&
      !board[single.x-1][single.y].selected) {
        board[single.x-1][single.y].selected = true;
        newNonMinesCount--;
      }
      // Top Right
    if (single.x > 0 &&
      single.y < board[0].length-1 &&
      !board[single.x-1][single.y+1].selected) {
        board[single.x-1][single.y+1].selected = true;
        newNonMinesCount--;
      }
      // Left
    if (single.y > 0 &&
      !board[single.x][single.y-1].selected) {
        board[single.x][single.y-1].selected = true;
        newNonMinesCount--;
      }
      // Right
    if (single.y < board[0].length-1 &&
      !board[single.x][single.y+1].selected) {
        board[single.x][single.y+1].selected = true;
        newNonMinesCount--;
      }
      // Bottom Left
    if (single.x < board.length-1 &&
      single.y > 0 &&
      !board[single.x+1][single.y-1].selected) {
        board[single.x+1][single.y-1].selected = true;
        newNonMinesCount--;
      }
      // Bottom
    if (single.x < board.length-1 &&
      !board[single.x+1][single.y].selected) {
        board[single.x+1][single.y].selected = true;
        newNonMinesCount--;
    }
      // Bottom Right
    if (single.x < board.length-1 &&
      single.y < board[0].length-1 &&
      !board[single.x+1][single.y+1].selected) {
        board[single.x+1][single.y+1].selected = true;
        newNonMinesCount--;
      }
  }
  return { board, newNonMinesCount}
}

const checkWin = (board, bombs) => {
  let rows = board.length;
  let cols = board[0].length;
  let toWin = (rows*cols)-bombs;
  let selectedCount = 0;
  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (board[x][y].selected === true && board[x][y].value !== "bomb") {
        selectedCount++;
      }
    }
  }
  if (selectedCount === toWin) {
    return true;
  }
  return false;
}

export { makeGrid, checkWin, checkBlanks }

// The game board
// [
//   [{cell},{cell},{cell},{cell},],
//   [{cell},{cell},{cell},{cell},],
//   [{cell},{cell},{cell},{cell},],
//   [{cell},{cell},{cell},{cell},],
// ]

// Each cell in a row has these values
// {
//   selected: false, 
//   value: 0,
//   flagged: false,
//   x: x,
//   y: y,
// }