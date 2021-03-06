const clock = document.querySelector(".js-clock");

function loadClock() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // const seconds = date.getSeconds();
  // clock.innerHTML = `${hours < 10 ? `0${hours}` : hours} : ${
  //   minutes < 10 ? `0${minutes}` : minutes
  // } : ${seconds < 10 ? `0${seconds}` : seconds}`;
  clock.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

function handleSubmitClock() {
  clock.style.display = "block";
  loadClock();
}

function init() {
  formLogin.addEventListener("submit", handleSubmitClock);
  loginBtnGuest.addEventListener("click", handleSubmitClock);
  setInterval(loadClock, 1000);
}

init();
