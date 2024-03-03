const playButton = document.getElementById('play');
const scoreEl = document.getElementById('high-score');
const levelEl = document.getElementById('level');
const tiles = document.querySelectorAll('.tile');
const board = document.querySelector('.board');
let compPattern = [];
let userPattern = [];
let level = 1;
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
      document.querySelector(`.${color}`).classList.remove('inactive');
      playSound(color);

      setTimeout(() => {
        document.querySelector(`.${color}`).classList.add('inactive');
      }, 500);
    }, index * 1000);
  });
};

const lightUserTile = (numClicks) => {
  const userPattern = [];
  board.classList.remove('unclickable');

  setTimeout(() => {
    board.classList.add('unclickable');
  }, numClicks * 5000);

  tiles.forEach((tile) => {
    tile.addEventListener('click', handleTileClick);
  });
};

const handleTileClick = (e) => {
  const userClickedTileColor = e.target.getAttribute('data-tile');
  userPattern.push(userClickedTileColor);
};

function runGame() {
  if (level == 0) return;

  compPattern.push(generateRandomTile());
  console.log(compPattern);

  lightCompTiles(compPattern);
  lightUserTile(compPattern.length);
  console.log(userPattern);

  level -= 1;
  runGame(level);
}

playButton.addEventListener('click', runGame);
