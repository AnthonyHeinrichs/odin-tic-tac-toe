const board = document.getElementById('playBoard')
const boardCells = document.querySelectorAll('[boardCell]')
const newGame = document.getElementById('newGame')
const winner = document.getElementById('winner')
const winnerName = document.getElementById('winnerName')
const vsPlayer = document.getElementById('vsPlayer')
const vsComputer = document.getElementById('vsComputer')
let xTurn = true


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

const startGame = () => {
  newGame.classList.add('hidden')
  winner.classList.add('hidden')
  boardCells.forEach(cell => {
    cell.classList.remove('xChecked')
    cell.classList.remove('oChecked')
    cell.removeEventListener('click', gameRound)
    cell.addEventListener('mouseover', addHover)
    cell.addEventListener('click', gameRound, {once:true})
  })
}

const gameRound = (e) => {
  const cell = e.target
  const playerClass = xTurn ? 'xChecked' : 'oChecked'
  placePlayerClass(cell, playerClass)
  changePlayer()
}

const placePlayerClass = (cell, player) => {
  cell.classList.add(player)
}

const changePlayer = () => {
  xTurn = !xTurn
}

const addHover = (e) => {
  const cell = e.target
  const cellClasses = cell.classList 
  if (cellClasses.contains('xChecked') || cellClasses.contains('oChecked')) {
    return
  } else if (xTurn) {
    cellClasses.add('x')
    cellClasses.remove('o')
  } else {
    cellClasses.add('o')
    cellClasses.remove('x')
  }
}

const handleCellHover = () => {
  if (xTurn) {
    boardCells.forEach(cell => {
      cell.classList.remove('o')
      cell.classList.add('x')
    })
  } else {
    boardCells.forEach(cell => {
      cell.classList.remove('x')
      cell.classList.add('o')
    })
  }
}

vsPlayer.addEventListener('click', startGame)

const gameOver = () => {
  board.classList.add('hidden')
}

