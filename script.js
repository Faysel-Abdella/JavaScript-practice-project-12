const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

let randomWord; // To store one random word
let score = 0; // Initially zero
let time = 10; // Initially 10 sec

let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// List of words for game
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// Focus on text when start
text.focus();

// Start counting down
const timeInterval = setInterval(updteTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updteTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    // end game
    gameOver();
  }
}

// Game over show in scree

function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick='location.reload()'>Reload</button>

    `;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// Event listener

// Typing
text.addEventListener("input", (e) => {
  const insertdText = e.target.value;

  if (insertdText === randomWord) {
    setTimeout(() => {
      addWordToDOM();
      updateScore();

      // Cleare the input
      e.target.value = "";

      if (difficulty === "hard") {
        time += 2;
      } else if (difficulty === "medium") {
        time += 3;
      } else {
        time += 5;
      }

      updteTime();
    }, 300);
  }
});

// Setting btn click
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

// Settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
