

function modal(){

// Get the modal
let modalRules = document.getElementById('rulesModal');

// Get the button that opens the modal
let btnRules = document.getElementById("rulesButton");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let span2 = document.getElementsByClassName('close2')[0];

let btnScore = document.getElementById('scoreButton');

// When the user clicks the button, open the modal
btnRules.onclick = function() {
    modalRules.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modalRules.style.display = "none";
}

btnScore.onclick = function() {
  scoreModal.style.display = "block";
}

span2.onclick = function() {
  scoreModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalRules) {
        modalRules.style.display = "none";
    }

}

document.getElementById("playButton").onclick = function () {
        location.href = "game.html";
    };

}
