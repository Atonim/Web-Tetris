import Game from './game.js';
import View from './view.js';
import Controller from './controller.js'
import { PLAYFIELD_COLUMNS, PLAYFIELD_HEIGHT, PLAYFIELD_ROWS, PLAYFIELD_WIDTH } from '../utilities.js';

const root = document.querySelector('#root');
const game = new Game();
const view = new View(root, PLAYFIELD_WIDTH, PLAYFIELD_HEIGHT, PLAYFIELD_ROWS, PLAYFIELD_COLUMNS);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;



