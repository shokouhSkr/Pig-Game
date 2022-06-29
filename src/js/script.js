"use strict";

// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const current0El = document.querySelector(".current--0");
const current1El = document.querySelector(".current--1");
const diceEl = document.querySelector("#dice");
const score0El = document.querySelector("#score0El");
const score1El = document.querySelector("#score1El");
const btnNew = document.querySelector("#btnNew");
const btnRoll = document.querySelector("#btnRoll");
const btnHold = document.querySelector("#btnHold");

const throwDiceSound = new Audio();
throwDiceSound.src = "/src/assets/audio/Throw dice.mp3";

const winningSound = new Audio();
winningSound.src = "/src/assets/audio/win.mp3";

// starting conditions
let scores, currentScore, activePlayer, playing;

// functions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // player 1
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  dice.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
};

init();

const switchPlayer = function () {
  currentScore = 0;

  document.querySelector(`.current--${activePlayer}`).textContent = currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. generating sound of rolling dice
    throwDiceSound.play();

    // 2. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 3. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `/src/assets/img/dice-${dice}.png`;

    // 4. check for rolled "1"
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;

      document.querySelector(`.current--${activePlayer}`).textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// event handlers
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.querySelector(`.score--${activePlayer}`).textContent = scores[activePlayer];

    // 2. check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
      document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
      dice.classList.add("hidden");
      winningSound.play();
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
