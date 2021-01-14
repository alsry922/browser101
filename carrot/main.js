const start = document.querySelector(".user-interface__start");
const stop = document.querySelector(".user-interface__stop");
const playBox = document.querySelector(".play-box");
const playBoxRect = playBox.getBoundingClientRect();
const popUp = document.querySelector(".pop-up");
const bgAudio = new Audio("sound/bg.mp3");
const carrotAudio = new Audio("sound/carrot_pull.mp3");
const bugAudio = new Audio("sound/bug_pull.mp3");
const WinAudio = new Audio("sound/game_win.mp3");
const reDo = document.querySelector(".redo");
const timer = document.querySelector(".user-interface__timer");
const remainder = document.querySelector(".user-interface__remainder");
const message = popUp.querySelector(".message");
let time = 10;
let clock;

bgAudio.addEventListener("ended", () => {
  this.currentTime = 0;
  this.play();
});

playBox.addEventListener("click", (event) => {
  const carrots = playBox.querySelectorAll(".carrot");
  if (carrots.length == 0) {
    WinAudio.play();
    message.textContent = `YOU WIN🎉`;
    bgAudio.currentTime = 0;
    bgAudio.pause();
  }
  if (event.target.dataset.id) {
    carrotAudio.play();
    event.target.remove();
  }
});

reDo.addEventListener("click", () => {
  const carrots = playbox.querySelectorAll(".carrots");
  if (time === 0 || carrots.length == 0) {
    startGame();
  }
  bgAudio.play();
  popUp.style.display = "none";
  clock = setInterval(loadTimer, 1000);
});

start.addEventListener("click", startGame);

stop.addEventListener("click", () => {
  popUp.style.display = "block";
  message.textContent = "resume❓";
  clearInterval(clock);
  bgAudio.pause();
});
function startGame() {
  start.style.display = "none";
  stop.style.display = "block";
  loadCarrot();
  loadAnt();
  clock = setInterval(loadTimer, 1000);
  bgAudio.play();
}
function loadAnt() {
  for (let i = 0; i < 10; i++) {
    const ant = document.createElement("img");
    const x = Math.floor(
      Math.random() * (playBoxRect.right - playBoxRect.left) + playBoxRect.left
    );
    const y = Math.floor(
      Math.random() * (playBoxRect.bottom - playBoxRect.top) + playBoxRect.top
    );
    ant.setAttribute("class", "ant");
    ant.setAttribute("src", "img/bug.png");
    ant.style.left = `${x}px`;
    ant.style.top = `${y}px`;
    playBox.appendChild(ant);
  }
}

function loadCarrot() {
  for (let i = 0; i < 10; i++) {
    const carrot = document.createElement("img");
    const x = Math.floor(
      Math.random() * (playBoxRect.right - playBoxRect.left) + playBoxRect.left
    );
    const y = Math.floor(
      Math.random() * (playBoxRect.bottom - playBoxRect.top) + playBoxRect.top
    );
    carrot.setAttribute("class", "carrot");
    carrot.setAttribute("src", "img/carrot.png");
    carrot.setAttribute("data-id", i);
    carrot.style.left = `${x}px`;
    carrot.style.top = `${y}px`;
    playBox.appendChild(carrot);
  }
}

function loadTimer() {
  timer.textContent = `00:${time}`;
  time--;
  if (time < 0) {
    popUp.style.display = "block";
    message.textContent = `YOU LOST😜`;
    bgAudio.currentTime = 0;
    bgAudio.pause();
    clearInterval(clock);
    time = 10;
  }
}
