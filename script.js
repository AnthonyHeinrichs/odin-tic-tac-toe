const board = document.getElementById('playBoard')
const boardCells = document.querySelectorAll('[boardCell]')
const newGame = document.getElementById('newGame')
const winner = document.getElementById('winner')
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
    cell.addEventListener('click', gameRound, {once:true})
    cell.addEventListener('mouseover', addHover)
  })
}

const checkForDraw = () => {
  return [...boardCells].every(cell => {
    return cell.classList.contains('xChecked') || cell.classList.contains('oChecked')
  })
}

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

const placePlayerClass = (cell, player) => {
  cell.classList.add(player)
  console.log(checkForDraw())
}

const changePlayer = () => {
  xTurn = !xTurn
}

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

function checkWin(turn) {
	return winningCombinations.some(combination => {
		return combination.every(index => {
			return boardCells[index].classList.contains(turn)
		})
	})
}

const gameOver = (draw) => {
  const winnerName = document.getElementById('winnerName')
  if (draw) {
    winnerName.innerText = 'Draw!'
  } else {
    winnerName.innerText = `Player ${xTurn ? 'one' : 'two'} won!`
  }
  newGame.classList.remove('hidden')
  winner.classList.remove('hidden')
}

