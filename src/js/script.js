"use strict";

// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector("#dice");
const score0El = document.querySelector("#score0El");
const score1El = document.querySelector("#score1El");
const current0El = document.querySelector(".current--0");
const current1El = document.querySelector(".current--1");
const btnNew = document.querySelector("#btnNew");
const btnRoll = document.querySelector("#btnRoll");
const btnHold = document.querySelector("#btnHold");

const audio = new Audio();
audio.src = "/src/assets/audio/Throw dice.mp3";

// starting conditions
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0; // player 1

// switching player function
const switchPlayer = function () {
  currentScore = 0;

  document.querySelector(`.current--${activePlayer}`).textContent = currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// rolling dice function
btnRoll.addEventListener("click", function () {
  // 1. generating sound of rolling dice
  audio.play();

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
});

btnHold.addEventListener("click", function () {
  // 1. add current score to active player's score
  scores[activePlayer] += currentScore;
  console.log(scores[activePlayer]);
  document.querySelector(`.score--${activePlayer}`).textContent = scores[activePlayer];

  // 2. check if player's score is >= 100
  if (scores[activePlayer] >= 20) {
    // finish the game
    document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("bg-[#2f2f2f]", "text-[#c7365f]", "font-bold");
  } else {
    // switch to the next player
    switchPlayer();
  }
});
