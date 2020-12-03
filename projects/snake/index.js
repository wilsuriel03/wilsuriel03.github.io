/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 100;
  const KEY = {
    "Left": 37,
    "Up": 38,
    "Right": 39,
    "Down": 40
};

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
    var snakeArray = [];
      snakeArray.push(snakeHead);
  
  
  
  var apple = gameItem('#apple');
  
  var score = 0;

  

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    updateGameItem();
    redrawGameItem(snakeHead);
    redrawGameItem(apple);
    updateTail();
    doCollide();
   
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
  if (event.which === KEY.Left  && !snakeHead.speedX) {
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

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

 function redrawGameItem(obj) {
        $(obj.id).css("left", obj.x);
        $(obj.id).css("top", obj.y);

         
    }
  function updateGameItem(){
        snakeHead.y += snakeHead.speedY;
        snakeHead.x += snakeHead.speedX;
    }

     function body() {
        var bodyId = 'body' + (snakeArray.length - 1);
        var $body = $("<div>").appendTo('#board').attr("id", bodyId);
        
        $body = gameItem('#body');
        snakeArray.push($body);
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

    //recursive function 
    function eatApple() {
        
            // if the snake head is in the same spot as the apple !!aka ate apple!!
        if (apple.x === snakeHead.x && apple.y === snakeHead.y) {
        
            // find a random spot for the apple
            var randomX = Math.floor(Math.random() * 50);
            var randomY = Math.floor(Math.random() * 27.5);
            
            // loop until it finds a valid position
            for (var i = 0; i < snakeArray.length; i++) { ///I think should delete it for recursive to work//
                if (randomX === snakeArray[i].x && randomY === snakeArray[i].y) {
                    eatApple();
                    break;
                    
                } else{
                    apple.x = randomX; //reposition the apple
                    apple.y = randomY;
                }
            }
            // create body 
            body();
           //
            // increase the score by the lenght of the snake
            score = snake.length;
            document.getElementById('score').innerHTML = "🍎: " + score;
    }
}
    
   function updateTail() {
        for (var i = snakeArray.length - 1; i > 0; i--) {
            snakeArray[i].x = snakeArray[i - 1].x;
            snakeArray[i].y = snakeArray[i - 1].y;
        }
    }







    function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
