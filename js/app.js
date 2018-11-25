$(document).ready(function(){

});

function start() {
  let board = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];

  randomizer();
  setupBoard(board);

  console.log(board);
}

function setupBoard(board) {
  let index = 0;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      board[i][j] = randomizer();
      document.getElementsByName('elm')[index].innerHTML = board[i][j];
      index++;
    }
  }
}

function randomizer() {

  const sign = '⌘';
  const rect = '▯';
  const circ = '◉';
  const crs  = 'X';
  const str  = '★';

  let rnd = Math.floor(Math.random() * 5) + 1;
  console.log(rnd);

  switch (rnd) {
    case 1:
      return sign;
      break;
    case 2:
      return rect;
      break;
    case 3:
      return circ;
      break;
    case 4:
      return crs;
    case 5:
      return str;
      break;
  }
}
