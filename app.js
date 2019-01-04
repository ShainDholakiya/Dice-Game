/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/* Challenge 6 
Change the game to follow these rules:

1. A player loses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. 
(Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out)
3. Add another dice to the game, so that there are two dies now. The player loses his current score when one of them is a 1. 
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying;

//initializing the variables and UI
init();

var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function() {
    if(gamePlaying) {
        //1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display result
        document.getElementById('dice-1').style.display = "block";
        document.getElementById('dice-2').style.display = "block";
        document.getElementById('dice-1').src = "dice-" + dice1 + ".png";
        document.getElementById('dice-2').src = "dice-" + dice2 + ".png";

        //3. Update the round score IF the rolled number was NOT a 1
        
        //Challenge Part 3 and I added Part 1 to it
        if (dice1 === 6 && lastDice1 === 6 || dice2 === 6 && lastDice2 === 6) {
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = '0';
            nextPlayer();
        }
        else if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            //same as roundScore = roundScore + dice
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
        else {
            //Next player
            nextPlayer();
        }
            
        lastDice1 = dice1;
        lastDice2 = dice2;

        //Challenge Part 1 
        /*
        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = '0';
            nextPlayer();
        }
        else if (dice !== 1) {
        //Add score
        roundScore += dice;
        //same as roundScore = roundScore + dice
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
        else {
        //Next player
        nextPlayer();
        }

        lastDice = dice;
        */
    }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {

        //Add CUURENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

        //Challenge Part 2
        var input = document.querySelector(".final-score").value;
        var winningScore = input;
        //Undefined, 0, null, or "" are COERCED to false
        //Anything else is COERCED to true
        if(input && input !== "0") {
            winningScore = input;
        }
        else {
            winningScore = 100;
        }

        //Check if player won the game
        if (scores[activePlayer] >= winningScore) {
        document.querySelector("#name-" + activePlayer).textContent = "Winner!"
        hideDice();
        document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
        document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    
        gamePlaying = false;
        
        }
        
        else {
        //Next player
        nextPlayer();
        }
    }
});

function nextPlayer() {
        //Next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        /* same thing
        if (activePlayer === 0) {
            activePlayer = 1;
        }
        else {
            activePlayer = 0;
        }
        */

       // set roundscore back to zero
       roundScore = 0;
       
       //sets the bottom score back to zero UI
       document.getElementById('current-0').textContent = '0';
       document.getElementById('current-1').textContent = '0';
       
       //The active class shows whose turn it is by moving the red dot and changing the color
       //This does not change active back to player one 
       //document.querySelector('.player-0-panel').classList.remove('active');
       //document.querySelector('.player-1-panel').classList.add('active');
       
       //Toggle will apply active if it is not there and remove if it is there
       document.querySelector('.player-0-panel').classList.toggle('active');
       document.querySelector('.player-1-panel').classList.toggle('active');
        
       //Hides the dice when it rolls a one or two 6 in a row
       hideDice();
}

document.querySelector(".btn-new").addEventListener("click",  init);

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    hideDice();

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    
    //Rename both so Winner is still not printed
    document.querySelector("#name-0").textContent = "Player 1"
    document.querySelector("#name-1").textContent = "Player 2"

    //remove all active and winner classes
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");

    //add active class to player 1
    document.querySelector(".player-0-panel").classList.add("active");
}

function hideDice() {
    document.getElementById('dice-1').style.display = "none";
    document.getElementById('dice-2').style.display = "none";
}
