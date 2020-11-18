/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()


//Run all the functions
function runProgram(){
  
/*----------------------------------------------------------------------------------
 *Variables
 * ---------------------------------------------------------------------------------
 */

var interval = setInterval(gameLoop, 1000/30);
$(document).on('keydown', handleKeyDown); 

var snake = gameItem('#snake');
var food = gameItem('#food'); 
var board = gameItem('#baord');

var gameState;
var gameOverMenu = document.getElementById('#gameOver');
var againBtn = document.getElementById('#againBtn');
againBtn.addEventListener('click', playAgain );

var scoreCount = document.getElementById('#scoreCount');
var score = document.getElementById('#score');
/*----------------------------------------------------------------------------------
*Game Functions
*-----------------------------------------------------------------------------------
*/

function gameLoop(){
    drawScore();
    if(setState == "Play"){
        snakeInitialize();
        foodInitialize();
        snakeUpdate();
        snakeDraw();
        foodDraw();
}
setState('Play');
}

function playAgain(){
    snakeInitialize();
    foodInitialize();
    hideMenu(gameOverMenu);
    setState('Play');
}


function gameItem (id) {
    var obj = {};
    obj.id = id;
    obj.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
    obj.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
    obj.width =  $(id).height();
    obj.height =  $(id).height();
    obj.speedX = 0;
    obj.speedY = 0;
    return obj;
}

/*----------------------------------------------------------------------------------
*Snake Functions
*-----------------------------------------------------------------------------------
*/

function snakeInitialize(){
    snake = [];
    snakeLength = 1;
    for(var i = snakelength - 1; i >= 0; i--){
    snake.push(
    snake.x, snake.y
    );
  }
}

function snakeDraw(){
    for(var i = 0; i < snake.length; i++){
        $('#snake').css('background-color', 'green');
        $('#snake').css("left", snake[i].x * snake.width);
        $('#snake').css("top", snake[i].y * snake.height);
    }
}

function snakeUpdate(){
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    //snakeHeadX++;
    checkFoodCollision(snakeHeadX, snakeHeadY);
    checkWallCollision(snakeHeadX, snakeHeadY);
    snakeCollision(snakeHeadX, snakeHeadY);
    
    var snakeTail = snake.pop(); //Remove the last element of an array//
        snakeTail.x = snakeHeadX;
        snakeTail.y = snakeHeadY;
        snake.unshift(snakeTail);
}

/*----------------------------------------------------------------------------------
*Key functions
*-----------------------------------------------------------------------------------
*/

function handleKeyDown(event) {
  if (event.which === KEY.Left  && !snakeHeadX) {
        snakeHeadX--;
  }
  else if (event.which === KEY.Up && !snakeHeadY) {
        snakeHeadY--;
  }  
    
  else if (event.which === KEY.Right && !snakeHeadX) {
       snakeHeadX++;
  } 
    
  else if (event.which === KEY.Down && !snakeHeadY) {
      snakeHeadY++;
 }  
} 


/*----------------------------------------------------------------------------------
*Food Functions
*-----------------------------------------------------------------------------------
*/

function foodInitialize(){
    food = food.x, food.y;
    setFoodPosition();
}

function foodDraw(){
    $('#food').css('background-color', 'red');
    $('#food').css("left", food.x , food.width);
    $('#food').css("top", food.y , fodd.height);
}

function setFoodPosition () {
    var randomX = Math.floor(Math.random() * board.width);
    var randomY = Math.floor(Math.random() * board.height);

    food.x = randomX;
    food.y = randomY;
}

/*----------------------------------------------------------------------------------
*Collisions functions
*-----------------------------------------------------------------------------------
*/

function checkFoodCollision(snakeHeadX, snakeHeadY){
    if(snakeHeadX == food.x && snakeHeadY == food.y) {
        snakeInitialize();
        setFoodPosition();
        snakeLength++;
}

function checkWallCollision(snakeHeadX, snakeHeadY){
    var Bounds = {
    "Top": 0,
    "Left": 0,
    "Bottom": $("#board").height() ,
    "Right": $("#board").width() ,
    }
    if (snakeHeadX < Bounds.Left ){
        $('#snakeHead').css("background-color", "red");
        setState('Game Over');
    }
    if (snakeHeadY < Bounds.Top) {
        $('#snakeHead').css("background-color", "red");
        setState('Game Over');
    } 
    if (snakeHeadX > Bounds.Right) {
        $('#snakeHead').css("background-color", "red");
        setState('Game Over');
    } 
    if (snakeHeadY > Bounds.Bottom) {
        $('#snakeHead').css("background-color", "red");
        setState('Game Over');
    }
    if (snakeHeadX > Bounds.Left && snakeHeadY > Bounds.Top && snakeHeadX < Bounds.Right && snakeHeadY < Bounds.Bottom) {
        $('#snakeHead').css("background-color", "green");
    }
}
function snakeCollision(snakeHeadX, snakeHeadY){
    for(var i = 1; i < snake.length ; i++){
        if(snakeHeadX == snake[i].x && snakeHeadY == snake[i].y){
            setState('Game Over');
            break;
        }
    }
}
}

/*----------------------------------------------------------------------------------
*Menu functions
*-----------------------------------------------------------------------------------
*/
function setState(state){
    gameState = state;
    showMenu(state);
}

function displayMenu (menu){
    $("#gameOver").css('visibility', 'visible');
}

function hideMenu(menu){
   $("#gameOver").css('visibility', 'hidden'); 
}

function showMenu(state){
    if(state == 'Game OVer'){
    displayMenu(gameOver);    
}
else if(state == 'Play'){
    displayMenu(scoreCount);
}

function drawScore(){
    score.innerHTML= '🍎: ' + snakeLength;
}
}
}