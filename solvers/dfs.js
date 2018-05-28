
export default function dfsSolve(maze) {
  const stack = [];
  let targetFound = false;
  let color = 'lightgreen';
  let neighbours;
  let next;

  let current = maze[0];
  current.explored = true;
  const interval =  setInterval( () => {
    current.show(color);

    if (current.target === true){
      targetFound = true;
      color = 'green';
      current.highlight('lightskyblue');
      current.show('lightskyblue');
    }

    if (targetFound === false) {
       neighbours = current.neighbours("explored");
       next = selectNeighbour(current, neighbours);
    }

    if (next && !next.explored) {
      next.explored = true;
      stack.push(current);
      current.show('lightgreen');
      next.highlight('yellow');
      current = next;
    } else if (stack.length > 0){
      current = stack.pop();
      current.highlight('yellow');
      current.show("yellow");
    }

    if (current === maze[0]) {
      clearInterval(interval);
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

  const random = getRandomIntInclusive(0, nextPaths.length-1);
  return nextPaths[random];
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
