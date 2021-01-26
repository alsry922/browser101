"use strict";

const CARROT_SIZE = 80;
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();

initGame();

function initGame() {
  //아이템을 생성해서 랜덤배치한다.
  addItem("carrot", 5, "img/carrot.png");
  addItem("bug", 5, "img/bug.png");
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
