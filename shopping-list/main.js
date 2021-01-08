const items = document.querySelector(".items");
const input = document.querySelector(".footer__input");
const addBtn = document.querySelector(".footer__button");

addBtn.addEventListener("click", addItem);

function addItem() {
  // input값 가져오기
  const text = input.value;
  if (text === "") {
    input.focus();
    return;
  }
  // item 만들기
  const item = createItem(text);
  // item 추가하기
  items.appendChild(item);
  // item 스크롤 따라오게 만듦
  item.scrollIntoView();
  // input값 비우기
  input.value = "";
  // focus 유지하기
  input.focus();
}

function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item-row");

  const item = document.createElement("div");
  item.setAttribute("class", "item");

  const name = document.createElement("span");
  name.setAttribute("class", "item__name");
  name.innerText = text;

  const delBtn = document.createElement("button");
  delBtn.setAttribute("class", "item__button");
  delBtn.innerHTML = `<i class="fas fa-trash-alt"></i>
  `;
  delBtn.addEventListener("click", () => {
    items.removeChild(itemRow);
  });

  const divider = document.createElement("div");
  divider.setAttribute("class", "divider");

  item.appendChild(name);
  item.appendChild(delBtn);
  itemRow.appendChild(item);
  itemRow.appendChild(divider);
  return itemRow;
}

input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addItem();
  }
});
