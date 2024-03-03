const playButton = document.getElementById('play');
const scoreEl = document.getElementById('high-score');
const levelEl = document.getElementById('level');
const tiles = document.querySelectorAll('.tile');
const board = document.querySelector('.board');
const compPattern = [];
const userPattern = [];
let currentLevel;
let level = 0;
let score = 0;

const tileChoices = ['green', 'red', 'blue', 'yellow'];

// Functions
const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const generateRandomTile = () => tileChoices[generateRandomNumber(0, tileChoices.length - 1)];

const playSound = (color) => {
  const audio = new Audio(`./sounds/${color}.mp3`);
  audio.play();
};

playButton.addEventListener('click', () => {
  compPattern.push(generateRandomTile(tileChoices));
  level += 1;
  levelEl.textContent = level;

  compPattern.forEach((tile, index) => {
    setTimeout(() => {
      document.querySelector(`.${tile}`).classList.remove('inactive');
      playSound(tile);

      setTimeout(() => {
        document.querySelector(`.${tile}`).classList.add('inactive');
      }, 500);
    }, index * 1000);
  });
});
