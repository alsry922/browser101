"use strict";

export default class Field {
  constructor() {
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener("click", (event) => {
      this.onFieldClick && this.onFieldClick(event);
    });
  }

  setClickListener(onFieldClick) {
    this.onFieldClick = onFieldClick;
  }

  initField() {
    this.field.innerHTML = "";
  }

  addItem(className, count, imagePath, imgSize) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - imgSize;
    const y2 = this.fieldRect.height - imgSize;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imagePath);
      item.style.position = "absolute";
      const left = this.randomNum(x1, x2);
      const top = this.randomNum(y1, y2);
      item.style.left = `${left}px`;
      item.style.top = `${top}px`;
      this.field.appendChild(item);
    }
  }

  randomNum(min, max) {
    return Math.random() * (max - min) + min;
  }
}
