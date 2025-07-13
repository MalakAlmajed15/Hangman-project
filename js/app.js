let currentWord = '';
let currentLevel = 1;
let wins = 0;
let wrongGuesses = 0;
let timeLeft = 90;
let timerInterval = null;

const hangmanParts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];

const words = [
  ['cat', 'dog', 'tree', 'fish', 'book', 'moon', 'cake', 'milk', 'star', 'ball'],
  ['planet', 'rocket', 'garden', 'banana', 'window', 'puzzle', 'pirate', 'gloves', 'cheese', 'castle'],
  ['elephant', 'notebook', 'computer', 'dinosaur', 'triangle', 'umbrella', 'mountain', 'sandwich', 'backpack', 'hospital']
];

function goTo(pageId) {
  const pages = ['home-page', 'level-page', 'game-page'];
  pages.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';
}

function instructionPopup() {
  const instructionsEl = document.getElementById('instructionsBtn');
  const instructionsContent = document.createElement('div');
  const closeBtn = document.createElement('span');
  const instructionBox = document.createElement('div');
  const title = document.createElement('h1');
  const instructions = document.createElement('p');

  instructions.innerHTML = `
    - Choose the level of difficulty<br>
    - Guess the word by clicking on letters<br>
    - You have 6 wrong guesses max<br>
    - You have 90 seconds to guess the word<br>
    - Win before the timer ends or you lose!
  `;

  instructionsContent.className = 'instructions-content';
  closeBtn.className = 'close';
  instructionBox.className = 'instructions-box';
  closeBtn.innerHTML = 'X';
  title.textContent = 'How To Play:';
  closeBtn.onclick = () => (instructionBox.style.display = 'none');

  instructionsContent.appendChild(title);
  instructionsContent.appendChild(instructions);
  instructionsContent.appendChild(closeBtn);
  instructionBox.appendChild(instructionsContent);
  document.body.appendChild(instructionBox);

  instructionsEl.onclick = () => {
    instructionBox.style.display = 'block';
  };
}

function resetHangmanDrawing() {
  hangmanParts.forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
}

function showHangmanPart(wrongGuesses) {
  if (wrongGuesses <= hangmanParts.length) {
    const part = document.getElementById(hangmanParts[wrongGuesses - 1]);
    if (part) part.style.display = 'inline';
  }
}

function disableAllKeys() {
  const buttons = document.querySelectorAll('.keyboard button');
  buttons.forEach(btn => (btn.disabled = true));
}

function handleGuess(letter, buttonEl) {
  buttonEl.disabled = true;
  const wordLetters = currentWord.split('');
  const letterEls = document.querySelectorAll('.letter');
  let correct = false;

  wordLetters.forEach((char, index) => {
    if (char === letter) {
      letterEls[index].textContent = letter;
      correct = true;
    }
  });

  if (!correct) {
    wrongGuesses++;
    document.getElementById('wrong-guesses').textContent = wrongGuesses;
    showHangmanPart(wrongGuesses);
  }

  const currentGuess = Array.from(letterEls).map(el => el.textContent).join('');
  if (currentGuess === currentWord) {
    wins++;
    clearInterval(timerInterval);
    document.getElementById('wins').textContent = wins;
    document.getElementById('message').textContent = '🎉 You Win!';
    disableAllKeys();
  } else if (wrongGuesses >= 6) {
    clearInterval(timerInterval);
    document.getElementById('message').textContent = `💀 You Lose! The word was ${currentWord}`;
    disableAllKeys();
  }
}

function renderKeyboard() {
  const keyboardEl = document.querySelector('.keyboard');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  keyboardEl.innerHTML = '';

  alphabet.split('').forEach(letter => {
    const button = document.createElement('button');
    button.textContent = letter;
    button.classList.add('key');
    button.onclick = () => handleGuess(letter, button);
    keyboardEl.appendChild(button);
  });
}

function startTimer() {
  const timerDisplay = document.getElementById('timer');
  timerDisplay.textContent = `Time: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      disableAllKeys();
      document.getElementById('message').textContent = `⏱️ Time's up! The word was ${currentWord}`;
    }
  }, 1000);
}

function startGame(level) {
  currentLevel = level;
  wrongGuesses = 0;
  timeLeft = 90;

  resetHangmanDrawing();
  document.getElementById('message').textContent = '';
  document.getElementById('wrong-guesses').textContent = wrongGuesses;

  const levelWords = words[level - 1];
  currentWord = levelWords[Math.floor(Math.random() * levelWords.length)].toUpperCase();

  const wordDisplay = document.getElementById('word-display');
  wordDisplay.innerHTML = '';
  currentWord.split('').forEach(() => {
    const span = document.createElement('span');
    span.textContent = '_';
    span.classList.add('letter');
    wordDisplay.appendChild(span);
  });

  renderKeyboard();
  goTo('game-page');
  startTimer();
}

window.onload = () => {
  goTo('home-page');
  instructionPopup();

  document.getElementById('new-game-btn').onclick = () => startGame(currentLevel);
  document.getElementById('back-btn').onclick = () => {
    clearInterval(timerInterval);
    goTo('level-page');
  };
};
