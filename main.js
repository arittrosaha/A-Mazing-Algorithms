// import setupGrid from './grid.js';
import dfsGen from './generators/dfs.js';
import {SetupGrid} from './setup/grid.js';

document.addEventListener('DOMContentLoaded', () => {

  const initGrid = new SetupGrid(10);

  const dfsGenButton = document.getElementById('dfs-gen');
  let maze;
  dfsGenButton.onclick = function() {
    const grid = new SetupGrid(10);
    dfsGen(grid, 10);
  };
});
