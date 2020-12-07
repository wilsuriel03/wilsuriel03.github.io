/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()


//Run all the functions
function runProgram(){
  
/*----------------------------------------------------------------------------------
 *Variables
 * ---------------------------------------------------------------------------------
 */

    var interval = setInterval(gameLoop, 1000/20);
    $(document).on('keydown', handleKeyDown); 


    var board = gameItem('#board');
    var snakeHead = gameItem('#snakeHead');
    var food = gameItem('#food'); 

    snakeInitialize();
    foodInitialize();
    setState('Play');
    

    var gameState;
    var gameOverMenu = document.getElementById('gameOver');
    var againBtn = document.getElementById('againBtn');
        againBtn.addEventListener('click', playAgain);; 

    var scoreCount = document.getElementById('scoreCount');

   
    
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
        obj.speedX = 0;
        obj.speedY = 0;
        return obj;
    }

/*----------------------------------------------------------------------------------
*Snake Functions
*-----------------------------------------------------------------------------------
*/

    function snakeInitialize(){
        snake = [snakeHead];
        snakeLength = 0;
    }

    function snakeDraw(){
       for(var i = 1; i < snake.length; i++){
        $(snake[i].bodyId).css("left",snake[i].x);
        $(snake[i].bodyId).css("top", snake[i].y);
       }
        $("#snakeHead").css("left",snake[0].x);
        $("#snakeHead").css("top", snake[0].y);
        
    }

    function snakeBodyDraw(){
        var bodyId = 'snakeBody' + (snake.length - 1);
        var $snakeBody = $("<div>").appendTo('#board').attr("id", bodyId).css("left", snake[0].x)
            .css("top", snake[0].y);
        
        $snakebody = gameItem('#snakeBody');
        snakeArray.push($snakeBody);
    }
    

    function snakeUpdate(){
       
        checkWallCollision();
        checkFoodCollision();
        snakeCollision();
        
        for (var i = snake.length - 1; i > 0; i--) {
            snake[i].x = snake[i - 1].x;
            snake[i].y = snake[i - 1].y;
        }
        snake[i].x += snakeHead.speedX;
        snake[i].y += snakeHead.speedY;
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
        if (event.which === KEY.Left && !snakeHead.speedX) {
            snakeHead.speedX = -20;
            snakeHead.speedY = 0;
        }
        else if (event.which === KEY.Up && !snakeHead.speedY) {
            snakeHead.speedX = 0;
            snakeHead.speedY = -20;
        }

        else if (event.which === KEY.Right && !snakeHead.speedX) {
            snakeHead.speedX = 20;
            snakeHead.speedY = 0;
        }

        else if (event.which === KEY.Down && !snakeHead.speedY) {
            snakeHead.speedX = 0;
            snakeHead.speedY = 20;
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

        food.x = Math.floor(randomX / snakeHead.width);
        food.y = Math.floor(randomY / snakeHead.height);
    }

/*----------------------------------------------------------------------------------
*Collisions functions
*-----------------------------------------------------------------------------------
*/

    function checkFoodCollision(){
        if(snakeHead.x == food.x && snakeHead.y == food.y) {
            snakeInitialize();
            setFoodPosition();
            snakeBodyDraw();
            snakeLength++;
        }
    }

    function checkWallCollision(){
        var Bounds = {
        "Top": 0,
        "Left": 0,
        "Bottom": $("#board").height() ,
        "Right": $("#board").width() ,
        }
        if (snakeHead.x < Bounds.Left ){
            $('#snakeHead').css("background-color", "red");
            setState('Game Over');
            console.log('out');
        }
        if (snakeHead.y < Bounds.Top) {
            $('#snakeHead').css("background-color", "red");
            setState('Game Over');
            console.log('out');
        } 
        if (snakeHead.x > Bounds.Right) {
            $('#snakeHead').css("background-color", "red");
            setState('Game Over');
            console.log('out');
        } 
        if (snakeHead.y > Bounds.Bottom) {
            $('#snakeHead').css("background-color", "red");
            setState('Game Over');
            console.log('out');
        }
        if (snakeHead.x > Bounds.Left && snakeHead.y > Bounds.Top && snakeHead.x < Bounds.Right && snakeHead.y < Bounds.Bottom) {
            $('#snakeHead').css("background-color", "green");
            console.log('in');
        }
    }
    function snakeCollision(){
        for(var i = 1; i < snake.length ; i++){
            if(snakeHead.x == snake[i].x && snakeHead.y == snake[i].y){
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

    function hideMenu(){
        $("#gameOver").css('visibility', 'hidden');
    }

    function showMenu(state){
        if(state == 'Game Over'){
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

