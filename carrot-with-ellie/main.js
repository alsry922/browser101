"use strict";

const CARROT_SIZE = 80;
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const gameButton = document.querySelector(".game__button");
const timer = document.querySelector(".game__timer");
const score = document.querySelector(".game__score");
const popUp = document.querySelector(".pop-up");
const popUpMessage = document.querySelector(".pop-up__message");
const popUpRefresh = document.querySelector(".pop-up__refresh");
let time;
let timeLimit = 5;
let gameStatus = false;

gameButton.addEventListener("click", initGame);
popUpRefresh.addEventListener("click", gameReset);

// initGame();

function initGame() {
  //아이템을 생성해서 랜덤배치한다.
  if (gameStatus === false) {
    gameStatus = true;
    gameButton.innerHTML = `<i class="fas fa-stop"></i>`;
    timer.classList.remove("game__timer--hide");
    score.classList.remove("game__score--hide");
    addItem("carrot", 5, "img/carrot.png");
    addItem("bug", 5, "img/bug.png");
    timer.textContent = `0:${timeLimit}`;
    time = setInterval(() => {
      timeLimit--;
      timer.textContent = `0:${timeLimit}`;
      if (timeLimit <= 0) {
        clearInterval(time);
        popUp.classList.remove("pop-up--hide");
        popUpMessage.textContent = "YOU LOST💩";
      }
    }, 1000);
    score.textContent = field.querySelectorAll(".carrot").length;
  } else {
    clearInterval(time);
    popUp.classList.remove("pop-up--hide");
    popUpMessage.textContent = "REPLAY?😜";
  }
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

function gameReset() {
  field.innerHTML = "";
  popUp.classList.add("pop-up--hide");
  timer.classList.add("game__timer--hide");
  score.classList.add("game__score--hide");
  gameButton.innerHTML = `<i class="fas fa-play"></i>`;
  gameStatus = false;
  timeLimit = 5;
}
