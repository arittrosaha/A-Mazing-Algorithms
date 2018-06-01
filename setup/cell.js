export default function Cell(i, j, w, ctx, grid, cols, rows) {
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
