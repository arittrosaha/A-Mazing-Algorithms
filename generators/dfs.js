import SetupGrid from '../setup/grid.js';

export default function dfsGen (width, callback) {
  const grid = new SetupGrid(width);
  const stack = [];

  const mC = document.getElementById('myCanvas');
  const cWidth = mC.width;

  const cols = Math.floor(cWidth/width);

  let current = grid[0];
  current.highlight('yellow');
  current.visited = true;
  const interval =  setInterval( () => {
    current.show();

    const neighbours = current.neighbours("visited");
    const next = selectNeighbour(neighbours);
    if (next) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next);
      current.show();
      next.show();
      next.highlight('yellow');
      current = next;
    } else if (stack.length > 0){
      current = stack.pop();
      current.highlight('yellow');
    }

    if (current === grid[0]) {
      clearInterval(interval);
      current.show();

      const min = grid.length-cols;
      const max = grid.length-1;
      const targetIdx = getRandomIntInclusive(min, max);
      grid[targetIdx].target = true;
      grid[targetIdx].show('orange');
      grid[targetIdx].highlight('orange');

      callback(grid);
    }
  }, 1);
}

function selectNeighbour (neighbours) {
  if (neighbours.length > 0) {
    const random = getRandomIntInclusive(0, neighbours.length-1); 
    return neighbours[random];
  }
}

function removeWalls(c, n) {
  const x = c.i - n.i;
  const y = c.j - n.j;

  if (x === -1) {
    c.walls[1] = false;
    n.walls[3] = false;
  } else if (x === 1) {
    c.walls[3] = false;
    n.walls[1] = false;
  }

  if (y === -1) {
    c.walls[2] = false;
    n.walls[0] = false;
  } else if (y === 1) {
    c.walls[0] = false;
    n.walls[2] = false;
  }

}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
