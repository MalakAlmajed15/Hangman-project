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