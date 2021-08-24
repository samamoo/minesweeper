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
      //  first row
      // If the cell is a bomb, skip
      if (arr[row][col].value === "bomb") {
        console.log("Continue")
        continue;
      }
      // Cell above is a bomb
      if (row > 0 && arr[row-1][col].value === "bomb") {
        arr[row][col].value++;
      }
      // Cell above and to the right of the bomb
      if (row > 0 && col < cols -1 && arr[row-1][col+1].value === "bomb") {
        arr[row][col].value++;
      }

    }
  }
  // Need to change the values of cells that surround a bomb
  // Loop through board arrays to find location of "bomb"s
  // Check if surrounding tiles are bombs, else increase the value.
  // [x-1][y-1].value++ / [x-1][y].value++ / [x-1][y+1].value++
  // [x][y+1].value++ / [x][y-1].value++
  // [x+1][y-1].value++ / [x+1][y].value++ / [x+1][y+1].value++
  // if [x] === 0, only check current row and [x+1]
  // if [x] === rows-1, only check current row and [x-1]

  console.log(arr)
  return arr;
}

export { makeGrid }

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