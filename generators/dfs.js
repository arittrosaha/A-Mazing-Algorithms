import dfsSolve from '../solvers/dfs.js';
import bfsSolve from '../solvers/bfs.js';


export default function dfsGen (grid, width) {
  const dfsGenButton = document.getElementById('dfs-gen');
  dfsGenButton.disabled = true;

  const dfsSolButton = document.getElementById('dfs-sol');
  dfsSolButton.disabled = true;

  const bfsSolButton = document.getElementById('bfs-sol');
  bfsSolButton.disabled = true;


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
      next.parent = current;
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
      grid[targetIdx].show('lightskyblue');
      grid[targetIdx].highlight('lightskyblue');

      dfsSolButton.disabled = false;
      dfsSolButton.onclick = function() {
        dfsSolve(grid);
      };

      bfsSolButton.disabled = false;
      bfsSolButton.onclick = function() {
        bfsSolve(grid);
      };

      dfsGenButton.disabled = false;
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
