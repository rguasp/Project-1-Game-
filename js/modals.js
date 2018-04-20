// get modals for buttons
let aboutGameBtn = document.getElementById("gameinfobtn");
let howToPlayBtn = document.getElementById("howtoplaybtn");

// get modals for about game and how to play
let aboutGameModal = document.getElementById('aboutGame');
let howToPlayModal = document.getElementById('howtoplay');

// get closing tag modals
let closingSpan = document.getElementsByClassName("closing")[0];
let closingSpanTwo = document.getElementsByClassName("closing2")[0];

//if user clicks button open aboutgame and how to play modal
aboutGameBtn.onclick = function() {
    aboutGameModal.style.display = "block";
}

howToPlayBtn.onclick = function() {
    howToPlayModal.style.display = "block";
}

// if user clicks whats in the span close the about game modal
closingSpan.onclick = function() {
    aboutGameModal.style.display = "none";
}

closingSpanTwo.onclick = function() {
    howToPlayModal.style.display = "none";
}

// If user clicks outside about game modal it will close
window.onclick = function(event) {
    if (event.target == aboutGameModal) {
        aboutGameModal.style.display = "none";
    }
    if (event.target == howToPlayModal) {
        howToPlayModal.style.display = "none";
    }
}