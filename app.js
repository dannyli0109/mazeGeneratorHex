
var board = []
var initialCell
var offsets = [[+1,+0], [+0,+1], [-1,+1], [-1,+0], [+0,-1], [+1,-1]]
var stack = [];
var called = false;
var boardSize = 7;
var initialCoordinate = [-boardSize,boardSize]
var i = 0;
var frameCount = 0;
var perDisplayFrame = 5;



function initBoard() {
  for (var j = -boardSize; j <= boardSize; j++) {
    for (var i = -boardSize; i <= boardSize; i++) {
      if (Math.abs(i + j) <= boardSize) {
        board.push(new Cell(i, j, 20))
      }
    }
  }
  for (var i = 0; i < board.length; i++) {
    board[i].getNeighbours()
  }

}

function getCell(board, coordinate) {
  for (var i = 0; i < board.length; i++) {
    if (board[i].i == coordinate[0] && board[i].j == coordinate[1]) {
      return board[i]
    }
  }
  return undefined;
}

function setup() {
  createCanvas(800,800)
  initBoard()
  initialCell = getCell(board, initialCoordinate)
  background(255)

  initialCell.recursiveBackTracker()

}

function draw() {
  if (i >= board.length) {
    noLoop()
    return;
  }

  if (frameCount % perDisplayFrame == 0) {
    board[i].display()
    i++;
  }
  frameCount ++;
}

function keyPressed() {
  if (keyCode == 13) {
    save()
  }
}
