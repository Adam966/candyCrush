//score table na main page
//array of the TOP ten players score
//check the score if there couold be 2 player with the same name
//added sorting so the score shows from highest to the lowest

var scoreTable = [];
var refreshScoreTable = function(){
	sortScoreTable();
	
	for(let i =0; i<10; i++)
	{
		if(scoreTable[i] != undefined )
		{
		$("#" + (i+1) + "name").text(scoreTable[i].name);
		$("#" + (i+1) + "score").text(scoreTable[i].score);
		//score of the First player with the highest score
	    }
	}
}

let pos = new Array();
let idTemp = new Array();
let board = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
let music = true;


let score = 0;


var localStorage = window.localStorage;
console.log(localStorage);
//alert
//dont try this at home
//{name:"janko", score:"13"}
//top secret
if(localStorage.length != 0){
	scoreTable = JSON.parse(localStorage.getItem("scoreTable"));
}

//sorting from highest to the lowest
var sortScoreTable = function(){
	scoreTable.sort((a, b) => {

		return a.score>b.score?-1:1;
	});
}
//saving score to the scoreboard on the index.html
var saveScore = function(name, score){
	scoreTable.push({name:name, score:score});

	localStorage.setItem("scoreTable", JSON.stringify(scoreTable));
	refreshScoreTable();
}
//Start function run when game is started
function start()
{
  setupBoard(board);
  timer();
  console.log(board);
}
//when is game over reset function go to the menu page
function reset() {
 /* saveScore($("#nickname").val(), score);
  {*/
  window.location.href = 'index.html';
/*  }*/
}

function replay() {

  let name=document.getElementById('nickname').value;
  if(name == ""){
  document.getElementById("ErrorBox").innerHTML="You must enter player name";
        return false;
  }
  else
  {
  saveScore($("#nickname").val(), score);
  window.location.href = 'index.html';
  }


}

//could change the time of the game
//timer start
function timer() {
  let time = document.getElementById("progress");
  let width = 100;
  let interval = setInterval(frame, 1);

  function frame() {
    if (width <= 0) {
      clearInterval(interval);
	  $("#gameOverBkg").fadeIn("slow");
	 /* let filterBlur='blur(5px)';
	  $("body").css('filter',filterBlur);*/
	  console.log("test");
    }
    else {
      width-=0.0028;
      time.style.width = width + '%';
    }
  }
}

function playError() {
	if (music==true) {
		let error = document.getElementById('error')
	  error.play();
	  console.log("Error");
	}
}

function playMerge() {
	if (music==true) {
		let merge = document.getElementById('merge')
	  merge.play();
	  console.log("Merge");
	}
}
//on/off audio
function checkAudio() {
  let song = document.getElementById("song");

  if (!music) {
    song.play();
    music=true;
 	$("#soundButton").css("background-image", "url(http://itsovy.sk/1n/ivana/JungleCrush/img/soundON.png)");
  }
  else {
    song.pause();
    music=false;
	$("#soundButton").css("background-image", "url(http://itsovy.sk/1n/ivana/JungleCrush/img/soundOFF.png)");
  }
}

//render the board with random symbols
let lastelement = randomizer();
function setupBoard(board) {
  let index = 0;
  let elm;
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
	  elm = randomizer();
	  while(elm == lastelement)
	  {
		  elm = randomizer();
	  }
      board[i][j] = elm;
	  lastelement = elm;
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
  	//$(id).css({"background-color": "red"});
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
		fruitType2 = getType(document.getElementById(idTemp[0]).getAttribute('src')); //Gets the type of the first fruit (number 1-5)
	    fruitType1 = getType(document.getElementById(idTemp[1]).getAttribute('src')); //Gets the type of the second fruit (number 1-5)
		let first = 0; //first-sixth stores returned values, found-1, not found-0
		let second = 0;
        let third = 0;
        let fourth = 0;

		if(pos[0] == pos[2])
		{
			fillWorkLane(pos[0]);
			//------------------------------------------------------LANE------------------------------------------------------
			first = checkLane(workArray, fruitType1); //This checks fruit type X (first fruit clicked by the user) and returns 1 if found 3 or more times
			if(first == 1) //The searched fruit type found 3 or more times following each other
			{
				changeToEmptyRow(pos[0], verified);
				console.log("FOUND1");
				gatherPoints(verified);
                playMerge();
			}

			second = checkLane(workArray, fruitType2);
			if(second == 1)
			{
				//do smthing with the items
				changeToEmptyRow(pos[0], verified);
				console.log("FOUND2");
				gatherPoints(verified);
                playMerge();
			}

			//check column 1
			//---------------------------FROM THERE THE ITEMS IN THE ARRAY IS NOT FROM A LANE, BUT FROM A COLUMN---------------------------

			fillWorkColumn(pos[1]); // <------------------------pos[1]
		    third = checkLane(workArray, fruitType1);
		    if(third == 1)
		    {
		    	//do smthing with the items
		    	changeToEmptyColumn(pos[1], verified);
		    	gatherPoints(verified);
		    	playMerge();
		    }

			fillWorkColumn(pos[3]);// <------------------------pos[3]
			fourth = checkLane(workArray, fruitType2);
		    if(fourth == 1)
		    {
		    	//do smthing with the items
		    	changeToEmptyColumn(pos[3], verified);
		    	gatherPoints(verified);
                playMerge();
		    }

			if(first == 0 && second == 0 && third == 0 && fourth == 0)
			{
				console.log("NOTHIN FOUND");
				changePos();
                playError();
			}

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
				changeToEmptyRow(pos[0], verified);
				gatherPoints(verified);
                playMerge();
			}


			fillWorkLane(pos[2]);// <------------------------pos[2]
			second = checkLane(workArray, fruitType2);
			if(second == 1)
			{
				//do smthing with the items
				changeToEmptyRow(pos[2], verified);
				console.log("FOUND4");
				gatherPoints(verified);
                playMerge();
			}

			//check column
			//---------------------------FROM THERE THE ITEMS IN THE ARRAY IS NOT FROM A LANE, BUT FROM A COLUMN---------------------------
			fillWorkColumn(pos[1]);// <------------------------pos[1]
			third = checkLane(workArray, fruitType1);
			if(third == 1)
			{
				//do smthing with the items
				changeToEmptyColumn(pos[1], verified);
				console.log("FOUND5");
				gatherPoints(verified);
                playMerge();
			}

			fourth = checkLane(workArray, fruitType2);
			if(fourth == 1)
			{
				//do smthing with the items
				changeToEmptyColumn(pos[1], verified);
				console.log("FOUND6");
				gatherPoints(verified);
                playMerge();
			}
			if(first == 0 && second == 0 && third == 0 && fourth == 0)
			{
				console.log("NOTHIN FOUND");
				changePos();
                playError();
			}

			idTemp = new Array();
			pos.length = 0;
		}
		document.getElementById("scoreMain").innerHTML = score;
		document.getElementById("gameOverScore").innerHTML = score;
		setTimeout(moveBlocks, 180);
		setTimeout(moveBlocks, 200);

}

function gatherPoints(array)
{
	for(let i = 0; i<=7; i++)
	{
		if(array[i] == 1)
		{
			score += array[i]*10;
		}
	}
}


function changeToEmptyRow(position, array)
{
	let pos=0;
	for(let i=0; i<8; i++)
	{
		if(array[i] == 1)
		{
			pos = (8*position)+i;
	    	board[position][i] = "img/empty.png";
			document.getElementById('elm'+pos).src = "img/empty.png";
		}
	}
}
function changeToEmptyColumn(position, array)
{
	let pos=position;
	for(let i=0; i<8; i++)
	{
		if(array[i] == 1)
		{
			board[i][position] = "img/empty.png";
			document.getElementById('elm'+pos).src = "img/empty.png";
		}
		pos += 8;
	}
}

function moveBlocks()
{
	let tempArray;
    let count;
	let last;

	console.log("moveBlocks STARTED");
	for(let i=0; i<8; i++)
	{
		count=0;
		last=15;

		fillWorkColumnRaw(i);

		for(let j=7; j>=0; j--)
		{
			if(workArray[j] == "img/empty.png")
			{
				count++;
				if(last == 15){last = j;}
		    }
		}

		let pos=i+((last-count)*8);
	    let tempimg;
		let templast = last;
		if(last != 15)
		{
	    	for(j=last-count; j>=0; j--)
	    	{
	    		tempimg = document.getElementById('elm'+pos).getAttribute('src');
	    		board[templast][i] = tempimg;
	    	    document.getElementById('elm'+(pos+(8*count))).src = tempimg;

				document.getElementById('elm'+pos).src = "img/empty.png";
				board[j][i] = "img/empty.png";
	    	    pos -= 8;
				templast--;
	    	}
	    }
		pos = i;
		moveIt(pos, count, i);
	}

	function moveIt(pos, count, i)
	{
		let valueNew;
		let elm;
		for(j=0; j<count; j++)
		{
		    elm = randomizer();
	        while(elm == lastelement)
	        {
		        elm = randomizer();
	        }
			lastelement = elm;
			document.getElementById('elm'+pos).src = elm;
			board[j][i] = elm;
			pos += 8;
		}
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

function fillWorkColumnRaw(xpos)
{
	for (let j = 0; j < 8; j++)
	      {
			  workArray[j]= (board[j][xpos]);
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
	resetVerified();
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

function resetVerified()
{
    for(let i = 0; i < verified.length; i++)
    {
		verified[i] = 0;
    }
}
