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

            console.log("calculate: ", EQUATION);

            //Avoid multiple returns for equal
            if(EQUATION !== 0){

                calculateResult();

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
function calculateResult() {
    $("#result").html(eval(EQUATION));
    ACUMULATOR = undefined;
    EQUATION = 0;
}

function calculate(rep){

    if(rep === '+'){

        if(ACUMULATOR === undefined){

            ACUMULATOR = '+';
            return EQUATION + "" + rep;

        } else if(ACUMULATOR === rep){

            return EQUATION;

        }

    } else if(rep === '-'){

        if(ACUMULATOR === undefined){

            ACUMULATOR = '-';
            return EQUATION + "" + rep;

        } else if(ACUMULATOR === rep){

            return EQUATION;

        }

    } else if(rep === '/'){

         if(ACUMULATOR === undefined){

            ACUMULATOR = '/';
            return EQUATION + "" + rep;

        } else if(ACUMULATOR === rep){

            return EQUATION;

        }

    } else if(rep === '*'){

         if(ACUMULATOR === undefined){

            ACUMULATOR = '*';
            return EQUATION + "" + rep;

        } else if(ACUMULATOR === rep){

            return EQUATION;

        }

    } else {

        ACUMULATOR = undefined; //reset

        if(EQUATION === 0){

            EQUATION = rep;
            return rep;

        } else{

            return EQUATION + "" + rep;

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
