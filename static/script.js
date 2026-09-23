const WORDS = [
  'planet', 'rocket', 'pirate', 'dragon', 'wizard', 'banana', 'forest', 'comet',
  'castle', 'galaxy', 'treasure', 'knight', 'jungle', 'volcano', 'puzzle'
];

const scrambledWordEl = document.getElementById('scrambledWord');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const roundEl = document.getElementById('round');
const messageEl = document.getElementById('message');
const guessForm = document.getElementById('guessForm');
const guessInput = document.getElementById('guessInput');
const startBtn = document.getElementById('startBtn');

let currentWord = '';
let score = 0;
let round = 1;
let timer = 30;
let timerId = null;
let gameRunning = false;

function shuffleWord(word) {
  const letters = word.split('');
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  const shuffled = letters.join('');
  return shuffled === word ? shuffleWord(word) : shuffled;
}

function pickWord() {
  currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  scrambledWordEl.textContent = shuffleWord(currentWord);
}

function setMessage(text, type = '') {
  messageEl.textContent = text;
  messageEl.className = 'message';
  if (type) {
    messageEl.classList.add(type);
  }
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startRound() {
  timer = 30;
  timerEl.textContent = timer;
  pickWord();
  guessInput.value = '';
  guessInput.focus();
  setMessage('Type the word before the timer runs out!');

  stopTimer();
  timerId = setInterval(() => {
    timer -= 1;
    timerEl.textContent = timer;

    if (timer <= 0) {
      stopTimer();
      gameRunning = false;
      setMessage(`Time is up! The word was "${currentWord}".`, 'bad');
      round += 1;
      roundEl.textContent = round;
      startBtn.textContent = 'Play Again';
    }
  }, 1000);
}

function startGame() {
  score = 0;
  round = 1;
  scoreEl.textContent = score;
  roundEl.textContent = round;
  gameRunning = true;
  startBtn.textContent = 'Restart Game';
  startRound();
}

startBtn.addEventListener('click', () => {
  startGame();
});

guessForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!gameRunning) {
    setMessage('Press Start Game to begin.', 'bad');
    return;
  }

  const guess = guessInput.value.trim().toLowerCase();
  if (!guess) {
    setMessage('Please enter a guess.', 'bad');
    return;
  }

  if (guess === currentWord) {
    score += 10;
    scoreEl.textContent = score;
    setMessage('Correct! Nice job!', 'good');
    stopTimer();
    gameRunning = false;
    round += 1;
    roundEl.textContent = round;
    startBtn.textContent = 'Next Round';
  } else {
    setMessage('Not quite. Keep trying!', 'bad');
  }

  guessInput.value = '';
});

pickWord();
setMessage('Press start to begin.');
