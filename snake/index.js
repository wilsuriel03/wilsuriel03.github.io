/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
  const KEY = {
  "Left": 37,
  "Up": 38,
  "Right": 39,
  "Down": 40
};

var frameRate = 100;
  // Game Item Objects

  var Bounds = {
        "Top": 0,
        "Left": 0,
        "Bottom": $("#board").height() ,
        "Right": $("#board").width() ,
    }
  
  function gameItem (id) {
    var obj = {};
    obj.id = id;
    obj.x = Number($(id).css('left').replace(/[^-\d\.]/g, ''));
    obj.y = Number($(id).css('top').replace(/[^-\d\.]/g, ''));
    obj.speedX = 0;
    obj.speedY = 0;
    return obj;
}
 
  var snakeHead = gameItem('#snakeHead');
  var snakeTail = gameItem('#snakeTail');
  
  var apple = gameItem('#apple');
  
  var score = 0;

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleUpEvent);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    redrawGameItem();
    doCollide();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
  if (event.which === KEY.Left  && !snakeHead.speedX) {
        frameRate;
        snakeHead.speedX = -1;
        snakeHead.speedY = 0;
        
  }
  else if (event.which === KEY.Up && !snakeHead.speedY) {
        frameRate;
        snakeHead.speedX = 0;
        snakeHead.speedY = -1;
        
  }  
    
  else if (event.which === KEY.Right && !snakeHead.speedX) {
       frameRate;
       snakeHead.speedX = 1;
       snakeHead.speedY = 0;
       
  } 
    
  else if (event.which === KEY.Down && !snakeHead.speedY) {
      frameRate;
      snakeHead.speedX = 0;
      snakeHead.speedY = 1;
      
  }  
} 


//I dont think I will need a handdleUpEvent since the snake have to move smooth

function handleUpEvent(event) {
  if (event.which === KEY.Left) {
       snakeHead.speedX = 0;
       snakeHead.speedY = 0;
        
  }
  else if (event.which === KEY.Up ) {
       
       snakeHead.speedX = 0;
       snakeHead.speedY = 0;
    
  }  
    
  else if (event.which === KEY.Right ) {
      
     snakeHead.speedX = 0;
     snakeHead.speedY = 0;
    
  } 
    
  else if (event.which === KEY.Down ) {
      
     snakeHead.speedX = 0;
     snakeHead.speedY = 0;
    
  }  
} 



  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

 function redrawGameItem() {
        $(snakeHead.id).css("left", snakeHead.x);
        $(snakeHead.id).css("top", snakeHead.y);

         snakeHead.y += snakeHead.speedY;
         snakeHead.x += snakeHead.speedX;
    }


  
  function doCollide() {
        if (snakeHead.x < Bounds.Left) {                    //testing collisions
            $('#snakeHead').css("background-color", "red"); //check for collisions, turn red if collides
            
        } if (snakeHead.y < Bounds.Top) {
            $('#snakeHead').css("background-color", "red");
           
        } if (snakeHead.x > Bounds.Right) {
            $('#snakeHead').css("background-color", "red");
            
        } if (snakeHead.y > Bounds.Bottom) {
            $('#snakeHead').css("background-color", "red");
            
        }
        if (snakeHead.x > Bounds.Left && snakeHead.y > Bounds.Top && snakeHead.x < Bounds.Right && snakeHead.y < Bounds.Bottom) {
            $('#snakeHead').css("background-color", "green");
        }
    }
  




  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
