import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, SCORE_LENGTH, POINTS, TETRAMINOID_NAMES, TETRAMINOID_ARRAY } from "../utilities.js";
import View from "./view.js";

export default class Game {

  constructor() {
    this.reset();
  }

  get level() {
    //return Math.floor(this.score * 0.1) + 1;
    return this.lines + 1;
  }

  getState() {
    const playfield = this.createPlayfield();
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < this.playfield.length; y++) {
      playfield[y] = [];

      for (let x = 0; x < this.playfield[y].length; x++) {
        playfield[y][x] = this.playfield[y][x];

      }
    }

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }

      }
    }

    return {
      level: this.level,
      score: this.score,
      lines: this.lines,
      nextPiece: this.nextPiece,
      playfield,
      isGameOver: this.topOut
    };
  }

  reset() {
    this.score = 0;
    this.lines = 0;
    this.topOut = false;
    this.playfield = this.createPlayfield();
    this.activePiece = this.createPiece();
    this.nextPiece = this.createPiece();
  }

  rotatePiece() {
    const blocks = this.activePiece.blocks;
    const length = blocks.length;

    const temp = [];
    for (let i = 0; i < length; i++) {
      temp[i] = new Array(length).fill(0);
    }

    for (let y = 0; y < length; y++) {
      for (let x = 0; x < length; x++) {
        temp[x][y] = blocks[length - 1 - y][x];
      }
    }

    this.activePiece.blocks = temp;

    if (this.hasCollision()) {
      this.activePiece.blocks = blocks;
    }
  }

  createPlayfield() {
    const playfield = [];
    for (let y = 0; y < PLAYFIELD_ROWS; y++) {
      playfield[y] = [];

      for (let x = 0; x < PLAYFIELD_COLUMNS; x++) {
        playfield[y][x] = 0;

      }
    }
    return playfield;
  }

  createPiece() {
    const index = Math.floor(Math.random() * 7);
    const type = TETRAMINOID_NAMES[index];
    const piece = {};
    piece.blocks = TETRAMINOID_ARRAY[type]
    piece.x = Math.floor((PLAYFIELD_COLUMNS - piece.blocks[0].length) / 2);
    piece.y = 0;
    return piece;
  }

  movePieceLeft() {
    this.activePiece.x -= 1;

    if (this.hasCollision()) {
      this.activePiece.x += 1;
    }
  }
  movePieceRight() {
    this.activePiece.x += 1;
    if (this.hasCollision()) {
      this.activePiece.x -= 1;
    }
  }
  movePieceDown() {

    if (this.topOut) return;

    this.activePiece.y += 1;
    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
      const clearedLines = this.clearLines();
      this.updateScore(clearedLines);
      this.updatePieces();
    }

    if (this.hasCollision()) {
      this.topOut = true;
    }

  }
  dropPieceDown() {
    while (!this.hasCollision()) {
      this.activePiece.y += 1;
    }
    this.activePiece.y -= 1;
    this.lockPiece();
    const clearedLines = this.clearLines();
    this.updateScore(clearedLines);
    this.updatePieces();

    if (this.hasCollision()) {
      this.topOut = true;
    }
  }
  hasCollision() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          blocks[y][x] &&
          ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) ||
            this.playfield[pieceY + y][pieceX + x])
        ) {
          return true;
        }


      }
    }
    return false;
  }
  lockPiece() {
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }

      }
    }
  }


  clearLines() {
    let lines = [];
    const rows = PLAYFIELD_ROWS;
    const columns = PLAYFIELD_COLUMNS;

    for (let y = rows - 1; y >= 0; y--) {

      let numberOfBlocks = 0;

      for (let x = 0; x < columns; x++) {
        if (this.playfield[y][x]) {
          numberOfBlocks++;
        }

      }
      if (numberOfBlocks === 0) {
        break;
      } else if (numberOfBlocks < columns) {
        continue;
      } else {
        lines.unshift(y);
      }

    }

    for (let index of lines) {
      this.playfield.splice(index, 1);
      this.playfield.unshift(new Array(columns).fill(0));
    }


    return lines.length;
  }

  updateScore(clearedLines) {
    if (clearedLines > 0) {
      this.score += POINTS[clearedLines] * (this.level + 1);
      this.lines += clearedLines;
    }
    
  }

  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }

  updateLocalStorage() {
    let scores = JSON.parse(localStorage['tetris.scoreTable']);
    if (scores.length < SCORE_LENGTH || parseInt(this.score) >= parseInt(scores[scores.length - 1])) {
      this.username = localStorage["tetris.username"];
      let flag = false;
      scores.forEach(temp => {
        if (temp.name === this.username) {
          if (temp.score < this.score) {
            temp.score = this.score;
          }
          flag = true;
        }
      })
      if (!flag) {
        let temp = {
          'score': this.score,
          'name': this.username
        }
        scores.push(temp);
      }
      scores.sort((a, b) => b.score - a.score);
      localStorage['tetris.scoreTable'] = JSON.stringify(scores);
    }

  }
}