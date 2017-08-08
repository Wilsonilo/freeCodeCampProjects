//===========================//
// GLOBALS
//===========================//
var TICTACTOE = {
    'one': {
        'num': 1
    },
    'two': {
        'num': 2
    },
    'three': {
        'num': 3
    },
    'four': {
        'num': 4
    },
    'five': {
        'num': 5
    },
    'six': {
        'num': 6
    },
    'seven': {
        'num': 7
    },
    'eight': {
        'num': 8
    },
    'nine': {
        'num': 9
    }
};

//===========================//
//JQUERY
//===========================//
$(document).ready(function(){

    //PC moves first
    mark('five', 'O'); // Go always center.

    //Handler
    $(".tic").on('click', function(){

        var id = this.id;

        proccessMove(id);

    });

});

//===========================//
//  HELPERS
//===========================//

function proccessMove(position){

    var num = TICTACTOE[position]['num'];

    if(TICTACTOE[position]['mark'] === undefined){

        TICTACTOE[position]['mark'] = 'X'
        mark(position, 'X');

    } else {

        return; // space used.

    }

    //Ask PC to make his move
    markPC(num);

}

//Calculates where to put the mark for the PC
// @parameter: numFromUser // the position where the user clicked.
function markPC(numFromUser){

    //Set som properties
    var positionPC, pcMove;
    var keys = Object.keys(TICTACTOE);
    if (numFromUser <= 3){
        pcMove = Math.floor((numFromUser / 3) * 10)
    } else if(numFromUser >= 4 && numFromUser <= 7){
        pcMove = Math.floor((numFromUser / 3) + 5)
    } else {
        pcMove = Math.floor(numFromUser / 3)
    }

    if(pcMove === 0 || pcMove === 5){
        pcMove = 1;
    }

    console.log(pcMove);

    //Base case
    if(numFromUser === 0 ){
        return markPC(10); //Avoids infinite loop
    }

    //Check if we can insert move in position
    //Else we recurse with a less number if l
    var keys = Object.keys(TICTACTOE);
    for(var i = 0; i < keys.length; i++){

        if(TICTACTOE[keys[i]]['num'] === pcMove){

            //Check if is free
            if(TICTACTOE[keys[i]]['mark'] === undefined){

                console.log("free: ", keys[i]);
                TICTACTOE[keys[i]]['mark'] = 'O';
                mark(keys[i], 'O');
                return;

            } else {
                if(numFromUser > 5){

                    console.log("NOT free >: ", numFromUser, numFromUser-1);
                    return markPC(10);


                }else {

                    console.log("NOT free <: ", numFromUser, numFromUser+1);
                    return markPC(numFromUser+1);

                }
            }
        }
    }
}

//Puts a symbol (symbol) inside the key(id)
function mark(key, symbol){
    $("#"+key+"").html(symbol);
}

