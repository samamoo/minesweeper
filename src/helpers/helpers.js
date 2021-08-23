const makeGrid = (rows, col) => {
  let arr = [];
  // Create rows
  for (let x = 0; x < rows; x++) {
    let subArr = [];
    // For each col, create a cell with values in each row
    for (let y = 0; y < col; y++) {
      subArr.push(y)
    }
    arr.push(subArr);
  }
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