const toDoListMain = document.querySelector(".js-todolist--main"),
  toDoListTitle = document.querySelector(".js-todolist__title"),
  toDosOrder = document.querySelector(".js-todos-order"),
  toDoList = document.querySelector(".js-todolist__ul"),
  toDoForm = document.querySelector(".js-todoform"),
  toDoInput = document.querySelector(".js-todoinput");

const TODOS_LS = "todos";
let toDos = [];

// 로컬스토리지 저장
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// 체크버튼(완료)
function toDoChecked(target) {
  // toDoId 값으로 오브젝트의 인덱스 값 추출
  const toDoIdFromIndex = toDos.findIndex(
    (i) => i.toDoId == target.parentNode.dataset.id
  );
  if (target.classList.contains("checked")) {
    target.classList.remove("checked");
    toDos[toDoIdFromIndex].checked = 0;
    saveToDos();
  } else {
    target.classList.add("checked");
    toDos[toDoIdFromIndex].checked = 1;
    saveToDos();
  }
}

// 삭제버튼
function toDoDelete(target) {
  const li = target.parentNode;
  toDoList.removeChild(li);
  const refreshToDos = toDos.filter(function (toDo) {
    return parseInt(li.dataset.id) !== toDo.toDoId;
  });
  toDos = refreshToDos;
  saveToDos();
}

// 수정버튼
function toDoEdit() {
  console.log("Edit Btn");
}

function paintToDoList(toDo, toDoId, checked) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = toDo;
  const editBtn = document.createElement("button");
  editBtn.classList.add("editBtn");
  editBtn.setAttribute("data-type", "edit");
  const delBtn = document.createElement("button");
  delBtn.classList.add("delBtn");
  delBtn.setAttribute("data-type", "delete");
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  const toDoObj = {
    toDoId: toDoId,
    toDoText: toDo,
    checked: checked,
  };
  li.setAttribute("data-id", `${toDoId}`);
  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
  toDos.push(toDoObj);
  if (checked === 1) {
    checkBox.setAttribute("class", "checked");
    checkBox.setAttribute("checked", "checked");
  }
  saveToDos();
}

function styleToDolist() {
  toDoListMain.style.display = "block";
}

function handleSubmitToDo(e) {
  e.preventDefault();
  const toDoDate = new Date();
  const toDoId = toDoDate.getTime();
  paintToDoList(toDoInput.value, toDoId, 0);
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
      paintToDoList(toDo.toDoText, toDo.toDoId, toDo.checked);
    });
  }
}

function init() {
  formLogin.addEventListener("submit", handleSubmitToDoList);
  toDoForm.addEventListener("submit", handleSubmitToDo);
  toDoList.addEventListener("click", (e) => {
    const target = e.target;
    if (target.dataset.type === "edit") {
      toDoEdit(target);
    } else if (target.dataset.type === "delete") {
      toDoDelete(target);
    } else if (target.type === "checkbox") {
      toDoChecked(target);
    }
  });
}

init();
