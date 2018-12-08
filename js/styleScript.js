

function modal(){

// Get the modal
let modalRules = document.getElementById('rulesModal');
let modalScore = document.getElementById('scoreModal');

// Get the button that opens the modal
let btnRules = document.getElementById("rulesButton");
let btnScore = document.getElementById("scoreButton");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let span2 = document.getElementsByClassName('close2')[0];

// When the user clicks the button, open the modal
btnRules.onclick = function() {
    $(modalRules).fadeIn("fast");
}

btnScore.onclick = function() {
  	$(modalScore).fadeIn("fast");
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    $(modalRules).fadeOut("fast");
}

span2.onclick = function() {
  	$(modalScore).fadeOut("fast");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalRules) {
        $(modalRules).fadeOut("fast");
    }
	
	if (event.target == modalScore) {
        $(modalScore).fadeOut("fast");
    }

}

document.getElementById("playButton").onclick = function () {
        location.href = "game.html";
    };

}
