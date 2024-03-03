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

const lightUserTile = () => {
  board.classList.remove('unclickable');

  tiles.forEach((tile) => {
    tile.addEventListener('click', handleTileClick);
  });

  setTimeout(() => {
    board.classList.add('unclickable');
    checkUserPattern();
  }, compPattern.length * 1000 + 2000);
};

const handleTileClick = (e) => {
  const userClickedTileColor = e.target.getAttribute('data-tile');
  userPattern.push(userClickedTileColor);
};

const checkUserPattern = () => {
  for (let i = 0; i < userPattern.length; i++) {
    if (userPattern[i] !== compPattern[i]) {
      alert('You Lost ');
      return;
    }
  }

  if (userPattern.length === compPattern.length) {
    level += 1;
    levelEl.textContent = level;
    userPattern = [];
    setTimeout(runGame, 1000);
  }
};

function runGame() {
  levelEl.textContent = level;
  if (level == 0) return;
  compPattern.push(generateRandomTile());
  lightCompTiles(compPattern);
  lightUserTile(compPattern.length);
}

playButton.addEventListener('click', runGame);
