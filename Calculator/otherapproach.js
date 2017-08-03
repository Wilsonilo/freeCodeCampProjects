var CALCULATOR = {
    "cero"      : 0,
    "one"       : 1,
    "two"       : 2,
    "three"     : 3,
    "four"      : 4,
    "five"      : 5,
    "six"       : 6,
    "seven"     : 7,
    "eight"     : 8,
    "nine"      : 9,
    "plus"      : "+",
    "less"      : "-",
    "division"  : "/",
    "dot"       : ".",
    "multiply"  : "*"
}
var EQUATION = 0;
var ACUMULATOR;
var MATH = 0;

$(document).ready(function(){

    var result = $("#result");

    // General
    $("#clean, .num").click(function(){
        $(this).animateCss("bounceIn");
    });

    //Clean
    $("#clean").click(function(){
        clean();
    });

    //num Handlers
    $(".num").click(function(){

        //Get representation
        var rep = this.id;

        //Calculate
        if(rep === 'equal'){

            //Avoid multiple returns for equal
            if(MATH !== 0){
                console.log(result.html());
                result.html(MATH);
                EQUATION = 0;
                MATH = 0;
                ACUMULATOR = undefined;
            } else {
                return;
            }

        } else {
            //Proccess
            result.html(EQUATION = calculate(CALCULATOR[rep]));
        }

    });

});

//** HELPERS ** //
function calculate(rep){

    if(rep === '+'){

        ACUMULATOR = '+';
        //console.log(rep, EQUATION + "" + rep);
        return EQUATION + "" + rep;

    } else if(rep === '-'){

        ACUMULATOR = '-';
        //console.log(rep, EQUATION + "" + rep);
        return EQUATION + "" + rep;

    } else if(rep === '/'){

        ACUMULATOR = '/';
        //console.log(rep, EQUATION + "" + rep);
        return EQUATION + "" + rep;


    } else if(rep === '*'){

        ACUMULATOR = '*';
        //console.log(rep, EQUATION + "" + rep);
        return EQUATION + "" + rep;

    } else {

        if(EQUATION === 0){
            EQUATION = rep;
            MATH = Number(rep);
            console.log(rep, EQUATION);
            return rep;

        } else{

            //Check for ACUMULATOR
            if (ACUMULATOR !== undefined){

                if(ACUMULATOR === '+'){
                    MATH += rep;
                } else if(ACUMULATOR === '-'){
                    MATH -= rep;
                } else if (ACUMULATOR === '/'){
                    MATH /= rep;
                } else if(ACUMULATOR === '*'){
                    MATH *= rep;
                } else {

                }
                console.log(rep, EQUATION + "" + rep, MATH);
                return EQUATION + "" + rep;

            } else {
                console.log(rep, EQUATION + "" + rep);
                MATH = Number(EQUATION + "" + rep);
                return EQUATION + "" + rep;
            }

        }
    }

}

function clean(){
    var result = $("#result");

    EQUATION = 0;
    MATH = 0;
    ACUMULATOR = undefined;
    result.html('0').animateCss('fadeIn');
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

