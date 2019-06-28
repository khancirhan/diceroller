/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, activePlayer, roundScore, gamePlaying;

init();

// add an event listener to the click event for ROLL DICE button
document.getElementById("btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // random number
    var diceNum = Math.floor(Math.random() * 6 + 1);

    var diceDOM = document.querySelector(".dice");

    // display results
    diceDOM.style.display = "block";
    diceDOM.className = "dice d-" + diceNum;

    // update round score if the rolled number was not 1
    if (diceNum !== 1) {
      roundScore += diceNum;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

// add an event listener to the click event for HOLD button
document.getElementById("btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // add round score to the global score
    scores[activePlayer] += roundScore;

    // update the GUI
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= 100) {
      // change text to winner
      document.getElementById("name-" + activePlayer).textContent = "Winner!";

      // remove active class and add winner class to the winning player panel
      document
        .getElementById("player-" + activePlayer + "-panel")
        .classList.remove("active");
      document
        .getElementById("player-" + activePlayer + "-panel")
        .classList.add("winner");

      // hide the dice
      document.querySelector(".dice").style.display = "none";

      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

// add an event listener to the click event for NEW GAME button
document.getElementById("btn-new").addEventListener("click", init);

function init() {
  // set the initial parameters to 0
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  // hide the dice
  document.querySelector(".dice").style.display = "none";

  // render the initial scores on GUI
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  var player0Panel = document.getElementById("player-0-panel");
  var player1Panel = document.getElementById("player-1-panel");

  // remove active classes from both
  player0Panel.classList.remove("active");
  player1Panel.classList.remove("active");

  // remove winner classes from both
  player0Panel.classList.remove("winner");
  player1Panel.classList.remove("winner");

  //  add active class to player-0-panel
  player0Panel.classList.add("active");
}

function nextPlayer() {
  // change the current player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // reset current scores
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  // set the player panel to active
  document.getElementById("player-0-panel").classList.toggle("active");
  document.getElementById("player-1-panel").classList.toggle("active");
}
