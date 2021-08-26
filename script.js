'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//roling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.Check for rolled 1:if ture, switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //Change later
    } else {
      //Switch to next player

      document.getElementById(`current--${activePlayer}`).textContent = 0;

      activePlayer = activePlayer === 0 ? 1 : 0;

      currentScore = 0;
      player0El.classList.toggle(`player--active`);
      player1El.classList.toggle(`player--active`);

      // if (activePlayer === 1) {
      //   player0E1.classList.remove('player--active');
      //   player0E2.classList.add('player--active');
      // } else {
      //   player0E1.classList.add('player--active');
      //   player0E2.classList.remove('player--active');
      // } another different way like toggle
    }
  }
});

// Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // save the score when click hold
    if (activePlayer === 0) {
      // score0El += currentScore;
      // document.getElementById(`score--${activePlayer}`).textContent =
      //   Number(score0El.textContent) + currentScore;
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
    } else {
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
    }
    console.log(`scoresactiveplayer is ${scores[activePlayer]}`);

    // check if player's score is >=100
    //score[1] measn  socre--1

    if (scores[activePlayer] >= 100) {
      //finish game

      // console.log(`123123123`);
      // activePlayer = activePlayer === 0 ? 1 : 0;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
    } else {
      //switch to next player when click hold
      document.getElementById(`current--${activePlayer}`).textContent = 0;

      activePlayer = activePlayer === 0 ? 1 : 0;

      currentScore = 0;

      player0El.classList.toggle(`player--active`);
      player1El.classList.toggle(`player--active`);
    }
  }

  // New game functionality
  btnNew.addEventListener('click', function () {
    // currentScore = 0;
    scores = [0, 0];
    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    currentScore = 0;
    document.getElementById(`current--0`).textContent = 0;
    document.getElementById(`current--1`).textContent = 0;
    // diceEl.classList.add('hidden');
    playing = true;
    // activePlayer = activePlayer === 0 ? 1 : 0;
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    diceEl.classList.add('hidden');

    activePlayer = 0;
  });
});
