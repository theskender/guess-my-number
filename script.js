'use strict';
// Important state variables
let score = 20;
let highscore = 0;
let secretNum;
let guessNum;
let gameOver = false;
let highScoreHolder;

// Create random number
function numGenerator() {
  secretNum = Math.floor(Math.random() * 150) + 1;
}

// Random number generated on initialization
numGenerator();

// EVENT - Check button pressed
if (gameOver == false) {
  document.querySelector('.check').addEventListener('click', function () {
    guessNum = document.querySelector('.guess').value;
    checker();
  });
}

// EVENT - Restart button pressed
document.querySelector('.restart').addEventListener('click', restartFunction);

// Restart function - restart styling, message, generate new secret number, show click button, return question mark to number box
function restartFunction() {
  numGenerator();
  score = 20;
  document.querySelector('.score').textContent = String(score);
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
  document.querySelector('.check').style.display = 'block';
  document.querySelector('.score').style.color = '#eee';
  gameOver = false;
}

// Checker function - compare secretNum & guessNum, change message, trigger win function if necessary
function checker() {
  let message = document.querySelector('.message');
  if (guessNum === '' && score !== 0) {
    message.textContent = '🤔Forgot to input a number?';
  } else if (guessNum > secretNum) {
    message.textContent = '📉Go lower!';
    dropScore();
  } else if (guessNum < secretNum) {
    message.textContent = '📈Go higher!';
    dropScore();
  } else if ((guessNum = secretNum)) {
    winner();
  }
}

// Highscore updater function
function highScoreUpdate() {
  if (document.querySelector('.enter-name').value !== '') {
    highScoreHolder = document.querySelector('.enter-name').value;
    document.querySelector('.modal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
    document.querySelector(
      '.highscore'
    ).textContent = `${highscore} - ${highScoreHolder}`;
  }
}

// Trigger win - change background, make number wider, block check button, update highscore, turn question mark into correct #, opens up highscore modal if necessary
function winner() {
  gameOver = true;
  document.querySelector('body').style.backgroundColor = 'green';
  document.querySelector('.message').textContent = '🏆 You win!';
  document.querySelector('.number').textContent = secretNum;
  document.querySelector('.number').style.width = '30rem';
  document.querySelector('.check').style.display = 'none';
  // highScoreUpdate();
  openHighScoreModal();
}

// Open highscore modal
function openHighScoreModal() {
  if (score > highscore) {
    highscore = score;
    document.querySelector('.modal').classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');
  }
}

// Score lowering and lose condition
function dropScore() {
  if (score > 0 && score !== 1) {
    score -= 1;
    document.querySelector('.score').textContent = score;
  } else if (score == 1) {
    score -= 1;
    document.querySelector('.score').textContent = score;
    document.querySelector('.message').textContent = '🤦‍♂️You lose!';
    document.querySelector('.score').style.color = 'red';
    document.querySelector('.guess').value = '';
    gameOver = true;
  } else if (score == 0) {
    document.querySelector('.message').textContent = 'Please restart the game!';
    document.querySelector('.guess').value = '';
    document.querySelector('.check').style.display = 'none';
  }
}

// Saves name of new highscore holder from user input in pop up modal, triggers highscore update and closes modal
document
  .querySelector('.btn-close-modal')
  .addEventListener('click', highScoreUpdate);

// Enter key is also an option for entering name
document.addEventListener('keydown', function (e) {
  e.preventDefault;
  let checkIfModalOpen = document
    .querySelector('.modal')
    .classList.contains('hidden');
  if (e.key === 'Enter' && checkIfModalOpen === false) {
    highScoreUpdate();
  }
});
