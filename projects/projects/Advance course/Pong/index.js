/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
/*function startMenu () {
    var strt = document.getElementById("startBtn");
   
    strt.addEventListener("click",runProgram); // when start botton is clicked start the game
    hideStartMenu();
}

function hideStartMenu() {
    $("#startMenu").css('visibility', 'hidden');
}
*/


function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
  var boardWidth = $("#board").width();
  var boardHeight = $("#board").height();
 
    //Inputs
   const KEY2 = {
     "Up": 38,
     "Down": 40,
  };
  const KEY1 = {
      "Up": 87,
      "Down": 83,
  };
  //Other vars
  var speedUp = 1.2;
  var playerOne = 0;
  var playerTwo = 0;
  var scoreToWin = 11;
  var $gameOverMenu;
  var $again;

  
  // Game Item Objects
  function gameItem (id) {
    var obj = {};
    obj.id = id;
    obj.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
    obj.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
    obj.width = $(id).width(); 
    obj.height = $(id).height();
    obj.speedX = 0;
    obj.speedY = 0;
    return obj;
}
    var ballObj = gameItem("#ball");
    var leftPaddleObj = gameItem("#leftPaddle");
    var rightPaddleObj = gameItem("#rightPaddle");
  
    // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown)
  $(document).on('keyup', handleKeyUp)                           // change 'eventType' to the type of event you want to handle

  ballObj.speedX = 3;
  ballObj.speedY = 2;
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    //Paddle 
    repositionPaddles();
    bounds(leftPaddleObj);
    bounds(rightPaddleObj);
    //Ball 
    repositionBall();
    //colision
    DoCollide(leftPaddleObj, ballObj);
    DoCollide(rightPaddleObj, ballObj);
    bounce(ballObj);
    increasePoints(ballObj);
    //score
    drawScore();
    //Handle endGame
    gameOver();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
  if (event.which === KEY1.Up) {
       leftPaddleObj.speedY -= 10;
  }
  else if (event.which === KEY1.Down) {
       leftPaddleObj.speedY += 10;
  }  
    
  else if (event.which === KEY2.Up) {
      rightPaddleObj.speedY -= 10;
  } 
    
  else if (event.which === KEY2.Down) {
      rightPaddleObj.speedY += 10;
  }  
}

// when key is not being pressed
function handleKeyUp(event) {
  if (event.which === KEY1.Up) {
      leftPaddleObj.speedY = 0;
  }
  
  else if (event.which === KEY1.Down) {
      leftPaddleObj.speedY = 0;
  }
  
  else if (event.which === KEY2.Up) {
      rightPaddleObj.speedY = 0;
  }
  
  else if (event.which === KEY2.Down) {
      rightPaddleObj.speedY = 0;
  }
}

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

   //repositions  paddle
 function repositionPaddles() {
    //paddles
    $(leftPaddleObj.id).css("top", leftPaddleObj.y);
    $(rightPaddleObj.id).css("top", rightPaddleObj.y);
    
    leftPaddleObj.x += leftPaddleObj.speedX;
    leftPaddleObj.y += leftPaddleObj.speedY;
    rightPaddleObj.x += rightPaddleObj.speedX;
    rightPaddleObj.y += rightPaddleObj.speedY;
}

 //repositions  ball
 function repositionBall()
 {
    //ball
    $("#ball").css("top", ballObj.y)
    $("#ball").css("left", ballObj.x)
    
    ballObj.y += ballObj.speedY;
    ballObj.x += ballObj.speedX;
 }
  
 //detects for collisions
 function DoCollide(object1, object2)
 {
    //paddle1
    object1.right = object1.x + object1.width;
    object1.botom = object1.y + object1.height;
    object1.left = object1.x;
    object1.top = object1.y;
    
    //paddle2
    object2.right = object2.x + object2.width;
    object2.botom = object2.y + object2.height;
    object2.left = object2.x;
    object2.top = object2.y;

    
     if (object1.right > object2.left && object1.left < object2.right && object1.top <object2.botom && object1.botom > object2.top)
    {
        console.log("HIT");
        ballObj.speedY = ballObj.speedY * speedUp;
        ballObj.speedX = ballObj.speedX * speedUp;
        ballObj.speedX = -ballObj.speedX;
       //ballObj.speedY = -ballObj.speedY;
        
        
    }
 }

function bounce(ball)
 {
    if(ball.y < 1 || ball.y > boardHeight)
    {
        ballObj.speedY = -ballObj.speedY;
    }
    
 }
//Handles paddle boundrys
 function bounds(paddles)
 {
    if(paddles.y > 465)
    {
        paddles.y = 465;
    }
    if(paddles.y < 1)
    {
        paddles.y = 1;
    }
 }
 //reposition paddle and ball pos
 function reposition()
 {
    leftPaddleObj.x = 20;
    leftPaddleObj.y = 251;
    rightPaddleObj.x = 970;
    rightPaddleObj.y = 251;
    ballObj.speedX = -1;
    ballObj.speedY = -1;
    ballObj.x = 450;
    ballObj.y = 251;
    console.log("New Game");
 }
 //increase points
 function increasePoints(obj)
 {
    if(obj.x > boardWidth)
    {
        playerOne ++;
        reposition();
    }
    if(obj.x < 1)
    {  
        playerTwo ++;
        reposition();
    }
 }
function againBtn (){
$again = $('#againBtn');
$('#againBtn').on('click', playAgain);
}

function playAgain (){
    runProgram();
    reposition();
    hideGameOver();
}

function drawScore(){
    $('#playerOne').html( playerOne) ;
   $('#playerTwo').html( playerTwo) ;
}
 
function displayGameOver() {
     $gameOverMenu = $('#gameOver');
     $("#gameOver").css('visibility', 'visible');
     againBtn();
 }
 function hideGameOver(){
     $("#gameOver").css('visibility', 'hidden');
 }
 //ends game
 function gameOver()
 {
    if(playerOne === scoreToWin ||  playerTwo === scoreToWin)
    {
       displayGameOver();
        endGame();
    }
 }
  
 function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  
  }
}