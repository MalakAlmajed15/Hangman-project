let currentWord = ''
let wins = 0
let wrongGuesses = 0
let timerInterval = null
const parts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg']

//words according to level of difficulty
const words = [
  [
    'cat', 'dog', 'tree', 'fish', 'book', 'moon', 'cake', 'milk', 'star', 'ball',
    'sun', 'pen', 'cup', 'frog', 'bird', 'shoe', 'duck', 'hat', 'rain', 'snow'
  ],
  [
    'planet', 'rocket', 'garden', 'banana', 'window', 'puzzle', 'pirate', 'gloves', 'cheese', 'castle',
    'market', 'school', 'animal', 'bottle', 'laptop', 'orange', 'guitar', 'cookie', 'pillow', 'button'
  ],
  [
    'elephant', 'notebook', 'computer', 'dinosaur', 'triangle', 'umbrella', 'mountain', 'sandwich', 'backpack', 'hospital',
    'microscope', 'adventure', 'restaurant', 'chocolate', 'asteroids', 'knowledge', 'volunteer', 'telephone', 'direction', 'revolution'
  ]
]

//changing the page
function goTo(pageId) {
  //first blocking all the pages so that non of them shows
  document.getElementById('home-page').style.display = 'none'
  document.getElementById('level-page').style.display = 'none'
  document.getElementById('game-page').style.display = 'none'
  //then showing only the page with the specific id
  document.getElementById(pageId).style.display = 'block'
}

function instructionPopup() {
  //getting the instructions button
  const instructionsEl = document.getElementById('instructionsBtn')

  //creating elements for the instructions box
  const instructionBox = document.createElement('div')
  const instructionsContent = document.createElement('div')
  const title = document.createElement('h2')
  const instructions = document.createElement('p')
  const closeBtn = document.createElement('span')

  //content of the instruction box
  instructions.innerHTML = `
    - Choose the level of difficulty<br>
    - Guess the word by clicking on letters<br>
    - You have 6 wrong guesses max<br>
    - You have 90 seconds to guess the word<br>
    - Win before the timer ends or you lose!
  `

  //assigning class name to each element
  instructionBox.className = 'instructions-box'
  instructionsContent.className = 'instructions-content'
  closeBtn.className = 'close'
  
  //content
  closeBtn.innerHTML = 'Close'
  title.textContent = 'How To Play'

  //when clicking the close button
  closeBtn.onclick = () => {
    instructionBox.style.display = 'none'
  }

  //appending
  instructionsContent.append(title, instructions, closeBtn)
  instructionBox.appendChild(instructionsContent)
  document.body.appendChild(instructionBox)
  
  //clicking instructions button
  instructionsEl.onclick = () => {
    instructionBox.style.display = 'block'
  }
}

function resetHangmanDrawing() {
  //for each part in the hangman drawing (id represents each element of the svg) hide it
  parts.forEach(id => {
    document.getElementById(id).style.display = 'none'
  })
}

function showHangmanPart(wrongGuesses) {
  if (wrongGuesses <= parts.length) {
    const part = document.getElementById(parts[wrongGuesses - 1]);
    //checks if the part is found and make it visible
    if (part != null) {
      part.style.display = 'inline'
    }
  }
}

function startGame(level) {
  //reset everything and start a new game
  hintUsed = false
  document.getElementById('hint-btn').disabled = false
  currentLevel = level
  wrongGuesses = 0
  timeLeft = 90
  clearInterval(timerInterval)
  resetHangmanDrawing()

  //reset the informations
  document.getElementById('message').textContent = ''
  document.getElementById('wrong-guesses').textContent = '0'
  document.getElementById('timer').textContent = `Time: ${timeLeft}s`

  //choosing a random word according to the level
  const levelWords = words[level-1]
  currentWord = levelWords[Math.floor(Math.random() * levelWords.length)].toUpperCase()

  //displaying blanks according to the length of the word
  const wordDisplay = document.getElementById('word-display')
  wordDisplay.innerHTML = '' //clearing previous content
  currentWord.split('').forEach(() => { //turns the word into an array of individual letters and then loops for each letter
    const span = document.createElement('span')
    span.textContent = '_'
    span.classList.add('letter')//to style it
    wordDisplay.appendChild(span)//adds the blanks
  })
  
  //load game view
  renderKeyboard()
  goTo('game-page')
  startTimer()
}

function startTimer() {
  const timerDisplay = document.getElementById('timer') //getting the element
  timerDisplay.textContent = `Time: ${timeLeft}s` //showing that the time is 90sec

  timerInterval = setInterval(() => {
    timeLeft-- //decrease the time
    timerDisplay.textContent = `Time: ${timeLeft}s`

    if (timeLeft <= 0) {
      clearInterval(timerInterval)
      disableAllKeys() //to disable the keyboard so that the user can't keep guessing
      document.getElementById('message').textContent = ` Time's up⏱️! The word was ${currentWord}`
    }
  }, 1000)
}

function renderKeyboard() {
  const keyboardEl = document.querySelector('.keyboard') //getting the keyboard element
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  keyboardEl.innerHTML = '' //clears the keyboard container

  alphabet.split('').forEach(letter => {
    const button = document.createElement('button') //keeping the letters in a button
    button.textContent = letter
    button.classList.add('key') //creating a class for the buttons
    button.onclick = () => handleGuess(letter, button) //the letter that the user clicked and the button elemnts so that it can be disabled
    keyboardEl.appendChild(button) //adds each button to the keyboard element
  })
}

function disableAllKeys() {
  const buttons = document.querySelectorAll('.keyboard button')
  buttons.forEach(btn => btn.disabled = true) //disable all buttons
}

function handleGuess(letter, buttonEl) {
  buttonEl.disabled = true //disable the button when it's clicked

  const wordLetters = currentWord.split('')
  const letterEls = document.querySelectorAll('.letter')
  let correct = false
  
  //reveal letter if correct
  for (let i = 0; i < wordLetters.length; i++) {
    if (wordLetters[i] == letter) {
      letterEls[i].textContent = letter
      correct = true
    }
  }

  //wrong guesses
  if (!correct) {
    wrongGuesses++
    document.getElementById('wrong-guesses').textContent = wrongGuesses //increase the wrong guesses
    showHangmanPart(wrongGuesses)
  }

  const currentGuess = Array.from(letterEls).map(el => el.textContent).join('') //building the guessed word

  if (currentGuess == currentWord){
    wins++
    clearInterval(timerInterval)
    document.getElementById('wins').textContent = wins
    document.getElementById('message').textContent = 'You Won🎉!'
    confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
  })
  disableAllKeys()
  } else if (wrongGuesses >= 6) {
    clearInterval(timerInterval)
    document.getElementById('message').textContent = ` You Lost💀! The word was ${currentWord}`
    disableAllKeys()
  }
}
