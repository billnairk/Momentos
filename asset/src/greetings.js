const greetings = document.querySelector(".js-greetings");

// MEMBERINFO_LS = "memberinfo" -> member.js

function showGreetings() {
  const loadedLs = localStorage.getItem(MEMBERINFO_LS);
  const currentUser = JSON.parse(loadedLs)[0].id;
  greetings.innerText = `안녕하세요, ${currentUser}님`;
}

function handleSubmitGreetings() {
  greetings.style.display = "block";
  showGreetings();
}

function init() {
  formLogin.addEventListener("submit", handleSubmitGreetings);
}

init();
