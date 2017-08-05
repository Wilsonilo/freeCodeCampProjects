//*** GLOBALS *** //
var ONEMINUTE       = 1000 * 60;
var SESSIONCOUNTER  = 25;
var BREAKCOUNTER    = 5;
var BASICTIMER      = ONEMINUTE * SESSIONCOUNTER;
var BREAKTIMER      = ONEMINUTE * BREAKCOUNTER;
var MODE            = 'session';
var STATE, GENERALINTERVAL, REFERENCE;

//*** JQUERY Ready *** //
$(document).ready(function(){

    //Preven Default for controls
    $("#morebreak, #lessbreak, #moresession, #lesssession").on('click', function(e){
        e.preventDefault();
    });

    //First Responder
    firstResponder();

    //Control Handlers
    $("#morebreak").click(function(){
        if(!STATE){
            BREAKCOUNTER += 1;
            updateBreak();
        }
    });
    $("#lessbreak").click(function(){
        if(!STATE){
            if(BREAKCOUNTER > 1){
                BREAKCOUNTER -= 1;
                updateBreak();
            }
        }
    });
    $("#moresession").click(function(){
        if(!STATE){
            SESSIONCOUNTER += 1;
            updateSession();
        }
    });
    $("#lesssession").click(function(){
        if(!STATE){
           if(SESSIONCOUNTER > 1){
                SESSIONCOUNTER -= 1;
                updateSession();
           }
        }
    });

    //Pomodoro Handler
    $("#pomodoro").click(function(){
        pomodoroClick();
    });

});


//*** HELPERS *** //
//Set Pomodoro to initial state
function firstResponder(){

    STATE = false;
    REFERENCE = BASICTIMER;
    var m = addZero(new Date(BASICTIMER).getUTCMinutes());
    var s = addZero(new Date(BASICTIMER).getUTCSeconds());

    $("#timer").html(m +":"+s);
}

//Pause or resume Pomdoro
function pomodoroClick(){

    //Is active, pause
    if(STATE){

         STATE = false;

    //Is inactive, activate
    }else {

        STATE = true;

    }

    //Work Interval if is not defined yet
    if(GENERALINTERVAL === undefined){

        //Each sec
        GENERALINTERVAL = setInterval(runInterval, 1000);

    }

}


//Puts visualy the time parameter
function updatePomodoroView(time){

    time = new Date(time);
    var m = addZero(time.getUTCMinutes());
    var s = addZero(time.getUTCSeconds());
    //console.log(m,s);

    if(m === '00' && s === '00'){

        //console.log('Limit Reached!', BASICTIMER, BREAKTIMER)
        limitReached();

    } else {

        //update timer counter
        $("#timer").html(m +":"+s);

        //update background
        var percentage = (time * 100) / REFERENCE;

        console.log(percentage);
        $("#pomodoro #progress").css('width', ''+percentage+'%');
    }
}

//Updates number for break
function updateBreak(){

    $("#counterbreak").html(BREAKCOUNTER);
    BREAKTIMER = ONEMINUTE * BREAKCOUNTER;

    if(MODE == 'break'){
          REFERENCE = BREAKTIMER;
          updatePomodoroView(BREAKTIMER);
    }
}

//Updates number for session
function updateSession(){

     $("#countersession").html(SESSIONCOUNTER);
     BASICTIMER = ONEMINUTE * SESSIONCOUNTER;

     if(MODE == 'session'){
          REFERENCE = BASICTIMER;
          updatePomodoroView(BASICTIMER);
     }
}

//Main interval
function runInterval(){

    if(STATE){

        if(MODE === 'session'){

            BASICTIMER -= 1000
            updatePomodoroView(BASICTIMER);

        } else{

            BREAKTIMER -= 1000
            updatePomodoroView(BREAKTIMER);

        }

    } else {

        clearInterval(GENERALINTERVAL);
        GENERALINTERVAL = undefined;
    }

}

//Pomodoro Finished timer or break, runs method.
function limitReached(){

    //Reset interval and state
    STATE = false;
    clearInterval(GENERALINTERVAL);
    GENERALINTERVAL = undefined;

    if (BASICTIMER === 0){
        timerFinished();
    }
    if(BREAKTIMER === 0){
        breakFinished();
    }
}

//Timer is finished, present break timer, reset normal timer.
function timerFinished(){

    //Update
    MODE = 'break'
    $('#pomodoro').animateCss('flip');
    $("#mode").html("Break!");

    //Reset Normal Timer
    BASICTIMER = ONEMINUTE * SESSIONCOUNTER;
    REFERENCE = BREAKTIMER;
    $("#pomodoro #progress").css('background', '#092B40').css('width', '100%');


    //Start interval for break
    pomodoroClick();

}

//Break Timer is finished, present normal timer, reset break.
function breakFinished(){

    //Update
    MODE = 'session'
    $('#pomodoro').animateCss('flip');
    $("#mode").html("Session");

    //Reset Break Timer
    BREAKTIME = ONEMINUTE * BREAKCOUNTER;
    REFERENCE = BASICTIMER;
    $("#pomodoro #progress").css('background', '#C66C34').css('width', '100%');


    //Start interval for normal
    pomodoroClick();

}


//Adds zero to number, making seconds and minutes 00/00
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

//** EXTENSIONS ** //
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});
