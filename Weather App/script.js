function checkLocation(){

    if(navigator.geolocation){
        return navigator.geolocation.getCurrentPosition(runAdjust);
    } else {
        return false;
    }

}


function runAdjust(position) {

  var requestUrl = 'https://fcc-weather-api.glitch.me/api/current?lat='+position.coords.latitude+'&lon='+position.coords.longitude;

    var request = $.get(
    requestUrl,
    function(data) {
        $("#city").html(data.name);
        $("#degrees").html(data.main.temp +" ˙C");

        var weatherState = data.weather[0].main;
        console.log(weatherState);
        if(weatherState === 'Rain'){
            $("body").css("background", "url('https://i0.wp.com/picjumbo.com/wp-content/uploads/DSC09366.jpg')");
        } else if (weatherState === 'Clouds'){
             $("body").css("background", "url('https://i0.wp.com/picjumbo.com/wp-content/uploads/HNCK3940.jpg')");
        } else {
             $("body").css("background", "url('https://i0.wp.com/picjumbo.com/wp-content/uploads/HNCK3929.jpg')");
        }
        $("body").css("background-repeat", "no-repeat").css("background-attachment", "fixed").css("background-position", "center");
        $("#more").html(data.weather[0].main);
        $("#image img").attr('src', data.weather[0].icon);
        // console.log(data);
    });
}

checkLocation();
