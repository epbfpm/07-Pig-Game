'use strict';

/* ====================================================== */
/*                         STATIC                        */
/* ====================================================== */
/* ======================== AUDIO ======================= */
const rollAudio = new Audio('roll.mp3');
const failAudio = new Audio('fail.mp3');

/* ==================== ABBREVIATIONS =================== */
const sel = x => document.querySelector(x);
const id = x => document.getElementById(x);
let rand = () => Math.trunc(Math.random() * 6 + 1);

/* ====================== VARIABLES ===================== */
let roll;
let score = player => Number(id(`score--${player}`).textContent);
const score0El = id('score--0');
const score1El = id('score--1');
const diceState = sel('.dice');
const player0 = sel('.player--0').classList;
const player1 = sel('.player--1').classList;
let score0, score1;
let cP = 0; // currentPlayer
let cS = 0; //currentScore
let playing = true;

/* ================= INITIAL CONDITIONS ================ */
const newGame = function () {
  diceState.classList.add('hidden');
  player0.add('player--active');
  player1.remove('player--active', 'player--winner');
  player0.remove('player--winner');
  id(`name--0`).textContent = 'Jogador 1';
  id(`name--1`).textContent = 'Jogador 2';
  cP = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  cS = 0;
  playing = true;
};

/* ====================== FUNCTIONS ===================== */

let current = () => {
  cP = cP === 0 ? 1 : 0;
  player1.toggle('player--active');
  player0.toggle('player--active');
};

let scores = function () {
  score0 = Number(score0El.textContent);
  score1 = Number(score1El.textContent);
  console.log(score0, score1, cS);
};

/* ====================================================== */
/*                          LOGIC                         */
/* ====================================================== */
newGame();
/* ==================== ROLLING DICE ==================== */
sel('.btn--roll').addEventListener('click', function () {
  if (playing) {
    roll = rand();

    id('dice-img').src = `dice-${roll}.png`;
    sel('.dice').classList.remove('hidden');
    rollAudio.play();

    console.log(`Current player is ${cP}`);

    if (roll === 1) {
      cS = 0;
      id(`current--${cP}`).textContent = cS;
      failAudio.play();
      current();
    } else {
      cS += roll;
      id(`current--${cP}`).textContent = cS;
    }
  }
});

/* ================== STORING THE VALUE ================= */
sel('.btn--hold').addEventListener('click', function () {
  if (playing) {
    scores();

    id(`score--${cP}`).textContent = (cP === 0 ? score0 : score1) + cS;
    id(`current--${cP}`).textContent = 0;
    cS = 0;

    scores();
    if (score0 >= 100 || score1 >= 100) {
      sel(`.player--${cP}`).classList.add('player--winner');
      sel(`.player--${cP === 0 ? 1 : 0}`).classList.remove('player--active');
      playing = false;
      id(`name--${cP}`).textContent = 'Vencedor';
    }
    current();
  }
});
sel('.btn--new').addEventListener('click', newGame);

sel('.show-modal').addEventListener('click', function () {
  sel(`.modal`).classList.remove('hidden');
});
sel('.close-modal').addEventListener('click', function () {
  sel(`.modal`).classList.add('hidden');
});
