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


    var board = gameItem('#board');
    var snake = gameItem('#snake');
    var food = gameItem('#food'); 

    var snakeDirection = 'down';

    snakeInitialize();
    foodInitialize();
    setState('Play');

    var gameState;
    var gameOverMenu = $('#gameOver');
    var againBtn; 

    var scoreCount = $('#scoreCount');
   // var score = $('#score');
    /*----------------------------------------------------------------------------------
    *Game Functions
    *-----------------------------------------------------------------------------------
    */

    function gameLoop(){
        drawScore();
        if(gameState == 'Play'){
            snakeUpdate();
            snakeDraw();
            foodDraw();
        }
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
        obj.width =  $(id).width();
        obj.height =  $(id).height();
        return obj;
    }

/*----------------------------------------------------------------------------------
*Snake Functions
*-----------------------------------------------------------------------------------
*/

    function snakeInitialize(){
        snake = [];
        snakeLength = 1;
        
        for(var i = snakeLength - 1; i >= 0; i--){
        snake.push({
            x: i,
            y: 0
        });
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

        if (snakeDirection == 'left'){
            snakeHeadX++;
        }
        else if(snakeDirection == 'up'){
            snakeHeadY++;
        }
        else if (snakeDirection == 'right'){
            snakeHeadX++;
        }
        else if (snakeDirection == 'down'){
            snakeHeadY++;
        }
        
        checkWallCollision(snakeHeadX, snakeHeadY);
        checkFoodCollision(snakeHeadX, snakeHeadY);
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
    var KEY = {
        "Left": 37,
        "Up": 38,
        "Right": 39,
        "Down": 40
    };

    function handleKeyDown(event) {
    if (event.which === KEY.Left  && snakeDirection !='right') {
            snakeDirection = 'left';
    }
    else if (event.which === KEY.Up && snakeDirection !='down') {
            snakeDirection = 'up';
    }  
        
    else if (event.which === KEY.Right && snakeDirection !='left') {
            snakeDirection = 'right';
    } 
        
    else if (event.which === KEY.Down && snakeDirection !='up') {
            snakeDirection = 'down';
    }  
    } 


/*----------------------------------------------------------------------------------
*Food Functions
*-----------------------------------------------------------------------------------
*/

    function foodInitialize(){
        food = $('#food').css("left", food.x),
        $('#food').css("top", food.y);
        
        setFoodPosition();
    }

    function foodDraw(){
        //$('#food').css('background-color', 'red');
        $('#food').css("left", food.x , food.width);
        $('#food').css("top", food.y , food.height);
    }

    function setFoodPosition () {
        var randomX = Math.floor(Math.random() * board.width);
        var randomY = Math.floor(Math.random() * board.height);

        food.x = Math.floor(randomX / snake.width);
        food.y = Math.floor(randomY / snake.height);
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
            console.log('out');
        }
        if (snakeHeadY < Bounds.Top) {
            $('#snakeHead').css("background-color", "red");
            setState('Game Over');
            console.log('out');
        } 
        if (snakeHeadX > Bounds.Right) {
            $('#snakeHead').css("background-color", "red");
            setState('Game Over');
            console.log('out');
        } 
        if (snakeHeadY > Bounds.Bottom) {
            $('#snakeHead').css("background-color", "red");
            setState('Game Over');
            console.log('out');
        }
        if (snakeHeadX > Bounds.Left && snakeHeadY > Bounds.Top && snakeHeadX < Bounds.Right && snakeHeadY < Bounds.Bottom) {
            $('#snakeHead').css("background-color", "green");
            console.log('in');
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

    /*----------------------------------------------------------------------------------
    *Menu functions
    *-----------------------------------------------------------------------------------
    */
    function setState(state){
        gameState = state;
        showMenu(state);
    }

    function displayMenu(){
        $("#gameOver").css('visibility', 'visible');
    }

    function button(){
        againBtn = $('#againBtn');
        againBtn.addEventListener('click', playAgain);
    }

    function hideMenu(){
        $("#gameOver").css('visibility', 'hidden');
        button();
    }

    function showMenu(state){
        if(state == 'Game OVer'){
            displayMenu(gameOver);    
        }
        else if(state == 'Play'){
            displayMenu(scoreCount);
        }
    }

    function drawScore(){
        $('#score').html( '🍎: ' + snakeLength); 
    }

    function endGame() {
        // stop the interval timer
        clearInterval(interval);

        // turn off event handlers
        $(document).off();
    }
}

