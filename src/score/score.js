export default class Score {
  constructor() {
    this.restartButtonElement = document.getElementById("restartButton");
    this.exitButtonElement = document.getElementById("exitButton");
    this.scoreLines = document.querySelectorAll('.score');
    this.names = document.querySelectorAll('.name');
    this.scores = JSON.parse(localStorage.getItem('tetris.scoreTable'));

    this.restartButtonElement.addEventListener("click", this.restart);
    this.exitButtonElement.addEventListener("click", this.exit);

    this.renderScore();
  }

  exit() {
    window.location.href = '../../index.html';
  }
  restart() {
    window.location.href = '../main/gamescreen.html';
  }

  renderScore() {
    this.scoreLines.forEach(line => line.innerHTML = '0');
    this.names.forEach(name => name.innerHTML = 'Unknown');
    if (this.scores.length > 0) {
      for (let x = 0; x < this.scores.length; x++) {
        this.names[x].innerHTML = this.scores[x].name
        this.scoreLines[x].innerHTML = this.scores[x].score;
      }
    }

  }
}
