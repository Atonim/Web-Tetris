export const PLAYFIELD_COLUMNS = 10;
export const PLAYFIELD_ROWS = 20;
export const PLAYFIELD_WIDTH = 320;
export const PLAYFIELD_HEIGHT = 640;

export const NEXT_PIECE_FIELD_SIZE = 4;

export const RENDER_LINE_WIDTH = 2;
export const RENDER_TEXT_GAP = 48;

export const SCORE_LENGTH = 10;

export const SECOND = 1000;
export const TIMER_DIFFERENCE = 100;
export const MIN_TIMER = 100;

export const COLORS = {
  '1': 'cyan',
  '2': 'blue',
  '3': 'orange',
  '4': 'yellow',
  '5': 'green',
  '6': 'purple',
  '7': 'white'
};

export const POINTS = {
  '1': 40,
  '2': 100,
  '3': 300,
  '4': 1200,
}

export const TETRAMINOID_NAMES = 'IJLOSTZ';
export const TETRAMINOID_ARRAY = {
  'I': [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  'J': [
    [0, 0, 0],
    [2, 2, 2],
    [0, 0, 2]
  ],
  'L': [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]
  ],
  'O': [
    [0, 0, 0, 0],
    [0, 4, 4, 0],
    [0, 4, 4, 0],
    [0, 0, 0, 0]
  ],
  'S': [
    [0, 0, 0],
    [0, 5, 5],
    [5, 5, 0]
  ],
  'T': [
    [0, 0, 0],
    [6, 6, 6],
    [0, 6, 0]
  ],
  'Z': [
    [0, 0, 0],
    [7, 7, 0],
    [0, 7, 7]
  ]
};