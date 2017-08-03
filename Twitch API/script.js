//GLOBALS
var stateStreams = [];
var streamers       = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
var streamersLeft = streamers.slice(0);


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

//Jquery Handler
$(document).ready(function(){
    $("#search").on('input', function(){

        //Val
        var valSearch = $('#search').val();

        //Clear
        $("#all #streamers").html('');

        //Check for state
        if(valSearch !== ''){

            //Set a copy of stateStreams
            var holderStateStreams = Object.assign({}, stateStreams);

            //clean all and filter
            var streamsFiltered = Object.keys(stateStreams).filter(function(key) {

                return key.includes(valSearch);

            }).map(function(key) {

                return stateStreams[key];

            });

            //Convert Array into an object
            var newStreamsfilereted = {};
            for(var o=0;o<streamsFiltered.length;o++){
                var keyElement = streamsFiltered[o].name;
                newStreamsfilereted[keyElement] = streamsFiltered[o][keyElement];
            }

            //console.log(valSearch, Object(streamsFiltered));
            setInfo(newStreamsfilereted);
        } else {

            //Set again
            setInfo(stateStreams);
        }

    });
});

//Run Loop for Streamers
for(var i=0;i<streamers.length;i++){
    checkChannel(streamers[i], i, streamers.length);
}

///======*** HELPERS *** =====///
    //Check Channel Helper
   function checkChannel(name, number, length){

        //Set vars
        var twitchApiUrl    = 'https://wind-bow.gomix.me/twitch-api';

        var channelsApi     = twitchApiUrl + '/channels';
        var usersApi        = twitchApiUrl + '/users';
        var streamsApi      = twitchApiUrl + '/streams';

        if(name !== undefined){

            //Get
            var request = $.get(streamsApi+'/'+name, function(data){

                if(data.stream === null){
                    stateStreams[name] = {
                        'state': false,
                        'name' : name
                    };

                } else {
                    stateStreams[name] = {
                        'state': true,
                        'name' : name
                    };
                }

            }).done(function(){

                //Fetch information from this  fucker
                $.get(channelsApi+'/'+name, function(data){

                    //console.log("channel info: ", data.logo, data.url);

                    //logo
                    if(data.logo !== undefined){
                        stateStreams[name]["logo"] = data.logo;
                    }
                    stateStreams[name]["url"]  = data.url;

                }).done(function(){

                    //Remove Streamer
                    var indexOf = streamersLeft.indexOf(name);
                    streamersLeft.splice(indexOf, 1);

                    //console.log(number, length);
                    if(streamersLeft.length === 0){
                      setInfo(stateStreams);
                    }

                });


            });

            //console.log(stateStreams);

        }
    }

    //Present information Helper
    function setInfo(infoObject){

        //console.log(infoObject);

        //Loop
        for(key in infoObject){

            var elementConformed; //Prepare var

            //Conform element based if we have logo or not.
            if (stateStreams[key].logo !== null && stateStreams[key].logo !== undefined){
                elementConformed = '<a href="'+stateStreams[key].url+'" target="_blank"><li><img src="'+stateStreams[key].logo+'" class="logostreamer img-circle">'+stateStreams[key].name+'</li></a>';
            } else {
                 elementConformed = '<a href="'+stateStreams[key].url+'" target="_blank"><li style="padding-left:70px;">'+stateStreams[key].name+'</li></a>';
            }

            //All
            $("#all #streamers").append(elementConformed );

            //Online / Offline
            if(stateStreams[key].state){
                $("#online").append(elementConformed);

            } else {
                $("#offline").append(elementConformed);
            }
        }

    }
