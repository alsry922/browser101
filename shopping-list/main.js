const input = document.querySelector("input");
const circle = document.querySelector(".circle-box");
const main = document.querySelector("ul");

let listNum = 0;

input.addEventListener("keyup", () => {
  if (window.event.keyCode === 13) {
    addList();
  }
});

circle.addEventListener("click", addList);

function addList() {
  if (input.value === "") return;

  listNum += 1;
  const list = document.createElement("li");
  list.setAttribute("id", listNum);
  list.innerHTML = `
  <span>${input.value}</span>
  <span class='trash'><i class="fas fa-trash-alt"></i></span>
  `;
  main.appendChild(list);
  input.value = "";
}
