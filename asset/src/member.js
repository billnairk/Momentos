// member.js 기능 (초기 로그인 화면)
// 0. LOGIN & GUEST LOGIN -> .js-member(로그인창) 사라짐
// 1. ID & PW 저장소에 저장

const member = document.querySelector(".js-member"),
  loginBtn = document.querySelector(".member__login__btn"),
  inputId = document.querySelector(".login-id"),
  inputPw = document.querySelector(".login-pw"),
  formLogin = document.querySelector(".form__login");

const MEMBERINFO_LS = "memberinfo";
let memberList = [];

function memberSave() {
  localStorage.setItem(MEMBERINFO_LS, JSON.stringify(memberList) || "[]");
}

function memberLoad() {
  const loadedLs = localStorage.getItem(MEMBERINFO_LS);
  if (loadedLs !== null) {
    const loadedMemberInfo = JSON.parse(loadedLs);
    loadedMemberInfo.forEach(function (members) {
      // 새로고침시 memberList가 비어 기존 저장된 정보가 삭제되는 것을 방지
      // memberList.push(members);
    });
  }
}

// 함수 이름 더 나은 것으로 바꾸기
function registerOrLogin(id, pwd) {
  member.style.color = "blue";
  member.style.display = "none";
  const memberObj = {
    id,
    pwd,
  };
  // memberList에 저장된 id, pw값과 비교해서 다르면 저장
  // 1. id, pw 값이 같으면 로그인
  // 2. id는 같으나 pw가 다르면 비밀번호가 틀렸다는 팝업창
  // 3. id가 다르면 새 ID 생성
  memberList.push(memberObj);
  memberSave();
  inputId.value = "";
  inputPw.value = "";
}

function handleSubmitMember(e) {
  e.preventDefault();
  registerOrLogin(inputId.value, inputPw.value);
}

function init() {
  memberLoad();
  formLogin.addEventListener("submit", handleSubmitMember);
}

init();
