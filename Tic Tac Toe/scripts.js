//===========================//
// NOTIFICATION: Went for a AI/TIE approach nor a random VS user approach
// Is not perfect AT ALL, but i think that with more time there is a way
// I'm just out of time to finish this one.
//===========================//


//===========================//
// GLOBALS
//===========================//
var WINS = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

var USERMOVES    = [];
var AIMOVES      = [];
var USED         = [];
var winningMoves = [];
var MARKAI       = 'O';
var MARKUSER     = 'X';

//===========================//
//JQUERY
//===========================//
$(document).ready(function(){

    //First move
    var firstMoveRandom = Math.floor((Math.random() * 9) + 1);
    USED.push(firstMoveRandom);
    AIMOVES.push(firstMoveRandom);
    mark(String(firstMoveRandom), MARKAI);

    //Handler
    $(".tic").on('click', function(){

        var id = this.id;

        if(!USED.includes(Number(id))){

            proccessMove(Number(id));

        } else {

            return;
        }

    });

});

//===========================//
//  HELPERS
//===========================//

function proccessMove(position){

    //Push new mark of user
    USED.push(position);
    mark(String(position), MARKUSER);

    //Append this move to the user array too
    if(!USERMOVES.includes(position)){
        USERMOVES.push(position);
        checkIfSomeoneWon(); // Just in case we check if the user has won.
    }


    //If this is the first move of the user
    //We filter the winning moves and select the first one
    if(USERMOVES.length === 1){

        winningMoves = WINS.filter(function(array){
            return array.includes(position);
        });

        setTimeout(function(){
            console.log("calling firs move");
            applymark(winningMoves[0]);
        }, 300);

    //If this is the second move of the user
    //We check previous filtered winning moves
    //And select the one that has more probability to be used (2 nums)
    } else if(USERMOVES.length === 2){

        //look for winning moves
        winningMoves = winningMoves.filter(function(array){
            return secondMove(array);
        });

        //If have have at least one winning move
        //We applymark
        if(winningMoves.length >= 1){

            setTimeout(function(){
                applymark(winningMoves[0]);
                checkIfSomeoneWon();
            }, 300);


        //If we do not have winning move
        //AI is winnin, try to win
        } else {

            console.log("No moves to block, user blocked AI, try other move", AIMOVES);
            winningMoves = WINS.filter(function(array){
                return secondMoveAI(array);
            });

            setTimeout(function(){
                if (winningMoves === undefined){
                    emergencyExit();
                    return;
                }
                applymark(winningMoves[0]);
                checkIfSomeoneWon();
            }, 300);

        }

    //Third move of the user we look for the
    //Remaining posibilities and go for the most probable
    } else if (USERMOVES.length === 3 || USERMOVES.length === 4){

        if(USERMOVES.length === 3 ){
            console.log("THIRD MOVE")
        }
        if(USERMOVES.length === 4 ){
            console.log("FOURTH MOVE")
        }


        var move = thirdAndForthMove();
        setTimeout(function(){
            console.log(move);
            //Option used, look for alternative
            if(move === false || move === undefined){

                //winningMoves = WINS.filter(function(array){
                    //return secondMoveAIAlt(array);
                //});
                thirdAndForthMove();
                setTimeout(function(){
                    if (winningMoves === undefined){
                        emergencyExit();
                        return;
                    }
                    applymark(winningMoves[0]);
                    checkIfSomeoneWon();
                }, 1000);

            //We found alternative, go.
            } else {
                applymark(winningMoves[0]);
                checkIfSomeoneWon();
            }
        }, 1000);

        if(USED.length === 8){
            for(var o = 1; o <= 9; o++){
                if(!USED.includes(o)){
                    USED.push(o);
                    AIMOVES.push(o);
                    mark(String(o), MARKAI);
                    alert("tie!");

                }
            }
        }

    //If AI has not won by this point it most be a TIE
    //Set last move and close game as tie
    } else {

        alert('tie?');
        //$("#tictactoe").html("TIE!");
        return;
    }

    console.log(winningMoves, USERMOVES);
}

//Second Move agains USER
function secondMove(array){

    var positives = 0;
    for(var i = 0; i < array.length; i++){
        if(USERMOVES.includes(array[i])){
            positives++;
        }
    }
    console.log(positives);
    if (positives >= 2){
        return array;
    }
}

//Second Move for AI
function secondMoveAI(array){

    console.log("looking other path", array);
    var positives = 0;
    for(var i = 0; i < array.length; i++){
        if(AIMOVES.includes(array[i])){
            positives++;
        }
    }
    console.log(positives);
    if (positives >= 1){
        return array;
    }
}

function secondMoveAIAlt(array){

    console.log("looking other path", array);
    var positives = 0;
    for(var i = 0; i < array.length; i++){
        if(AIMOVES.includes(array[i])){
            positives++;
        }
    }
    console.log(positives);
    if (positives >= 1){
        return array;
    }
}

//Third move and forth Move
//Checks based on the user and AI current hold numbers
//what is the best move
var probabilities = {
    'AI': {
        'points': 0
    },
    'USER': {
        'points': 0
    }
}; // holder
function thirdAndForthMove(){

    //First let's try to win as AI
    var winsByAi = WINS.filter(function(array){

        var positives = 0;
        for(var i = 0; i < array.length; i++){
            if(AIMOVES.includes(array[i])){
                positives++;
            }
        }
        probabilities.AI['points'] += positives;
        if (positives >= 2){
            return array;
        }

    });

    var winsByUser = WINS.filter(function(array){

        var positives = 0;
        for(var i = 0; i < array.length; i++){
            if(USERMOVES.includes(array[i])){
                positives++;
            }
        }
        probabilities.USER['points'] += positives;
        if (positives >= 2){
            return array;
        }

    });

    console.log(winsByUser.length, winsByAi.length)
    //We have at least a winning hand for user
    if (winsByUser.length >= 1){

        probabilities.USER['arrays'] = winsByUser;

    } else {

        probabilities.AI['arrays'] = winsByAi;

    }

    if(probabilities.AI.points > probabilities.USER.points){
        winningMoves = probabilities.AI.arrays;
    } else {
        winningMoves = probabilities.USER.arrays;
    }

}

//Apply mark to the first element that still free
function applymark(array){
   for(var i = 0; i < array.length; i++){
        if(!USED.includes(array[i])){
            console.log(array[i]);
            USED.push(array[i]);
            AIMOVES.push(array[i]);
            mark(String(array[i]), MARKAI);
            return;
        }
    }
    console.log("ALL USED");
    //All places are used
    emergencyExit();

    return false;
}

//If i get undefined or error, avoid
//trying to win, just look for a place to mark and
//hope for the best
function emergencyExit(){

    for(var o = 1; o <= 9; o++){
        if(!USED.includes(o)){
            USED.push(o);
            AIMOVES.push(o);
            mark(String(o), MARKAI);
            return;
        }
    }

}

//Check if either AI or User has won
function checkIfSomeoneWon(){

    //loop AI
    for(var w = 0; w < WINS.length; w ++){
        var pointsForAI = 0;
        for(j = 0; j < w.length; j++){
            if(AIMOVES.includes(w[j])){
                pointsForAI++;
                if(pointsForAI >= 3){
                    alert('AI has won!');
                    return;
                }
            }
        }
    }

    //loop for USER
    for(var h = 0; h < WINS.length; h++){
        var pointsForUSER = 0;
        for(k = 0; k < h.length; k++){
            if(AIMOVES.includes(h[k])){
                pointsForUSER++;
                if(pointsForUSER === 3){
                    alert('USER has won!');
                    return;
                }
            }
        }
    }

}

//Puts a symbol (symbol) inside the key(id)
function mark(key, symbol){
    $("#"+key+"").html(symbol).animateCss('flip');
}


//===========================//
// EXTENSIONS
//===========================//
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});
