/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
  var KEY1 = {
     "Up": 38,
     "Down": 40,
  }
  var KEY2 = {
      "Up": 87,
      "Down": 83,
  }
  // Game Item Objects
var BOARD_WIDTH = $('#board').width();
var BOARD_HEIGHT = $('#board').height();
var x = 100;
var y = 100;
var speedX = 0;
var speedY = 0;
var Score = 0;

function gameItem (id) {
    var obj = {};
    obj.id = id;
    obj.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
    obj.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
    obj.speedX = 0;
    obj.speedY = 0;
    return obj;
}

var ball = gameItem("#ball");
var leftPaddle = gameItem("#leftPaddle");
var rightPaddle = gameItem("#rightPaddle");

var playerOne = {};
playerOne.Score = 0;

var playerTwo = {};
playerTwo.score = 0;



  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleDownEvent);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleUpEvent);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    

  }
  
  /* 
  Called in response to events.
  */
  function handleDownEvent(event) {
if (event.which === KEY1.Up) {
      rightPaddle.speedY = 10;
      
    }
  else if (event.which === KEY1.Down) {
       rightPaddle.speedY -= 10;
       
    }
  else if (event.which === KEY2.Up) {
       leftPaddle.speedY += 10;
     
    }
  else if (event.which === KEY2.Down) {
       leftPaddle.speedY -= 10;
      
    }
}
function handleUpEvent(event) {
 if (event.which === KEY1.Up) {
      rightPaddle.speedY = 0;
     
    }
  else if (event.which === KEY1.Down) {
      rightPaddle.speedY= 0;
     
    }
  else if (event.which === KEY2.Up) {
      leftPaddle.speedY = 0;
      
    }
  else if (event.which === KEY2.Down) {
     leftPaddle.speedY = 0;
      
   }
}

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

/*function bounce () {       
    if (x > BOARD_WIDTH) {
        speedX = -speedX;
    }
    else if (y < 0) {
        speedX = -speedX;
    }
    else if (x > BOARD_HEIGHT) {
    speedX = -speedX;
    }
    else if (y < 0) {
    speedX = -speedX;  
    }

} */

function increasePoints ()  {
    // increase points
    score += 1;
    $('#board').text(score);
    $(score).css("color", "white");
    $(score).css("font-family", "Roboto", "sans-serif");
    $(score).css("font-size", "48px");
} 

