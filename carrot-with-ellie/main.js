"use strict";

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameButton = document.querySelector(".game__button");
const gameTimer = document.querySelector(".game__timer");
const gameScore = document.querySelector(".game__score");

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

function gameStop() {}
