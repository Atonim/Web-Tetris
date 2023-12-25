import { MIN_TIMER, SECOND, TIMER_DIFFERENCE } from "../utilities.js";

export default class Controller {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.isPlaying = false;
    this.intervalId = null;
    this.level = this.game.getState().level;
    document.addEventListener('keydown', this.handleKeyDown.bind(this));

    this.view.renderStartScreen();
  }

  update() {
    this.game.movePieceDown();
    this.updateView();
  }

  pause() {
    this.isPlaying = false;
    this.stopTimer();
    this.updateView();
  }

  play() {
    //this.inMenu = false;
    this.isPlaying = true;
    this.startTimer();
    this.updateView();
  }

  reset() {
    this.game.reset();
    this.play();
  }

  updateView() {
    const state = this.game.getState();
    if (this.level != this.game.getState().level) {
      this.level = this.game.getState().level;
      this.stopTimer();
      this.startTimer();
    }
    if (state.isGameOver) {
      this.stopTimer();
      this.game.updateLocalStorage();
      this.view.renderEndScreen(state);
      this.isPlaying = false;
    }
    else if (!this.isPlaying) {
      this.view.renderPauseScreen();
    } else {
      this.view.renderMainScreen(this.game.getState());

    }

  }

  startTimer() {

    let speed = SECOND - (this.game.getState().level - 1) * TIMER_DIFFERENCE;
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.update();
        console.log(speed);
      }, speed > 0 ? speed : MIN_TIMER);
    }

  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  handleKeyDown(event) {
    const state = this.game.getState();
    switch (event.key) {
      case "Enter":
        if (state.isGameOver) {
          this.reset();
        }
        else if (this.isPlaying) {
          this.pause();
        }
        else {
          this.play();
        }
        break;
      case "A":
      case "ArrowLeft":
        if (this.isPlaying) {
          this.game.movePieceLeft();
          this.updateView();
        }
        break;
      case "W":
      case "ArrowUp":
        if (this.isPlaying) {
          this.game.rotatePiece();
          this.updateView();
        }
        break;
      case "D":
      case "ArrowRight":
        if (this.isPlaying) {
          this.game.movePieceRight();
          this.updateView();
        }
        break;
      case "S":
      case "ArrowDown":
        if (this.isPlaying) {
          this.game.movePieceDown();
          this.updateView();
        }
        break;
      case " ":
        if (this.isPlaying) {
          this.game.dropPieceDown();
          this.updateView();
        }
        break;
      case "Escape":
        if (state.isGameOver) {
          window.location.href = '/src/score/score.html';
        }
        break;
    }
  }
}