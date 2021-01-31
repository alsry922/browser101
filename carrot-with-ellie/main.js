"use strict";

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameButton = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");
const gamePopUp = document.querySelector(".pop-up");
const popUpMessage = document.querySelector(".pop-up__message");
const popUpRefresh = document.querySelector(".pop-up__refresh");

let started = false;
let timer = undefined;
let score = 0;

gameButton.addEventListener("click", () => {
  if (started) {
    gameStop();
  } else {
    gameStart();
  }
  started = !started;
});

function gameStart() {
  initGame();
  showStopBtn();
  showTimerAndScore();
  startGameTimer();
}

function initGame() {
  //아이템을 생성해서 랜덤배치한다.
  field.innerHTML = "";
  gameScore.textContent = CARROT_COUNT;
  addItem("carrot", CARROT_COUNT, "img/carrot.png");
  addItem("bug", BUG_COUNT, "img/bug.png");
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

function showStopBtn() {
  const btnIcon = gameButton.querySelector(".fa-play");
  btnIcon.classList.add("fa-stop");
  btnIcon.classList.remove("fa-play");
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

function startGameTimer() {
  let remainingSec = GAME_DURATION;
  updateTimerText(remainingSec);
  timer = setInterval(() => {
    if (remainingSec <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingSec);
  }, 1000);
}

function updateTimerText(time) {
  const minute = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.textContent = `${minute}:${seconds}`;
}

function gameStop() {
  // showPlayBtn();
  stopGameTimer();
  hideGameBtn();
  showPopUpWithText("REPLAY❓");
}

function stopGameTimer() {
  clearInterval(timer);
}

function hideGameBtn() {
  gameButton.style.visibility = "hidden";
}

function showPopUpWithText(text) {
  gamePopUp.classList.remove("pop-up--hide");
  popUpMessage.textContent = text;
}

// function showPlayBtn() {
//   const btnIcon = gameButton.querySelector(".fa-stop");
//   btnIcon.classList.add("fa-play");
//   btnIcon.classList.remove("fa-stop");
// }
