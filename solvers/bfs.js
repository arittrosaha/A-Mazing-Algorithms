import { draw } from '../setup/grid.js';

export default function bfsSolve(maze) {
  const bfsSolButton = document.getElementById('bfs-sol');
  bfsSolButton.disabled = true;

  const dfsSolButton = document.getElementById('dfs-sol');
  dfsSolButton.disabled = true;

  const dfsGenButton = document.getElementById('dfs-gen');
  dfsGenButton.disabled = true;

  draw(maze);

  const queue = [];
  const exploredPaths = [];
  let targetFound = false;
  let color = 'green';
  let neighbours;
  let nextPaths;

  let current = maze[0];
  current.explored = true;

  const interval =  setInterval( () => {

    current.highlight(color);
    current.show(color);

    if (exploredPaths.length > 0){
      exploredPaths.forEach( () => {
        exploredPaths.pop().show(color);
      });
    }

    if (targetFound === false) {
       neighbours = current.neighbours("explored");
       nextPaths = selectNeighbour(current, neighbours);
    }

    if (nextPaths && targetFound === false) {
      for (let i = 0; i < nextPaths.length; i++) {
        nextPaths[i].highlight('yellow');
        nextPaths[i].explored = true;
        if (nextPaths[i].target === true){
          targetFound = true;
          color = 'blue';
          nextPaths[i].highlight('lightskyblue');
          nextPaths[i].show('lightskyblue');
          current = nextPaths[i];
          break;
        } else {
          exploredPaths.push(nextPaths[i]);
          queue.push(nextPaths[i]);
        }
      }
    }

    if (targetFound === false) {
      current = queue.shift();
    }

    if (targetFound === true) {
      current = current.parent;
      current.highlight('yellow');
    }


    if (current === maze[0]) {
      clearInterval(interval);
      dfsGenButton.disabled = false;
      bfsSolButton.disabled = false;
      dfsSolButton.disabled = false;
    }
  }, 1);
}

function selectNeighbour (current, neighbours) {
  const walls = current.walls;
  const nextPaths = [];

  neighbours.forEach( neighbour => {
    const x = current.i - neighbour.i;
    const y = current.j - neighbour.j;

    if (x === -1 && !walls[1]) {
      nextPaths.push(neighbour);
    } else if (x === 1 && !walls[3]) {
      nextPaths.push(neighbour);
    }

    if (y === -1 && !walls[2]) {
      nextPaths.push(neighbour);
    } else if (y === 1 && !walls[0]) {
      nextPaths.push(neighbour);
    }
  });

  return nextPaths;
}
