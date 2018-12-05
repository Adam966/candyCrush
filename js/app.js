let pos = new Array();
let idTemp = new Array();
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

let foundLane = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
let foundColumn = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
let workArray = [0,0,0,0,0,0,0,0,0];

let verified = [0,0,0,0,0,0,0,0,0];
let fruitType1=0;
let fruitType2=0;
let singlePoint = 0;
let doublePoint = 0;

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
		setTimeout(verify, 300)

			

		//pos.length = 0;
	}
  }
}

function verify()
{
		fruitType1 = getType(document.getElementById(idTemp[0]).getAttribute('src'));
	    fruitType2 = getType(document.getElementById(idTemp[1]).getAttribute('src'));
		let first = 0;
		let second = 0;	
        let third = 0;
        let fourth = 0;	
        let fifth = 0;
        let sixth = 0;	
		
		if(pos[0] == pos[2])
		{
			fillWorkLane(pos[0]);

			console.log("workarray "+workArray);
			console.log("fruittype1 "+fruitType1);
			console.log("fruittype2 "+fruitType2);
			first = checkLane(workArray, fruitType1);
			console.log("first " + first);
			if(first == 1)
			{
				//do smthing with the items
				console.log("FOUND1");
				resetArray(verified);
				
			}
			resetArray(verified);
			
			second = checkLane(workArray, fruitType2);
			console.log("second " + second);
			if(second == 1)
			{
				//do smthing with the items
				console.log("FOUND2");
				resetArray(verified);
			}
			resetArray(verified);
			//check column 1
			fillWorkColumn(pos[1]);
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
			//check column 2
			fillWorkColumn(pos[3]);
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
			fillWorkLane(pos[0]);
			
			first = checkLane(workArray, fruitType1);
			console.log("first " + first);
			if(first == 1)
			{
				//do smthing with the items
				console.log("FOUND1");
				resetArray(verified);
				
			}
			resetArray(verified);
			
			second = checkLane(workArray, fruitType2);
			console.log("second " + second);
			if(second == 1)
			{
				//do smthing with the items
				console.log("FOUND2");
				resetArray(verified);
			}
			resetArray(verified);
			
			fillWorkLane(pos[2]);
			
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
			fillWorkColumn(pos[1]);
			
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
