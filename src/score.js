let restartButtonElement = document.getElementById("restartButton");
let exitButtonElement = document.getElementById("exitButton");
let scoreLines = document.querySelectorAll('.score');
let dots = document.querySelectorAll('.dots');
let names = document.querySelectorAll('.name');
let scores = JSON.parse(localStorage.getItem('tetris.scoreTable'));
console.log(scores);

restartButtonElement.addEventListener("click", restart)
exitButtonElement.addEventListener("click", exit)

function exit(event) {
  window.location.href = '../index.html';
}
function restart(event) {
  window.location.href = './gamescreen.html';
}

function update() {

}

function renderScore() {
  scoreLines.forEach(line => line.innerHTML = '0');
  names.forEach(name => name.innerHTML = 'Unknown');
  if (scores.length > 0) {
    for (let x = 0; x < scores.length; x++) {
      names[x].innerHTML = scores[x].name
      scoreLines[x].innerHTML = scores[x].score;
    }
  }

}

renderScore();