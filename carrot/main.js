const start = document.querySelector(".user-interface__start");
const stop = document.querySelector(".user-interface__stop");
const footer = document.querySelector(".footer");

start.addEventListener("click", () => {
  start.style.display = "none";
  stop.style.display = "block";
  loadAnt();
  loadCarrot();
});

function loadAnt() {
  for (let i = 0; i < 10; i++) {
    const ant = document.createElement("img");
  }
}
