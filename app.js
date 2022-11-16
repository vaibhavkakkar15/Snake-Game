// let canvas = document.querySelector("canvas");
// let ctx = canvas.getContext("2d"); //it will give u  brush or tools u want to use to draw

/*----------------------------------------------------------------*/

// ctx.fillStyle = "red"; //change color of brush
// ctx.fillRect(100, 100, 50, 50); //x,y co-ordinate  and width and height

//change color of boundry
// ctx.strokeStyle = "red";
//hum chah rhe ha iske andr bs boundry boundry rhe
// ctx.strokeRect(100, 100, 50, 50); //stroke means outlining

/*----------------------------------------------------------------*/
// ctx.beginPath();

//mera brush uthao or ek particular point pe le jao
// ctx.moveTo(150, 150); //jha mei kha hun
// ctx.lineTo(350, 350); //it's my new move to
// ctx.lineTo(0, 350); //it's my new move to
// ctx.lineTo(150, 150); //it's my new move to
// ctx.stroke();//draw outlining
// ctx.closePath();
/*----------------------------------------------------------------*/

// ctx.font = "40px sans-serif";
// ctx.fillStyle = "red";
// ctx.fillText("Vaibhav", 200, 200);

/*----------------------------------------------------------------*/

//real snake game above was all logic

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let cellSize = 50;
let snakeBoard = [[0, 0]]; //atleast 1 length is necessary//starting point
let direction = "right";
let GameOver = false;
let boardWidth = 1000;
let boardHeight = 600;
let foodGen = gernateFood();
let score = 0;

//moving snake with keys
document.addEventListener("keydown", function (e) {
  // console.log(e);
  if (e.key === "ArrowLeft") direction = "left";
  else if (e.key === "ArrowUp") direction = "UP";
  else if (e.key === "ArrowDown") direction = "down";
  else direction = "right";
});

function draw() {
  if (GameOver == true) {
    clearInterval(GameOver);
    ctx.font = "60px sans-serif";
    ctx.fillStyle = "red";
    ctx.fillText("Game Over !!", 100, 100);
    return;
  }

  //bnane ke phele erase krege
  ctx.clearRect(0, 0, 1000, 600);
  for (let cell of snakeBoard) {
    ctx.fillStyle = "red";
    ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
  }

  //food gernation
  ctx.fillStyle = "blue";
  ctx.fillRect(foodGen[0], foodGen[1], cellSize, cellSize);

  //score board
  ctx.font = "20px sans-serif";
  ctx.fillText(`score: ${score}`, 20, 20);
}

function update() {
  let headX = snakeBoard[snakeBoard.length - 1][0];
  let headY = snakeBoard[snakeBoard.length - 1][1];

  let newHeadX;
  let newHeadY;

  if (direction === "right") {
    newHeadX = headX + cellSize; //snake move further
    newHeadY = headY;
    if (newHeadX === 1000) {
      GameOver = true;
    }
  } else if (direction === "down") {
    newHeadX = headX; //snake move further
    newHeadY = headY + cellSize;
    if (newHeadY === 600) {
      GameOver = true;
    }
  } else if (direction === "left") {
    newHeadX = headX - cellSize; //snake move further
    newHeadY = headY;
    if (newHeadX < 0) {
      GameOver = true;
    }
  } else {
    newHeadX = headX;
    newHeadY = headY - cellSize;
    if (newHeadY < 0) GameOver = true;
  }
  /*----------------------------------------------------------------*/

  snakeBoard.push([newHeadX, newHeadY]);

  /*----------------------------------------------------------------*/

  //agr food kha liya
  if (newHeadX === foodGen[0] && newHeadY === foodGen[1]) {
    foodGen = gernateFood();
    score++;
  } else {
    //ek add kiya since usne khana ni kiya uski length bdh jati so piche wala nikal diya
    snakeBoard.shift(); //age se ek co-ordinate nikal diya
  }
}

function gernateFood() {
  //return index of random co-ordinate
  return [
    Math.round((Math.random() * (boardWidth - cellSize)) / cellSize) * cellSize,
    Math.round((Math.random() * (boardHeight - cellSize)) / cellSize) *
      cellSize,
  ];
}

setInterval(function () {
  update();
  draw();
}, 150);
