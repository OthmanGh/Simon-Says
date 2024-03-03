const playButton = document.getElementById('play');
const scoreEl = document.getElementById('high-score');
const levelEl = document.getElementById('level');
const tiles = document.querySelectorAll('.tile');
const board = document.querySelector('.board');
let compPattern = [];
let level = 5;
let score = 0;

const tileChoices = ['green', 'red', 'blue', 'yellow'];

// Functions
const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const generateRandomTile = () => tileChoices[generateRandomNumber(0, tileChoices.length - 1)];

const playSound = (color) => {
  const audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
};

const lightCompTiles = (arr) => {
  arr.forEach((color, index) => {
    setTimeout(() => {
      console.log(color);

      document.querySelector(`.${color}`).classList.remove('inactive');

      setTimeout(() => {
        document.querySelector(`.${color}`).classList.add('inactive');
      }, 500);
    }, index * 1000);
  });
};

// const lightUserTile = () => {
//   const userPattern = [];
// };

function runGame() {
  if (level == 0) return;

  compPattern.push(generateRandomTile());
  console.log(compPattern);

  lightCompTiles(compPattern);

  level -= 1;
  runGame(level);
}

playButton.addEventListener('click', runGame);
