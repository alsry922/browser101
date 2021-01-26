const start = document.querySelector(".game__button");
const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const widthMax = fieldRect.right;
const widthMin = fieldRect.left;
const heightMax = fieldRect.bottom;
const heightMin = fieldRect.top;
console.log(widthMax, widthMin, heightMax, heightMin);

start.addEventListener("click", init);

function getRandomNum(max, min, range) {
  return Math.floor(Math.random() * (max - min - range) + min);
}

function createCarrot() {
  for (let i = 0; i < 5; i++) {
    // const carrot = document.createElement("div");
    const carrot = document.createElement("img");
    carrot.setAttribute("src", "img/carrot.png");
    carrot.setAttribute("class", "carrot");
    carrot.setAttribute("id", i);
    // const widthRange = carrot.style.width;
    // const heightRange = carrot.style.height;
    // console.log(widthRange, heightRange);
    carrot.style.position = "absolute";
    carrot.style.left = getRandomNum(widthMax, widthMin, 80) + "px";
    carrot.style.top = getRandomNum(heightMax, heightMin, 80) + "px";
    // carrot.appendChild(img);
    field.appendChild(carrot);
  }
}

function createAnt() {
  for (let i = 0; i < 5; i++) {
    const ant = document.createElement("img");
    ant.setAttribute("class", "ant");
    ant.setAttribute("id", i);
    ant.setAttribute("src", "img/bug.png");
    // const widthRange = ant.style.width;
    // const heightRange = ant.style.height;
    ant.style.position = "absolute";
    ant.style.left = getRandomNum(widthMax, widthMin, 50) + "px";
    ant.style.top = getRandomNum(heightMax, heightMin, 50) + "px";
    field.appendChild(ant);
  }
}

function init() {
  createCarrot();
  createAnt();
}
