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
