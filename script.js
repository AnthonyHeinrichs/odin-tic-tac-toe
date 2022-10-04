const board = document.getElementById('playBoard')
const boardCells = document.querySelectorAll('[board-cell]')
const newGame = document.getElementById('newGame')
const winner = document.getElementById('winner')
const winnerName = document.getElementById('winnerName')
const vsPlayer = document.getElementById('vsPlayer')
const vsComputer = document.getElementById('vsComputer')

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

