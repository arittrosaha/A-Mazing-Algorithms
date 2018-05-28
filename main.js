// import setupGrid from './grid.js';
import dfsGen from './generators/dfs.js';
import dfsSolve from './solvers/dfs.js';

document.addEventListener('DOMContentLoaded', () => {
  // const genPromise = new Promise(function(resolve, reject) {
  //   const maze = dfsGen(20);
  //   if (maze.length === 625) {
  //     resolve(maze);
  //   } else {
  //     reject("Something broke!");
  //   }
  // });
  //
  // genPromise.then( maze => {
  //   dfsSolve(maze);
  //   console.log(maze);
  // });

  const maze = dfsGen(10, dfsSolve);
});
