// Players keys
const P1_KEY = "z".charCodeAt(0);
const P2_KEY = "8".charCodeAt(0);

$(document).keypress(function(e){

    if (e.which == P1_KEY) {
        move(myGamePieceP1);
    } else {
        move(myGamePieceP2);
    }
});

// fill: yellow;