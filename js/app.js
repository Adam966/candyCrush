let pos = new Array();
let board = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];

function start() {


  setupBoard(board);
  document.getElementById("scoreMain").innerHTML = "0";
  console.log(board);
}

function setupBoard(board) {
  let index = 0;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      board[i][j] = randomizer();
//      console.log("Array: " + i + j);
//      console.log("Index: " + index);
//      console.log(board[i][j]);
      document.getElementsByName('elm')[index].src = board[i][j];
      index++;
    }
  }
}

function randomizer() {

  const sign = "img/circle.png";
  const rect = "img/rectangle.png";
  const circ = "img/star.png";
  const crs  = "img/triangle.png";
  const str  = "img/cross.png";

  let rnd = Math.floor(Math.random() * 5) + 1;
//  console.log(rnd);

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

function getPos(x, y) {
  if (pos.length < 4) {
    pos.push(x);
    pos.push(y);
    console.log(pos);
	if(pos.length == 4)
	{
		console.log("Start change pos");
		changePos();
	}
    
  }
}

function changePos() {
if ((pos[0] == pos[2] && (pos[1] == pos[3]+1 || pos[1] == pos[3]-1 || pos[1] == pos[3])) || (pos[0] == pos[2]+1 && pos[1] == pos[3]) || (pos[0] == pos[2]-1 && pos[1] == pos[3]))
  {
    let temp = pos[0];
    pos[0] = pos[2];
    pos[2] = temp;

    temp = pos[1];
    pos[1] = pos[3];
    pos[3] = temp;
    console.log(pos);
    drawBoard(pos);
  }
  else{pos.length = 0;}
}

function drawBoard(pos) {
  let temp = board[pos[2]][pos[3]];
  board[pos[2]][pos[3]] = board[pos[0]][pos[1]];
  board[pos[0]][pos[1]] = temp;
  console.log(board);

  let index = 0;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      document.getElementsByName('elm')[index].src = board[i][j];
      index++;
    }
  }
  pos.length = 0;
}

let foundLane = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
let foundColumn = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
let workArray = [0,0,0,0,0,0,0,0,0];
let singlePoint = 0;
let doublePoint = 0;

function validateAll()
{
	console.log("Checking fruit1");
	checkFruit(1);
	//All fruit1 checked, move blocks, add points, check again
	resetLane(foundLane);
	console.log("Checking fruit2");
	checkFruit(2);
	//All fruit2 checked, move blocks, add points, check again
	resetLane(foundLane);
	console.log("Checking fruit3");
	checkFruit(3);
	//All fruit3 checked, move blocks, add points, check again
	resetLane(foundLane);
	console.log("Checking fruit4");
	checkFruit(4);
	//All fruit4 checked, move blocks, add points, check again
	resetLane(foundLane);
	console.log("Checking fruit5");
	checkFruit(4);
	//All fruit5 checked, move blocks, add points, check again
		resetLane(foundLane);
}
function checkFruit(fruit)
{
    let start =0;
	for (let k = 0; k < 8; k++)
	{
		console.log("kolo "+k);
		fillWorkArray(start);
		checkLane(workArray, fruit, k);
		console.log("-----");
		start+=8;
	}
}

function checkLane(array, what, k)
{
	let last1 = 0;
	let count = 0;
    for (let i = 0; i < array.length; i++) 
    {
        if (array[i] === what) 
        {
            foundLane[k][i] = 1;
            count++;
        }
        else
        {
           if(count<3)
           {
              for (let j=last1; j <= i; j++)
              {
                 foundLane[k][j] = 0;
              }
           }
           if(count>2){last1=i;}
           count=0;
        }
    }
	for (let i = 0; i < array.length; i++)
	{
		console.log(foundLane[k][i]);
	}
}

function checkColumn()
{
	
}

function fillWorkArray(start)
{
	let till = start+7;
	let count=0;
	for(start; start<=till; start++)
	{
		let temp = document.getElementById('elm'+start).getAttribute('src');
		if(temp == 'img/fruit1.png')
		{
			workArray[count] = 1;
		}
		else if(temp == 'img/fruit2.png')
		{
			workArray[count] = 2;
		}
		else if(temp == 'img/fruit3.png')
		{
			workArray[count] = 3;
		}
		else if(temp == 'img/fruit4.png')
		{
			workArray[count] = 4;
		}
		else if(temp == 'img/fruit5.png')
		{
			workArray[count] = 5;
		}
		count++;
	}
}
function resetLane(lane)
{
 for (let i = 0; i < 8; i++)
    {
        for (let j = 0; j < 8; j++)
	    {
		    foundLane[i][j] = 0;
	    }
    }
}
