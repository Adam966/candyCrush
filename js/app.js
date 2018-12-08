let pos = new Array();
let idTemp = new Array();
let board = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
let music = false;

//Start function run when game is started
function start() 
{
  setupBoard(board);
  timer();
  console.log(board);

}

//when is game over reset function go to the menu page
function reset() {
  window.location.href = 'index.html';
}

//timer start
function timer() {
  let time = document.getElementById("progress");
  let width = 0;
  let interval = setInterval(frame, 1);

  function frame() {
    if (width >= 100) {
      clearInterval(interval);
	  $("#gameOverBkg").fadeIn("slow");
	 /* let filterBlur='blur(5px)';
	  $("body").css('filter',filterBlur);*/
	  console.log("test");
    }
    else {
      width+=0.0010;
      time.style.width = width + '%';
    }
  }
}

//on/off audio
function checkAudio() {
  let song = document.getElementById("song");

  if (!music) {
    song.play();
    music=true;
  }
  else {
    song.pause();
    music=false;
  }
}

//render the board with random symbols
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

//choose random symbols for setupBoard
function randomizer() {

  const sign = "img/fruit1.png";
  const rect = "img/fruit2.png";
  const circ = "img/fruit3.png";
  const crs  = "img/fruit4.png";
  const str  = "img/fruit5.png";

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

let workArray = [0,0,0,0,0,0,0,0,0]; //This array stores the current lane or column, the verification works with
let verified = [0,0,0,0,0,0,0,0,0]; //Stores 1 where the algorithm found continuous images 
let fruitType1=0; //Stores number of the fruit(first block selected by the user)
let fruitType2=0; //Stores number of the fruit(second block selected by the user)

//get position of clicked element on board
function getPos(x, y, id) {
  if (pos.length < 4) {
    pos.push(x);
    pos.push(y);
	idTemp.push(id);
    console.log("first "+pos);
	console.log("ID= "+idTemp);
	if(pos.length == 4)
	{
		console.log("Start change pos");
		changePos();
	
		//verify();
		setTimeout(verify, 300) //After changing the two blocks selected by the user,  start verification
		//pos.length = 0;
	}
  }
}

function verify() //Verifies columns, lanes, stores found values in verified -array for a limited time 
{
		fruitType1 = getType(document.getElementById(idTemp[0]).getAttribute('src')); //Gets the type of the first fruit (number 1-5)
	    fruitType2 = getType(document.getElementById(idTemp[1]).getAttribute('src')); //Gets the type of the second fruit (number 1-5)
		let first = 0; //first-sixth stores returned values, found-1, not found-0
		let second = 0;	
        let third = 0;
        let fourth = 0;	
        let fifth = 0;
        let sixth = 0;	
		
		if(pos[0] == pos[2]) 
		{
			fillWorkLane(pos[0]);
			
			//------------------------------------------------------LANE------------------------------------------------------
			first = checkLane(workArray, fruitType1); //This checks fruit type X (first fruit clicked by the user) and returns 1 if found 3 or more times
			if(first == 1) //The searched fruit type found 3 or more times following each other
			{
				/*
				   Count the 1-s in "verified" array, there will be 3 or more, add points
				   pos[0] stores value that which line we are checking, if for example pos[0]=2 then we work with board[2][0-8], this is the third lane from the table
				   board[lane][column] (like x,y points to one block from the table) stores all value of the table (images) example, board[3][1] - this points to the fourth line second block in line.
				
				   EXAMPLE
				   pos[0] = 2;
				   verified = [0,0,1,1,1,1,0,0,0];
				   
				   you can replace blocks for example to empty image, verified array stores the postions (1)
				   for(int i=0; i<8; i++)
				   {
					   if(verified[i] == 1)
					   {
						   board[pos[0]][i] = "img/empty.png";
					   }
				   }
				   this replaces on the board 
				   board[2][0] = "img/fruit1.png";
				   board[2][1] = "img/fruit5.png";
				   board[2][2] = "img/empty.png";
				   board[2][3] = "img/empty.png";
				   board[2][4] = "img/empty.png";
				   board[2][5] = "img/fruit4.png";
				   board[2][6] = "img/fruit2.png";
				   board[2][7] = "img/fruit1.png";
				   
				*/
				console.log("FOUND1");
				resetArray(verified);
				
			}
			resetArray(verified);
			
			second = checkLane(workArray, fruitType2);
			if(second == 1)
			{
				//do smthing with the items
				console.log("FOUND2");
				resetArray(verified);
			}
			resetArray(verified);
			
			//check column 1
			//---------------------------FROM THERE THE ITEMS IN THE ARRAY IS NOT FROM A LANE, BUT FROM A COLUMN---------------------------
			fillWorkColumn(pos[1]); // <------------------------pos[1]
			third = checkLane(workArray, fruitType1);
			if(third == 1)
			{
				/*
				EXAMPLE
				   pos[1] = 2;
				   verified = [0,0,1,1,1,1,0,0,0];
				   
				   you can replace blocks for example to empty image, verified array stores the postions (1)
				   for(int i=0; i<8; i++)
				   {
					   if(verified[i] == 1)
					   {
						   board[i][pos[1]] = "img/empty.png";
					   }
				   }
				   this replaces on the board 
				   board[0][2] = "img/fruit1.png";
				   board[1][2] = "img/fruit5.png";
				   board[2][2] = "img/empty.png";
				   board[3][2] = "img/empty.png";
				   board[4][2] = "img/empty.png";
				   board[5][2] = "img/fruit4.png";
				   board[6][2] = "img/fruit2.png";
				   board[7][2] = "img/fruit1.png";
				*/
				//do smthing with the items
				console.log("FOUND3");
				resetArray(verified);
			}
			resetArray(verified);
			
			fourth = checkLane(workArray, fruitType2);
			if(fourth == 1)
			{
				//do smthing with the items
				console.log("FOUND4");
				resetArray(verified);
			}
			resetArray(verified);
			//check column 2
			fillWorkColumn(pos[3]);// <------------------------pos[3]
			fifth = checkLane(workArray, fruitType1);
			if(fifth == 1)
			{
				//do smthing with the items
				console.log("FOUND5");
				resetArray(verified);
			}
			resetArray(verified);
			
			sixth = checkLane(workArray, fruitType2);
			if(sixth == 1)
			{
				//do smthing with the items
				console.log("FOUND6");
				resetArray(verified);
			}
			if(first == 0 && second == 0 && third == 0 && fourth == 0 && fifth == 0 && sixth == 0)
			{
				console.log("NOTHIN FOUND");
				changePos();
				resetArray(verified);
			}
			resetArray(workArray);
			idTemp = new Array();
			pos.length = 0;
		}
		
		if(pos[1] == pos[3] && pos[0] != pos[2])
		{
			fillWorkLane(pos[0]);// <------------------------pos[0]
			//------------------------------------------------------LANE------------------------------------------------------
			first = checkLane(workArray, fruitType1);
			if(first == 1)
			{
				//do smthing with the items
				console.log("FOUND1");
				resetArray(verified);
				
			}
			resetArray(verified);
			
			second = checkLane(workArray, fruitType2);
			if(second == 1)
			{
				//do smthing with the items
				console.log("FOUND2");
				resetArray(verified);
			}
			resetArray(verified);
			
			fillWorkLane(pos[2]);// <------------------------pos[2]
			
			third = checkLane(workArray, fruitType1);
			if(third == 1)
			{
				//do smthing with the items
				console.log("FOUND3");
				resetArray(verified);
			}
			resetArray(verified);
			
			fourth = checkLane(workArray, fruitType2);
			if(fourth == 1)
			{
				//do smthing with the items
				console.log("FOUND4");
				resetArray(verified);
			}
			resetArray(verified);
			
			
			//check column
			//---------------------------FROM THERE THE ITEMS IN THE ARRAY IS NOT FROM A LANE, BUT FROM A COLUMN---------------------------
			fillWorkColumn(pos[1]);// <------------------------pos[1]
			
			fifth = checkLane(workArray, fruitType1);
			if(fifth == 1)
			{
				//do smthing with the items
				console.log("FOUND5");
				resetArray(verified);
			}
			resetArray(verified);
			
			sixth = checkLane(workArray, fruitType2);
			if(sixth == 1)
			{
				//do smthing with the items
				console.log("FOUND6");
				resetArray(verified);
			}
			if(first == 0 && second == 0 && third == 0 && fourth == 0 && fifth == 0 && sixth == 0)
			{
				console.log("NOTHIN FOUND");
				changePos();
				resetArray(verified);
			}
			resetArray(workArray);
			idTemp = new Array();
			pos.length = 0;
		}
		
		
}

//when second position is only one away form first position draw with changed symbols board
function changePos() {
if ((pos[0] == pos[2] && (pos[1] == pos[3]+1 || pos[1] == pos[3]-1 || pos[1] == pos[3])) || (pos[0] == pos[2]+1 && pos[1] == pos[3]) || (pos[0] == pos[2]-1 && pos[1] == pos[3]))
  {
    let temp = pos[0];
    pos[0] = pos[2];
    pos[2] = temp;

    temp = pos[1];
    pos[1] = pos[3];
    pos[3] = temp;
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
}

function fillWorkLane(xpos)
{
	 for (let j = 0; j < 8; j++)
	      {
			  workArray[j]= getType(board[xpos][j]);
	      }
}

function fillWorkColumn(xpos)
{
	for (let j = 0; j < 8; j++)
	      {
			  workArray[j]= getType(board[j][xpos]);
	      }
}

function getType(fruit)
{
	 switch (fruit) 
	     	  {
                  case "img/fruit1.png":
                     return 1;
                     break;
                  case "img/fruit2.png":
                     return 2;
                     break;
                  case "img/fruit3.png":
                     return 3;
                     break;
                  case "img/fruit4.png":
                     return 4;
			         break;
                  case "img/fruit5.png":
                     return 5;
                     break;
               }
}


function checkLane(array, what)
{
	console.log("checking type "+what);
	let last1 = 0;
	let count = 0;
    for (let i = 0; i < array.length; i++) 
    {
        if (array[i] === what) 
        {
            verified[i] = 1;
            count++;
        }
        else
        {
           if(count<3)
           {
              for (let j=last1; j <= i; j++)
              {
                 verified[j] = 0;
              }
           }
           if(count>2){last1=i;}
           count=0;
        }
    }
	for (i = 0; i < array.length; i++)
	{
		if(verified[i] == 1)
		{
		   count++;
		}
	}
	console.log(verified);
	console.log("count "+count);
	if(count >= 3)
	{
		console.log("return 1");
		return 1;
	}
	else
	{
		console.log("return 0");
		return 0;
	}
}

function checkColumn()
{
	
}

function resetArray(lane)
{
    for(let i = 0; i < lane.length; i++)
    {
		lane[i] = 0;
    }
}
