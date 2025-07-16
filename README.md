# 🕹️ Hangman Game

A fun and educational Hangman game developed using **HTML**, **CSS**, and **JavaScript**. This version includes multiple difficulty levels, a timer, hint functionality, and a responsive UI. Built during the **General Assembly Bahrain** training.

---

## 🎮 Game Features

- 🔤 **Difficulty Levels**
  - Level 1: Simple 3–4 letter words
  - Level 2: Medium difficulty 6–8 letter words
  - Level 3: Complex words up to 12+ letters

- ⏱️ **Game Timer**
  - 90-second countdown to guess the word
  - Timer updates in real-time
  - Game ends when time runs out

- ❌ **Wrong Guess Limit**
  - Maximum of 6 wrong guesses before losing
  - Each wrong guess displays a new part of the hangman drawing (SVG-based)

- 💡 **Hint System**
  - One hint per game reveals a random unrevealed letter
  - Automatically disables after use

- 🎊 **Victory Confetti**
  - Celebratory confetti appears on winning

- ⌨️ **Virtual Keyboard**
  - Clickable A–Z keys for guessing
  - Automatically disables keys when clicked

- 🔁 **Game Control**
  - Restart game with "New Game" button
  - Return to level selection with "Back to Levels" button

- 📜 **Instructions Modal**
  - Explains rules and how to play the game

---

## 🧑‍💻 Technologies Used

- **HTML5** – Structure and layout
- **CSS3** – Styling and responsiveness
- **Vanilla JavaScript** – Game logic and interactivity
- **Canvas Confetti** – Animation library for win celebrations

---

## 🔧 How to Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/malakalmajed15/hangman-game.git


🔧 Gameplay Enhancements
1. 🔠 Word Categories

- Let users choose categories (e.g., Animals, Food, Countries).

- Filter word lists based on category selection.

2. 🧩 Custom Word Mode

- Let players input their own word and challenge a friend to guess it.

3. ⏱️ Per-Letter Countdown (Hard Mode)

- Add a timer for each letter guess (e.g., 5 seconds to click a letter).

4. 🪙 Scoring System

- Award points for correct guesses.

- Bonus for fast wins or unused hints.

5. 🧠 Power-Ups

- Reveal a vowel

- Skip a wrong guess

- Extend timer by 10 seconds

6. 🧾 Word Definition Pop-Up

- After each word is guessed, show its definition using an API (e.g., Dictionary API).