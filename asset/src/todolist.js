const toDoListMain = document.querySelector(".js-todolist--main"),
  toDoListTitle = document.querySelector(".js-todolist__title"),
  toDosOrder = document.querySelector(".js-todos-order"),
  toDoList = document.querySelector(".js-todolist__ul"),
  toDoForm = document.querySelector(".js-todoform"),
  toDoInput = document.querySelector(".js-todoinput");

const TODOS_LS = "todos";
const toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function handleChecked(span) {
  span.style.textDecoration = "underline";
  console.log("hi");
}

function paintToDoList(todo, toDoId) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const editBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const checkBox = document.createElement("input");
  const toDoObj = {
    toDoId: toDoId,
    toDoText: todo,
  };
  span.innerText = todo;
  checkBox.type = "checkbox";
  editBtn.classList.add("editBtn");
  delBtn.classList.add("delBtn");
  delBtn.addEventListener("click", handleChecked(span));
  // checkBox.addEventListener("click", handleChecked(span));
  li.id = toDoId;
  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
  toDos.push(toDoObj);
  saveToDos();
}

function styleToDolist() {
  toDoListMain.style.display = "block";
}

function handleSubmitToDo(e) {
  e.preventDefault();
  const toDoDate = new Date();
  const toDoId = toDoDate.getTime();
  paintToDoList(toDoInput.value, toDoId);
  toDoInput.value = "";
}

// TODO INPUT (x)
function handleSubmitToDoList() {
  styleToDolist();
  loadToDos();
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDoList(toDo.toDoText, toDo.toDoId);
    });
  }
}

function init() {
  formLogin.addEventListener("submit", handleSubmitToDoList);
  toDoForm.addEventListener("submit", handleSubmitToDo);
}

init();
