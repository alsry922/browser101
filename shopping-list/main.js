const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

let id = 0;

addBtn.addEventListener("click", addItem);
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addItem();
  }
});

items.addEventListener("click", (event) => {
  if (event.target.nodeName === "I") {
    const id = event.target.dataset.id;
    const list = document.querySelector(`.item-row[data-id='${id}']`);
    list.remove();
  }
});

function addItem() {
  const text = input.value;
  if (text === "") {
    input.focus();
    return;
  }
  const item = createItem(text);
  items.appendChild(item);
  item.scrollIntoView();
  input.value = "";
  input.focus();
}

function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item-row");
  itemRow.setAttribute("data-id", id);

  itemRow.innerHTML = `
  <div class="item">
    <span class="item__name">${text}</span>
    <button class="item__button">
      <i class="fas fa-trash-alt" data-id=${id}></i>
    </button>
  </div>
  <div class="divider"></div>
`;
  id++;

  return itemRow;
}
