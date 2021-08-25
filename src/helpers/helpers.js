// Build a board with set rows and columns
const makeGrid = (rows, cols) => {
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
  while (bombCount < 40) {
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
  console.log(arr)
  return arr;
}

const checkEmpties = (board, x, y) => {
  // Given the coordinates of the selected cell
  // Check surrounding cells of that coordinate
  let rows = board.length;
  let cols = board[0].length;
  for (let i = 0; i < rows; i++) {
    for (let k = 0; k < cols; k++) {
      if (i > 0 && board[x-1][y].value === 0) {
        board[x-1][y].selected = true;
      }
      if (i > 0 && k < cols - 1 && board[x-1][y+1].value === 0) {
        board[x-1][y+1].selected = true;
      }
      if (i > 0 && k > 0 && board[x-1][y-1].value === 0) {
        board[x-1][y-1].selected = true;
      }
      if (k < cols - 1 && board[x][y+1].value === 0) {
        board[x][y+1].selected = true;
      }
      if (k > 0 && board[x][y-1].value === 0) {
        board[x][y-1].selected = true;
      }
      if (i < rows - 1 && board[x+1][y].value === 0) {
        board[x+1][y].selected = true;
      }
      if (i < rows - 1 && k < cols - 1 && board[x+1][y+1].value === 0) {
        board[x+1][y+1].selected = true;
      }
      if (i < rows - 1 && k > 0 && board[x+1][y-1].value === 0) {
        board[x+1][y-1].selected = true;
      }
      // working except when you click the first and last row and first and last column...
    }
  }
  console.log(board)
  return board;
}

export { makeGrid, checkEmpties }

  // Not checking row === 0 because as long as the row < rows-1, you will always be able to check the row+1 / the row below it.
  // Must check if col > 0 so that you are able to check the tile on the left

  // Need to change the values of cells that surround a bomb
  // Loop through board arrays to find location of "bomb"s
  // Check if surrounding tiles are bombs, else increase the value.
  // [x-1][y-1].value++ / [x-1][y].value++ / [x-1][y+1].value++
  // [x][y+1].value++ / [x][y-1].value++
  // [x+1][y-1].value++ / [x+1][y].value++ / [x+1][y+1].value++
  // if [x] === 0, only check current row and [x+1]
  // if [x] === rows-1, only check current row and [x-1]


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