import Cell from './cell.js';


export default function SetupGrid(width) {
  this.mC = document.getElementById('myCanvas');
  this.ctx = this.mC.getContext("2d");
  this.cWidth = this.mC.width;
  this.cHeight = this.mC.height;

  this.cols = Math.floor(this.cWidth/width);
  this.rows = Math.floor(this.cHeight/width);
  const grid = [];

  for (let j = 0; j < this.rows; j++) {
    for (let i = 0; i < this.cols; i++) {
      const cell = new Cell(i, j, width, this.ctx, grid, this.cols, this.rows);
      grid.push(cell);
    }
  }

  draw(grid);
  return grid;
}

function draw (grid) {
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

}
