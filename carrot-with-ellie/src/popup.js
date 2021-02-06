"use strict";

export default class PopUp {
  constructor() {
    this.gamePopUp = document.querySelector(".pop-up");
    this.popUpMessage = document.querySelector(".pop-up__message");
    this.popUpRefresh = document.querySelector(".pop-up__refresh");
    this.popUpRefresh.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  hide() {
    this.gamePopUp.classList.add("pop-up--hide");
  }

  showWithText(text) {
    this.gamePopUp.classList.remove("pop-up--hide");
    this.popUpMessage.textContent = text;
  }
}
