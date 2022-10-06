const boardCells = document.querySelectorAll('[boardCell]')
const newGame = document.getElementById('newGame')
const vsPlayer = document.getElementById('vsPlayer')
let xTurn = true

// Array of arrays that define the different combinations of boxes for a win
const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

// Function that runs when a user selects new game
// Hides some css elements and adds event listeners board cells
// to listen for clicks and hover over
const startGame = () => {
  const winner = document.getElementById('winner')
  newGame.classList.add('hidden')
  winner.classList.add('hidden')
  boardCells.forEach(cell => {
    cell.classList.remove('xChecked')
    cell.classList.remove('oChecked')
    cell.removeEventListener('click', gameRound)
    cell.addEventListener('click', gameRound, {once:true})
    cell.addEventListener('mouseover', addHover)
  })
}

//Check if every board cell contains a class for x or o to determine if
// all cells have been selected
const checkForDraw = () => {
  return [...boardCells].every(cell => {
    return cell.classList.contains('xChecked') || cell.classList.contains('oChecked')
  })
}

// Check for who's turn it is, then add new x or o mark to the board cell
// then check if a player won, or if there is a draw, else change player's turn
const gameRound = (e) => {
  const cell = e.target
  const playerClass = xTurn ? 'xChecked' : 'oChecked'
  placePlayerClass(cell, playerClass)
  if (checkWin(playerClass)) {
    gameOver(false)
  } else if (checkForDraw()) {
    gameOver(true)
  } else {
    changePlayer()
  }
}

// Add new class to the board cell if selected by a player
const placePlayerClass = (cell, player) => {
  cell.classList.add(player)
}

// Change the player's turn
const changePlayer = () => {
  xTurn = !xTurn
}

// When hoving over the board cells, add the hover classes 
// so a gray x or o will show depending on player turn
const addHover = (e) => {
  const cell = e.target
  const cellClasses = cell.classList 
  cellClasses.remove('o')
  cellClasses.remove('x')
  if (cellClasses.contains('xChecked') || cellClasses.contains('oChecked')) {
    return
  } else if (xTurn) {
    cellClasses.add('x')
  } else {
    cellClasses.add('o')
  }
}

// Checks the current board cells against the winning combination array
// to determine if any of cells match the combination array passed
function checkWin(turn) {
	return winningCombinations.some(combination => {
		return combination.every(index => {
			return boardCells[index].classList.contains(turn)
		})
	})
}

// Checks if there was a draw or if a player won and 
// updates the html elements to show if it was a draw or who won
const gameOver = (draw) => {
  const winnerName = document.getElementById('winnerName')
  if (draw) {
    winnerName.innerText = 'Draw!'
  } else {
    winnerName.innerText = `Player ${xTurn ? '1' : '2'} won!`
  }
  newGame.classList.remove('hidden')
  winner.classList.remove('hidden')
}

// Runs function to start game when new game is clicked
vsPlayer.addEventListener('click', startGame)
