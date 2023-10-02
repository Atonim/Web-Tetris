let usernameElement = document.getElementById("username")
let startButtonElement = document.getElementById("startButton")
let formElement = document.getElementById("form")

usernameElement.addEventListener("input", checkUsernameInput)
formElement.addEventListener("submit", saveUsername)

function checkUsernameInput(event) {
  if (usernameElement.value.length === 0) {
    startButtonElement.setAttribute("disabled", "disable")
  } else {
    startButtonElement.removeAttribute("disabled")
  }
}

function saveUsername(event) {
  localStorage["tetris.username"] = usernameElement.value
  if (localStorage["tetris.scoreTable"] === undefined) {
    localStorage["tetris.scoreTable"] = JSON.stringify([])
  }
}

function readUsername(event) {
  console.log(usernameElement.value);
  if (localStorage["tetris.username"]) {
    usernameElement.value = localStorage["tetris.username"];
  }

}

readUsername();
checkUsernameInput();