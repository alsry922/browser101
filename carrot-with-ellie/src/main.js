"use strict";
import PopUp from "./popup.js";
import Field from "./field.js";

const CARROT_SIZE = 80;
const BUG_SIZE = 50;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION = 5;

// const field = document.querySelector(".game__field");
// const fieldRect = field.getBoundingClientRect();
const gameButton = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

const carrotSound = new Audio("sound/carrot_pull.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const bgSound = new Audio("sound/bg.mp3");
const winSound = new Audio("sound/game_win.mp3");
const alertSound = new Audio("sound/alert.wav");

let started = false;
let timer = undefined;
let score = 0;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(gameStart);

const gameField = new Field();
gameField.setClickListener(onFieldClick);

// field.addEventListener("click", onFieldClick);

gameButton.addEventListener("click", () => {
  if (started) {
    gameStop();
  } else {
    gameStart();
  }
});

function gameStart() {
  started = true;
  score = 0;
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
  playSound(bgSound);
}

function gameStop() {
  started = false;
  stopGameTimer();
  hideGameBtn();
  gameFinishBanner.showWithText("REPLAY❓");
  playSound(alertSound);
  stopSound(bgSound);
}

function finishGame(win) {
  started = false;
  hideGameBtn();
  if (win) {
    playSound(winSound);
  } else {
    playSound(bugSound);
  }
  stopSound(bgSound);
  stopGameTimer();
  gameFinishBanner.showWithText(win ? "YOU WON🎉" : "YOU LOST💩");
}

function showStopBtn() {
  gameButton.style.visibility = "visible";
  const btnIcon = gameButton.querySelector(".fas");
  btnIcon.classList.add("fa-stop");
  btnIcon.classList.remove("fa-play");
}

function hideGameBtn() {
  gameButton.style.visibility = "hidden";
}

function initGame() {
  gameField.initField();
  gameScore.textContent = CARROT_COUNT;
  gameField.addItem("carrot", CARROT_COUNT, "img/carrot.png", CARROT_SIZE);
  gameField.addItem("bug", BUG_COUNT, "img/bug.png", BUG_SIZE);
}

function onFieldClick(event) {
  if (!started) {
    return;
  }

  const target = event.target;
  if (target.matches(".carrot")) {
    target.remove();
    score++;
    playSound(carrotSound);
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (target.matches(".bug")) {
    finishGame(false);
  }
}

function playSound(sound) {
  sound.play();
  sound.currentTime = 0;
}

function stopSound(sound) {
  sound.pause();
}

function updateScoreBoard() {
  gameScore.textContent = CARROT_COUNT - score;
}

function addItem(className, count, imagePath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("img");
    item.setAttribute("class", className);
    item.setAttribute("src", imagePath);
    item.style.position = "absolute";
    const left = randomNum(x1, x2);
    const top = randomNum(y1, y2);
    item.style.left = `${left}px`;
    item.style.top = `${top}px`;
    field.appendChild(item);
  }
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingSec = GAME_DURATION;
  updateTimerText(remainingSec);
  timer = setInterval(() => {
    remainingSec--;
    updateTimerText(remainingSec);
    if (remainingSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minute = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.textContent = `${minute}:${seconds}`;
}
