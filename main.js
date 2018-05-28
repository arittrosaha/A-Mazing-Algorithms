// import setupGrid from './grid.js';
import dfsGen from './generators/dfs.js';
import dfsSolve from './solvers/dfs.js';

document.addEventListener('DOMContentLoaded', () => {
  const maze = dfsGen(20, dfsSolve);
});
