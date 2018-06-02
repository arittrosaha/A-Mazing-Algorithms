import { draw } from '../setup/grid.js';

export default function HumSolve (maze) {

  draw(maze);

  let current = maze[0];
  let previousPath = [];
  let targetFound = false;

  current.highlight('yellow');
  current.explored = true;

  window.humanCallback = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    let newCurrent = null;
    switch (event.key) {
      case "ArrowDown":
        previousPath.push(current);
        newCurrent = selectNeighbour(current, event.key);
        if (newCurrent) {
          current = newCurrent;
          if (current.target === true) {
            targetFound = true;
            pathBack(current, window.humanCallback);
          }
          renderCurrent (current, previousPath);
        } else {
          document.removeEventListener('keydown', window.humanCallback);
          new HumSolve (maze);
        }
        break;
      case "ArrowUp":
        previousPath.push(current);
        newCurrent = selectNeighbour(current, event.key);
        if (newCurrent) {
          current = newCurrent;
          if (current.target === true) {
            targetFound = true;
            pathBack(current, window.humanCallback);
          }
          renderCurrent (current, previousPath);
        } else {
          document.removeEventListener('keydown', window.humanCallback);
          new HumSolve (maze);
        }
        break;
      case "ArrowLeft":
        previousPath.push(current);
        newCurrent = selectNeighbour(current, event.key);
        if (newCurrent) {
          current = newCurrent;
          if (current.target === true) {
            targetFound = true;
            pathBack(current, window.humanCallback);
          }
          renderCurrent (current, previousPath);
        } else {
          document.removeEventListener('keydown', window.humanCallback);
          new HumSolve (maze);
        }
        break;
      case "ArrowRight":
        previousPath.push(current);
        newCurrent = selectNeighbour(current, event.key);
        if (newCurrent) {
          current = newCurrent;
          if (current.target === true) {
            targetFound = true;
            pathBack(current, window.humanCallback);
          }
          renderCurrent (current, previousPath);
        } else {
          document.removeEventListener('keydown', window.humanCallback);
          new HumSolve (maze);
        }
        break;
      default:
        return;
    }

    event.preventDefault();
  };

  document.addEventListener("keydown", window.humanCallback);
}

function renderCurrent (current, previousPath) {
  if (current === undefined) {
    return;
  }
  renderPrevious (previousPath);
  current.explored = true;
  current.highlight('yellow');
}

function renderPrevious (previous) {
  if (previous.length > 0) {
    previous.pop().show("green");
  }
}

function pathBack (current, callback) {
  const interval = setInterval ( () => {
    current.highlight("blue");
    current.show("blue");

    if (current.target === true) {
      current.highlight('lightskyblue');
      current.show('lightskyblue');
    }
    current = current.parent;
    current.highlight('yellow');

    if (current.parent === null) {
      clearInterval(interval);
      document.removeEventListener('keydown', callback);
      console.log('removed');
    }
  }, 1);
}


function selectNeighbour (current, key) {
  const neighbours = current.neighbours('human');
  const walls = current.walls;
  const nextPaths = [null, null, null, null];

  neighbours.forEach( neighbour => {
    const x = current.i - neighbour.i;
    const y = current.j - neighbour.j;

    if (x === -1 && !walls[1]) {
      nextPaths[1] = neighbour;
    } else if (x === 1 && !walls[3]) {
      nextPaths[3] = neighbour;
    }

    if (y === -1 && !walls[2]) {
      nextPaths[2] = neighbour;
    } else if (y === 1 && !walls[0]) {
      nextPaths[0] = neighbour;
    }
  });

  switch (key) {
    case "ArrowUp":
      return nextPaths[0];
    case "ArrowRight":
      return nextPaths[1];
    case "ArrowDown":
      return nextPaths[2];
    case "ArrowLeft":
      return nextPaths[3];
    default:
      return;
  }
}



// document.addEventListener('keyup', function (event) {
//   if (event.defaultPrevented) {
//       return;
//   }
//
//   var key = event.key || event.keyCode;
//
//   if (key === 'Escape' || key === 'Esc' || key === 27) {
//       doWhateverYouWantNowThatYourKeyWasHit();
//   }
// });
