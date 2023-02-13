"use strict";

//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

let scores, currentScore, activePlayer, playing;

//reset function

const reset = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
    document.querySelector(`#score--${i}`).textContent = 0;
    document.querySelector(`#current--${i}`).textContent = 0;
    if (
      document
        .querySelector(`.player--${i}`)
        .classList.contains("player--winner")
    ) {
      document
        .querySelector(`.player--${i}`)
        .classList.remove("player--winner");
    }
  }
};

//switch player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

reset();

//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //generating random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //check if the dice result isn't 1
    if (dice !== 1) {
      //add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

//hold button functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    //1. add current score to active player's score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if it's >= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//reset button functionality
btnNew.addEventListener("click", reset);
