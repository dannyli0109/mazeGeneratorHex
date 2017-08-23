
var board = []
var initialCell
var offsets = [[+1,+0], [+0,+1], [-1,+1], [-1,+0], [+0,-1], [+1,-1]]
var stack = [];
var called = false;
var boardSize = 5;
var initialCoordinate = [-boardSize,boardSize]
var i = 0;
var frameCount = 0;
var perDisplayFrame = 3;
var entry

var cellSize = 30
var w = cellSize * 2
var h = w * 3/4




function initBoard() {
  for (var j = -boardSize; j <= boardSize; j++) {
    for (var i = -boardSize; i <= boardSize; i++) {
      if (Math.abs(i + j) <= boardSize) {
        board.push(new Cell(i, j, cellSize))
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
  rectMode(CENTER)
  var canvas = createCanvas(601,601)
  initBoard()
  initialCell = getCell(board, initialCoordinate)
  var entryCell = getCell(board, [-boardSize,0])
  entryCell.forceBreakWall(2)
  var exitCell = getCell(board, [boardSize,0])
  exitCell.forceBreakWall(0)
  background(255)
  initialCell.recursiveBackTracker()
  canvas.parent("game-container")

}

function draw() {
  if (i >= board.length) {
    noLoop()
    return;
  }

  if (frameCount % perDisplayFrame == 0) {
    if (board[i].i == -boardSize && board[i].j == 0) {
      fill(0,255,100)
    } else if (board[i].i == boardSize && board[i].j == 0){
      fill(255,0,100)
    } else {
      noFill()
    }
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
