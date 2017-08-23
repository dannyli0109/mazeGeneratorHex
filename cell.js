

var Cell = function(i, j,size) {
  this.i = i;
  this.j = j;
  this.size = size;
  this.height = 2 * Math.sqrt(Math.pow(this.size,2) - Math.pow(this.size/2,2))
  this.x = 1.5 * i * this.size + 400;
  this.y = j * this.height + i * 0.5 * this.height + 400;
  this.coordinates = []
  this.walls = [true, true, true, true, true, true]
  this.visited = false
  this.neighbour = []
}


Cell.prototype.display = function() {
  stroke(0,0,0)
  strokeWeight(2)
  this.coordinates = []
  for (var i = 0; i < 6; i ++) {
    this.coordinates.push(this.hexCorner(i))
  }

  for (var i = 0; i < 6; i ++) {
    if (this.walls[i] == false) {
      continue;
    }
    line(
      this.coordinates[i % 6][0] - (2*w + 3*cellSize)/2,
      this.coordinates[i % 6][1] - 2.5*h,
      this.coordinates[(i + 1) % 6][0] - (2*w + 3*cellSize)/2,
      this.coordinates[(i + 1) % 6][1] - 2.5*h)
  }
  textAlign(CENTER)
  textSize(10)
  strokeWeight(1)
  text(this.i + ", " + this.j,this.x - (2*w + 3*cellSize)/2 ,this.y - 2.5*h)
}

Cell.prototype.hexCorner = function(index) {
  var angleDeg = 60*index
  var angleRad = PI/180 * angleDeg
  return [this.x + this.size * cos(angleRad), this.y + this.size * sin(angleRad)]
}

Cell.prototype.getNeighbours = function() {
  this.neighbour = []
  for (var i = 0; i < 6; i++) {
    this.neighbour.push(getCell(board, [this.i + offsets[i][0], this.j + offsets[i][1]]))
  }
}

Cell.prototype.breakWall = function(index) {
  var oppositeWallIndex = (index + 3) % 6
  if (this.neighbour[index] !== undefined) {
    this.walls[index] = false
    this.neighbour[index].walls[oppositeWallIndex] = false;
  }
}

Cell.prototype.forceBreakWall = function(index) {
  this.walls[index] = false
}

Cell.prototype.recursiveBackTracker = function() {
  this.visited = true;
  while (!board.every(cell => cell.visited == true)) {
    var neighboursToVisit = []
    var cellToVisit
    var randomIndex
    if (this.neighbour.some(function(element) {
      if (element != undefined) {
        if (element.visited == false) {
          return true;
        }
      }
      return false;

    })) {
      while (true) {
        randomIndex = Math.floor(Math.random() * this.neighbour.length)
        if (this.neighbour[randomIndex] !== undefined) {
          if (!this.neighbour[randomIndex].visited) {
            cellToVisit = neighboursToVisit[randomIndex]
            break;
          }
        }
      }

      stack.push(this)
      this.breakWall(randomIndex)
      this.neighbour[randomIndex].visited = true
      this.neighbour[randomIndex].recursiveBackTracker()
    } else if (stack.length > 0){
      stack.pop().recursiveBackTracker()
    }
  }
}
