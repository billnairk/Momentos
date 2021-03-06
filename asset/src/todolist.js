const toDoListMain = document.querySelector(".js-todolist--main"),
  toDoListTitle = document.querySelector(".js-todolist__title"),
  toDosOrder = document.querySelector(".js-todos-order"),
  toDoList = document.querySelector(".js-todolist__ul"),
  toDoForm = document.querySelector(".js-todoform"),
  toDoInput = document.querySelector(".js-todoinput"),
  toDoUlContainer = document.querySelector(".js-ulcontainer"),
  toDoTitleOpen = document.querySelector(".js-titlebtn");

const TODOS_LS = "todos";
let toDos = [];

// 로컬스토리지 저장
function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

// 체크버튼(완료)
// target = input[type="checkbox"]
function toDoChecked(target) {
  const div = target.parentNode
  // toDoId 값으로 오브젝트의 인덱스 값 추출
  const toDoIdFromIndex = toDos.findIndex(
    (i) => i.toDoId == div.parentNode.dataset.id
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
// target = delBtn
function toDoDelete(target) {
  const div = target.parentNode
  const li = div.parentNode;
  toDoList.removeChild(li);
  const refreshToDos = toDos.filter(function (toDo) {
    return parseInt(li.dataset.id) !== toDo.toDoId;
  });
  toDos = refreshToDos;
  saveToDos();
}

// 수정버튼
// target = editBtn
// selection은 target의 텍스트를 선택하고, 커서 위치를 정하기 위해 사용
function toDoEdit(target) {
  const div2 = target.parentNode; // div2 = 버튼 DIV
  const div1 = div2.previousSibling; //div1 = span있는 태그
  const content = div1.childNodes[1]; //span 태그
  content.setAttribute("contentEditable", "true");
  const caret = window.getSelection();
  caret.selectAllChildren(content);
  caret.collapseToEnd();
  content.addEventListener("keydown", (typing) => {
    if (typing.key == "Enter") {
      const toDoIdFromIndex = toDos.findIndex(
        (i) => i.toDoId == div2.parentNode.dataset.id
      );
      content.setAttribute("contentEditable", "false");
      toDos[toDoIdFromIndex].toDoText = content.innerText.trim();
      saveToDos();
    }
  });
  content.addEventListener("blur", (typing) => {
    const toDoIdFromIndex = toDos.findIndex(
      (i) => i.toDoId == div2.parentNode.dataset.id
    );
    content.setAttribute("contentEditable", "false");
    toDos[toDoIdFromIndex].toDoText = content.innerText.trim();
    saveToDos();
  });
  saveToDos();
}

function paintToDoList(toDo, toDoId, checked) {
  const li = document.createElement("li");
  const leftColumn = document.createElement("div")
  const rightColumn = document.createElement("div")
  const span = document.createElement("span");
  span.innerText = toDo.trim();
  span.setAttribute("class", "todo-content");
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
    toDoText: toDo.trim(),
    checked: checked,
  };
  li.setAttribute("data-id", `${toDoId}`);
  leftColumn.appendChild(checkBox);
  leftColumn.appendChild(span);
  rightColumn.appendChild(editBtn);
  rightColumn.appendChild(delBtn);
  li.appendChild(leftColumn);
  li.appendChild(rightColumn);
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

function toDoTitleBtn() {
  const titleBtnStatus = toDoUlContainer.style.visibility;
  if (titleBtnStatus == "" || titleBtnStatus == "hidden") {
    toDoUlContainer.style.visibility = "visible";
  } else if (titleBtnStatus == "visible") {
    toDoUlContainer.style.visibility = "hidden";
  }
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
  toDoTitleOpen.addEventListener("click", toDoTitleBtn);
  toDoList.addEventListener("click", (e) => {
    // const div = e.target.parentNode
    // const target = div.target;
    const target = e.target;
    // console.log(target)
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
