import { NEXT_PIECE_FIELD_SIZE, RENDER_LINE_WIDTH, RENDER_TEXT_GAP, COLORS } from "../utilities.js";

export default class View {


  constructor(element, width, height, rows, columns) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.canvas = document.querySelector('#canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;


    this.context = this.canvas.getContext('2d');

    this.username = localStorage["tetris.username"];

    this.usernameElement = document.querySelector('#username');
    this.usernameElement.innerHTML = `Player: ${this.username}`;

    this.nextPieceCells = document.querySelectorAll('.nextPiece>div')

    this.blockWidth = this.width / columns;
    this.blockHeight = this.height / rows;



  }

  renderMainScreen(state) {


    this.clearScreen();
    this.renderPlayfield(state);
    this.renderPanel(state);
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.clearNextPiece();
  }


  renderStartScreen() {
    this.context.fillStyle = 'white';
    this.context.font = '12px "Press Start 2P"';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('Press ENTER to Start', this.width / 2, this.height / 2);
    console.log('dsds');
  }

  renderPauseScreen() {
    this.context.fillStyle = 'rgba(0,0,0,0.75)';
    this.context.fillRect(0, 0, this.width, this.height);

    this.context.fillStyle = 'white';
    this.context.font = '12px "Press Start 2P"';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('Press ENTER to Resume', this.width / 2, this.height / 2);

  }

  renderEndScreen({ score }) {
    this.clearScreen();
    this.context.fillStyle = 'white';
    this.context.font = '18px';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText('Game Over', this.width / 2, this.height / 2 - RENDER_TEXT_GAP);
    this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
    this.context.fillText('Press ENTER to Restart', this.width / 2, this.height / 2 + RENDER_TEXT_GAP);
    this.context.fillText('or Press ESCAPE', this.width / 2, this.height / 2 + 2 * RENDER_TEXT_GAP);
  }

  renderPlayfield({ playfield }) {
    for (let y = 0; y < playfield.length; y++) {
      const line = playfield[y];

      for (let x = 0; x < line.length; x++) {
        const block = line[x];

        if (block) {
          this.renderBlock(
            x * this.blockWidth,
            y * this.blockHeight,
            this.blockWidth,
            this.blockHeight,
            COLORS[block]);
        }
      }
    }

    //this.context.strokeStyle = 'white';
    //this.context.lineWidth = this.playfieldBorderWidth;
    //this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
  }

  renderPanel({ level, score, nextPiece }) {

    this.levelElement = document.querySelector('#level');
    this.scoreElement = document.querySelector('#score');

    this.levelElement.innerHTML = `Level: ${level}`;
    this.scoreElement.innerHTML = `Score: ${score}`;

    this.clearNextPiece();
    this.renderNextPiece(nextPiece);
  }

  clearNextPiece() {
    this.nextPieceCells.forEach(cell => cell.style.backgroundColor = 'black');
  }

  renderNextPiece(nextPiece) {
    for (let y = 0; y < nextPiece.blocks.length; y++) {
      for (let x = 0; x < nextPiece.blocks[y].length; x++) {
        const block = nextPiece.blocks[y][x];
        if (block) {
          const cellIndex = y * NEXT_PIECE_FIELD_SIZE + x;
          this.nextPieceCells[cellIndex].style.backgroundColor = COLORS[block];
        }
      }
    }
  }

  renderBlock(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = 'black';
    this.context.lineWidth = RENDER_LINE_WIDTH;

    this.context.fillRect(x, y, width, height);
    this.context.strokeRect(x, y, width, height);
  }
}