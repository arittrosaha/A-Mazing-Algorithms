import Cell from './cell.js';


export function SetupGrid(width) {
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
      const cell = new Cell(i, j, width, this.ctx, grid, this.cols, this.rows);
      grid.push(cell);
    }
  }

  return grid;
}

export function draw (grid) {
  for (let i = 0; i < grid.length; i++) {
    grid[i].explored = false;
    grid[i].show();
    if (grid[i].target === true) {
      grid[i].highlight('lightskyblue');
    }
  }

}
