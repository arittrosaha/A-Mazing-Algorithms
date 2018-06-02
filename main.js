// import setupGrid from './grid.js';
import dfsGen from './generators/dfs.js';
import HumSolve from "./solvers/human.js";
import {SetupGrid} from './setup/grid.js';

document.addEventListener('DOMContentLoaded', () => {

  const easyButton = document.getElementById('easy');
  const mediumButton = document.getElementById('medium');
  const hardButton = document.getElementById('hard');

  easyButton.onclick = function() {
    const grid = new SetupGrid(50);
    dfsGen(grid, 50);
  };
  mediumButton.onclick = function() {
    const grid = new SetupGrid(20);
    dfsGen(grid, 20);
  };
  hardButton.onclick = function() {
    const grid = new SetupGrid(10);
    dfsGen(grid, 10);
  };
});
