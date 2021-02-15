var userScore = 0;
var computerScore = 0;                    //caching the dom ==> variables for future use
const $userScore_span = $('#user-score'); //dom variables for span tag
const $computerScore_span =  $('#computer-score');//dom variables for span tag
const $scoreBoard_div = $('.score-board');
const $result_p = $('.result > p');// gets the p tag inside .result
const $rock_div = $('#r');
const $paper_div = $('#p');
const $scissors_div = $('#s');

function getComputerChoice(){
    const choices = ['r', 'p', 's']; //array of rock, paper, scissors
    const randomNumber = Math.floor(Math.random() * 3); //it will round it down //it will never go over 3 [0,1,2]
    return choices[randomNumber]; //return random choice in the array 
}

function convertToWord(letter) { //converts the array choices into actual words [rock, paper, scissors]
    if (letter === 'r') return 'Rock' ;
    if (letter === 'p') return 'Paper' ;
    return 'Scissors' ; //if the above is not met then return scissors 
    
}

function win(userChoice, computerChoice) {
    const smallUserWord = 'user'.fontsize(3).sub(); //this are string methods that exist in the string object// it will convert the size to 3 and superscript it
    const smallCompWord = 'comp'.fontsize(3).sub();// .sup will supscript(up) and .sub will subscript(down)
    const userChoice_div = document.getElementById(userChoice);
    userScore++
    $userScore_span.html(userScore);
    $computerScore_span.html(computerScore);
    $result_p.html(`${convertToWord(userChoice)}${smallUserWord} beats ${convertToWord(computerChoice)}${smallCompWord}. You win!`);//calling the function to convert the letters to words//used ES6 (template strings [``]) to connect the strings and variable
    userChoice_div.classList.add('green-glow');                                                                                     //if its a function place ${} around them to display it properly
    setTimeout(function () { userChoice_div.classList.remove('green-glow') }, 300) //sets timeout for howlong i want it to stay
    //  console.log('User wins!');                                                                          
}                                                                                              
    

function lose(userChoice, computerChoice) {
    const smallUserWord = 'user'.fontsize(3).sub(); 
    const smallCompWord = 'comp'.fontsize(3).sub();
    const userChoice_div =  document.getElementById(userChoice);
    computerScore++ 
    $userScore_span.html(userScore);
    $computerScore_span.html(computerScore);
    $result_p.html(`${convertToWord(userChoice)}${smallUserWord} loses to ${convertToWord(computerChoice)}${smallCompWord}. You lost...`);
    userChoice_div.classList.add('red-glow');  
    setTimeout(function() {userChoice_div.classList.remove('red-glow')}, 300)
    // console.log('User loses!');
}

function draw(userChoice, computerChoice) {
    const smallUserWord = 'user'.fontsize(3).sub(); 
    const smallCompWord = 'comp'.fontsize(3).sub();
    const userChoice_div =  document.getElementById(userChoice);
    $result_p.html(`${convertToWord(userChoice)}${smallUserWord} equals  ${convertToWord(computerChoice)}${smallCompWord}. Its a draw. `);
    userChoice_div.classList.add('grey-glow');  
    setTimeout(function() {userChoice_div.classList.remove('grey-glow')}, 300)
  
    //  console.log('its a draw!');
}

function game(userChoice) { //will give me the choice that I press
    const computerChoice = getComputerChoice(); //will return the random computer choice
    switch (userChoice + computerChoice) { //switch works as an If statement // compares userChoice and computerChoice
        case 'rs': // if user picks rock// computer picks scissors
        case 'pr': // if user picks paper// computer picks rock
        case 'sp': // if user picks scissors// computer picks paper
            win(userChoice, computerChoice);
            break; //to stop it from continue
        case 'sr': // if computer picks rock// user picks scissors
        case 'rp': // if computer picks paper// user picks rock
        case 'ps':  // if computer picks scissors// user picks paper
            lose(userChoice, computerChoice);
            break;
        case 'rr':
        case 'pp':
        case 'ss': 
            draw(userChoice, computerChoice);
            break;
    }
}



function main() {
    $rock_div.on('click', function () {
        game('r');
    });

    $paper_div.on('click', function () {
        game('p');
    });

    $scissors_div.on('click', function () {
        game('s');
    });

}

main();

