//GLOBALS
var SEARCH_RESULTS = [];



//Extend use of animate.css
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
        return this;
    }
});

$.fn.extend({
    animateOut: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            //$(this).removeClass('animated ' + animationName);
            $(this).hide();
        });
        return this;
    }
});

$.fn.extend({
    animateIn: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            //$(this).removeClass('animated ' + animationName);
            $(this).css('opacity', 1);
        });

        return this;
    }
});


$(document).ready(function(){

    //Set Random page to the Feeling lucky link
    feelingLuckySet();

    //Handlers
    $("#iconsearch").click(function(){
        //Hide card
        $('.container .card').animateOut('rollOut');

        //Show Other Content
        $("#searchingelements").animateIn('bounceIn');

    });
    $("#searchinput").on('input', function(){
            var valinput = $(this).val();

            ////w/api.php?action=query&format=json&prop=info%7Cextracts&list=&continue=&generator=search&inprop=url&exchars=100&exlimit=1&gsrsearch=margaret+hamilton
            var requestUrl = 'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch='+valinput+'&prop=info&format=json&inprop=url&prop=extracts&exchars=50&exlimit=1&explaintext=1'


            var parametersForSearch = {
                'action': 'query',
                'titles': valinput,
                'prop': 'revisions',
            	"rvprop": "content",
                'format': 'json'
            };
            var request = $.get(
        requestUrl,
        function(data) {

            if (data.query.pages !== undefined){

                //Reset
                SEARCH_RESULTS = [];

                //Push each page to result
                for(key in data.query.pages){
                    SEARCH_RESULTS.push(data.query.pages[key]);

                }

            }

            presentResults();

            //console.log( data.query.pages);
        });
    });

});

function presentResults(){
    //console.log(SEARCH_RESULTS.length, SEARCH_RESULTS);
    //Check if we have something
    if (SEARCH_RESULTS.length > 0){

        //clean
        $("#elementsresultarea").html('<ul></ul>');

        //Append each result
        for(var i = 0; i < SEARCH_RESULTS.length; i++){

            //Loop the bitch
            //console.log(SEARCH_RESULTS[i].title)
            //console.log(SEARCH_RESULTS[i]);

            var extract = SEARCH_RESULTS[i].extract;
            console.log(extract);
            if (extract !== undefined){
                $("#elementsresultarea ul").append('<li class="card"><a href="'+SEARCH_RESULTS[i].fullurl+'" target="_blank">'+SEARCH_RESULTS[i].title+'</a><span id="extract">'+SEARCH_RESULTS[i].extract+'</a></li>');
            }else{
                $("#elementsresultarea ul").append('<li class="card"><a href="'+SEARCH_RESULTS[i].fullurl+'" target="_blank">'+SEARCH_RESULTS[i].title+'</a></li>');
            }

        }

    }

}

function feelingLuckySet(){
    ////w/api.php?action=query&format=json&prop=info&list=random&titles=&generator=alllinks&inprop=url&rnlimit=1&gallimit=1
    var requestUrl = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&list=random&generator=alllinks&inprop=url&rnlimit=1&gallimit=1';

    $.get(
    requestUrl,
    function(data) {

        for(key in data.query.pages){

            $("#imfeeling").attr('href', data.query.pages[key].fullurl);
            console.log(data.query.pages[key].fullurl);

        }

    });

}
