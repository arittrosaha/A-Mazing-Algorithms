/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./generators/dfs.js":
/*!***************************!*\
  !*** ./generators/dfs.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dfsGen; });
/* harmony import */ var _solvers_dfs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../solvers/dfs.js */ "./solvers/dfs.js");
/* harmony import */ var _solvers_bfs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../solvers/bfs.js */ "./solvers/bfs.js");




function dfsGen (grid, width) {
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
        Object(_solvers_dfs_js__WEBPACK_IMPORTED_MODULE_0__["default"])(grid);
      };

      bfsSolButton.disabled = false;
      bfsSolButton.onclick = function() {
        Object(_solvers_bfs_js__WEBPACK_IMPORTED_MODULE_1__["default"])(grid);
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


/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _generators_dfs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generators/dfs.js */ "./generators/dfs.js");
/* harmony import */ var _setup_grid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setup/grid.js */ "./setup/grid.js");
// import setupGrid from './grid.js';



document.addEventListener('DOMContentLoaded', () => {

  const initGrid = new _setup_grid_js__WEBPACK_IMPORTED_MODULE_1__["SetupGrid"](10);

  const dfsGenButton = document.getElementById('dfs-gen');
  let maze;
  dfsGenButton.onclick = function() {
    const grid = new _setup_grid_js__WEBPACK_IMPORTED_MODULE_1__["SetupGrid"](10);
    Object(_generators_dfs_js__WEBPACK_IMPORTED_MODULE_0__["default"])(grid, 10);
  };
});


/***/ }),

/***/ "./setup/cell.js":
/*!***********************!*\
  !*** ./setup/cell.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cell; });
function Cell(i, j, w, ctx, grid, cols, rows) {
  this.i = i;
  this.j = j;
  this.visited = false;
  this.explored = false;
  this.walls = [true, true, true, true];
  this.target = false;
  this.parent = null;

  this.highlight = function(color) {
    const x  = this.i*w;
    const y = this.j*w;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, w);
  };

  this.neighbours = function(status) {
    const neighbours = [];

    const top = grid[index(i, j-1, cols, rows)];
    const right = grid[index(i+1, j, cols, rows)];
    const bottom = grid[index(i, j+1, cols, rows)];
    const left = grid[index(i-1, j, cols, rows)];

    const cells = [top,right,bottom,left];

    cells.forEach( cell => {
      if (cell && status === 'visited'){
        if (!cell.visited) {
          neighbours.push(cell);
        }
      } else if (cell && status === 'explored'){
        if (!cell.explored) {
          neighbours.push(cell);
        }
      }
    });

    return neighbours;
  };

  this.show = function(color) {
    const x  = this.i*w;
    const y = this.j*w;


    buildWalls(x, y, w, ctx, this.walls);

    if (this.visited && !this.explored) {
      ctx.fillStyle = 'red';
      ctx.fillRect(x, y, w, w);
      buildWalls(x, y, w, ctx, this.walls);
    }

    if (this.explored) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, w);
      buildWalls(x, y, w, ctx, this.walls);
    }
  };
}

function index (i, j, cols, rows) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + (j * cols);
}

function buildWalls(x, y, w, ctx, walls){

  const wallfunc = [topWall, rightWall, bottomWall, leftWall];

  [0,1,2,3].forEach(i=>{
    if (walls[i]){
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      wallfunc[i](x, y, w, ctx);
    }
  });

}

function topWall(x, y, w, ctx) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x+w, y);
  ctx.stroke();

}

function rightWall(x, y, w, ctx){
  ctx.beginPath();
  ctx.moveTo(x+w, y);
  ctx.lineTo(x+w, y+w);
  ctx.stroke();

}

function bottomWall(x, y, w, ctx){
  ctx.beginPath();
  ctx.moveTo(x+w, (y+w));
  ctx.lineTo(x, (y+w));
  ctx.stroke();

}

function leftWall(x, y, w, ctx){
  ctx.beginPath();
  ctx.moveTo(x, y+w);
  ctx.lineTo(x, y);
  ctx.stroke();

}


/***/ }),

/***/ "./setup/grid.js":
/*!***********************!*\
  !*** ./setup/grid.js ***!
  \***********************/
/*! exports provided: SetupGrid, draw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SetupGrid", function() { return SetupGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "draw", function() { return draw; });
/* harmony import */ var _cell_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell.js */ "./setup/cell.js");



function SetupGrid(width) {
  this.mC = document.getElementById('myCanvas');
  this.ctx = this.mC.getContext("2d");
  this.cWidth = this.mC.width;
  this.cHeight = this.mC.height;

  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0,0, this.cWidth, this.cHeight);

  this.cols = Math.floor(this.cWidth/width);
  this.rows = Math.floor(this.cHeight/width);
  const grid = [];

  for (let j = 0; j < this.rows; j++) {
    for (let i = 0; i < this.cols; i++) {
      const cell = new _cell_js__WEBPACK_IMPORTED_MODULE_0__["default"](i, j, width, this.ctx, grid, this.cols, this.rows);
      grid.push(cell);
    }
  }

  draw(grid);
  return grid;
}

function draw (grid) {
  for (let i = 0; i < grid.length; i++) {
    grid[i].explored = false;
    grid[i].show();
    if (grid[i].target === true) {
      grid[i].highlight('lightskyblue');
    }
  }

}


/***/ }),

/***/ "./solvers/bfs.js":
/*!************************!*\
  !*** ./solvers/bfs.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return bfsSolve; });
/* harmony import */ var _setup_grid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../setup/grid.js */ "./setup/grid.js");


function bfsSolve(maze) {
  const bfsSolButton = document.getElementById('bfs-sol');
  bfsSolButton.disabled = true;

  const dfsSolButton = document.getElementById('dfs-sol');
  dfsSolButton.disabled = true;

  const dfsGenButton = document.getElementById('dfs-gen');
  dfsGenButton.disabled = true;

  Object(_setup_grid_js__WEBPACK_IMPORTED_MODULE_0__["draw"])(maze);

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


/***/ }),

/***/ "./solvers/dfs.js":
/*!************************!*\
  !*** ./solvers/dfs.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return dfsSolve; });
/* harmony import */ var _setup_grid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../setup/grid.js */ "./setup/grid.js");


function dfsSolve(maze) {
  const dfsSolButton = document.getElementById('dfs-sol');
  dfsSolButton.disabled = true;

  const dfsGenButton = document.getElementById('dfs-gen');
  dfsGenButton.disabled = true;

  const bfsSolButton = document.getElementById('bfs-sol');
  bfsSolButton.disabled = true;

  Object(_setup_grid_js__WEBPACK_IMPORTED_MODULE_0__["draw"])(maze);

  const stack = [];
  let targetFound = false;
  let color = 'green';
  let neighbours;
  let next;

  let current = maze[0];
  current.explored = true;

  const interval =  setInterval( () => {
    current.show(color);

    if (current.target === true){
      targetFound = true;
      color = 'blue';
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
      current.show(color);
      next.highlight('yellow');
      current = next;
    } else if (stack.length > 0){
      current = stack.pop();
      current.highlight('yellow');
      current.show("yellow");
    }

    if (current === maze[0]) {
      clearInterval(interval);
      dfsGenButton.disabled = false;
      dfsSolButton.disabled = false;
      bfsSolButton.disabled = false;
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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map