"use strict";

const carrotSound = new Audio("sound/carrot_pull.mp3");

export default class Field {
  constructor(carrotCount, bugCount, carrotSize, bugSize) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.carrotSize = carrotSize;
    this.bugSize = bugSize;
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", (event) => this.onClick(event));
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  init() {
    this.field.innerHTML = "";
    this._addItem(
      "carrot",
      this.carrotCount,
      "img/carrot.png",
      this.carrotSize
    );
    this._addItem("bug", this.bugCount, "img/bug.png", this.bugSize);
  }

  _addItem(className, count, imagePath, imgSize) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - imgSize;
    const y2 = this.fieldRect.height - imgSize;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imagePath);
      item.style.position = "absolute";
      const left = randomNum(x1, x2);
      const top = randomNum(y1, y2);
      item.style.left = `${left}px`;
      item.style.top = `${top}px`;
      this.field.appendChild(item);
    }
  }

  onClick(event) {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      playSound(carrotSound);
      console.log(this.onItemClick);
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      this.onItemClick && this.onItemClick("bug");
    }
  }
}

function randomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function playSound(sound) {
  sound.play();
  sound.currentTime = 0;
}
