import Game from './game.js';
import View from './view.js';
import Controller from './controller.js'
import Music from './music.js';

const root = document.querySelector('#root');
const game = new Game();
const music = new Music();
const view = new View(root, 320, 640, 20, 10);
const controller = new Controller(game, view, music);

window.game = game;
window.view = view;
window.controller = controller;
window.music = music;



