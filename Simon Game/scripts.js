//===========================//
//GLOBALS
//===========================//
var COLORS = {
    'green' :   {
        'num': 1,
        'audio': 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'
    },
    'red'   :   {
        'num': 2,
        'audio': 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'
    },
    'yellow':   {
        'num': 3,
        'audio': 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'
    },
    'blue'  :   {
        'num': 4,
        'audio': 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
    }
};
var GOODMOVESTOWIN  = 20;
var SEQUENCE        = []; // Holder of sequence
var USERSEQUENCE    = []; // Holder of the user movements
var POSITION        = 0;  // Current position we want to check
var SPEED           = 1000; // Speed of Sound playing;
var MAXREACH        = 0;
//===========================//
//JQUERY
//===========================//
$(document).ready(function(){

    //Starts game, sets sequence and resets globals.
    startGame();

    //Click Handler
    $("#simon .col-6").on('click', function(){

        var id  = this.id;
        var num = COLORS[id]['num'];
        $("#"+id).animateCss('bounceIn');
        userClicked(num, id);

    });

});

//===========================//
//HELPERS
//===========================//

//Creates sequence and starts the game
function startGame(){

    //Create sequence
    for(var i = 0; i < GOODMOVESTOWIN; i++){
        var randomNumnber = Math.floor((Math.random() * 4) + 1);
        SEQUENCE.push(randomNumnber)
    }

    playSequence();
}

// Based on the sequence created we play
// Also plays the sounds based on the moves
// Of the user + 1
function playSequence(){

    var numberOfSoundsToPlay = USERSEQUENCE.length + 1;
    var i = 0;
    while(i < numberOfSoundsToPlay){

        var sequenceElement = SEQUENCE[i];
        var color = getColorForNum(sequenceElement);
        playSound(color, SPEED + (SPEED * i));
        i++;
    }

    //Once the game has played his sequence, rese the user position
    MAXREACH = USERSEQUENCE.length+1;
    POSITION = 0;
    USERSEQUENCE = [];
}

//Plays sound and animates in certain Speed
function playSound(color, speed){

    setTimeout(function(){
        var audio = new Audio(COLORS[color]['audio']);
        $("#"+color).animateCss('bounceIn');
        audio.play();
    }, speed);

}


//Handler for user clicks
function userClicked(num, color){

    USERSEQUENCE.push(num) // Push current click to user movement
    var checkerror = checkIfErrorOnUserClick() // Check if we have error
    if(checkerror){

        //All good play
        var audio = new Audio(COLORS[color]['audio']);
        audio.play();

        //Move Forward
        POSITION++;
        console.log(POSITION, MAXREACH);
        //Check if he finished the sequence
        if(POSITION === MAXREACH){

            setTimeout(function(){
                playSequence();
            }, SPEED);
        }

    } else {
        USERSEQUENCE = [];
        POSITION = 0;
        playSequence();
    }
}

//Check if current position where the user clicked is correct
//Also checks if user finished 20 moves correctly
function checkIfErrorOnUserClick(){

    //Is he/her correct?
    if(USERSEQUENCE[POSITION] !== SEQUENCE[POSITION] ){
        alert("Wrong!");
        console.log(POSITION, USERSEQUENCE[POSITION], SEQUENCE[POSITION])
        return false;
    }

    //Is he/her done?
    if(USERSEQUENCE.length === GOODMOVESTOWIN){
        alert("WIIIIIIIIIINNNNN!");
        return true;
    }

    console.log("user passed: ", USERSEQUENCE);
    return true

}

//Returns the color key based on a number
function getColorForNum(num){

    var keysOfColors = Object.keys(COLORS);
    for(var o = 0; o < keysOfColors.length; o++){
        if(COLORS[keysOfColors[o]].num === num){
            return keysOfColors[o];
        }

    }

}
//===========================//
//EXTENSION
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
