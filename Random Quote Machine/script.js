var quotes = [{"author": "Kalec", "quote": "Strike now, heroes, while he is weakened! Vanquish the Deceiver!"}, { "author": "Algalon the Observer", "quote": "See your world through my eyes: A universe so vast as to be immeasurable - incomprehensible even to your greatest minds."}, { "author": "Nefarian", "quote": "In this world where time is your enemy, it is my greatest ally. This grand game of life that you think you play in fact plays you. To that I say... Let the games begin!"}, { "author": "Dwarf male", "quote": "I like my beer like I like my women - stout and bitter."}, { "author": "Illidan", "quote": "You are not prepared!"}, { "author": "Thrall", "quote": "The beginning of wisdom is the statement 'I do not know.' The person who cannot make that statement is one who will never learn anything. And I have prided myself on my ability to learn"}, { "author": "Professor Putricide", "quote": "Good news everyone..."}, { "author": "Leroy Jenkins", "quote": "LEEEEEEEEROY JENKINS"}];


$(document).ready(function(){
//https://twitter.com/intent/tweet?text=
        //First Random
       var firstRandom = selectRandomQuote();
        $("#quotezone").html(firstRandom.quote + " - " + firstRandom.author)
        $(".twitter-share-button").attr("href", "https://twitter.com/intent/tweet?text="+firstRandom.quote + " - " + firstRandom.author);

        //Work Click of Random Button
       $(".btn-success").click(function(e){
            e.preventDefault();
            var Random = selectRandomQuote();
             $("#quotezone").html(Random.quote + " - " + Random.author);
              $(".twitter-share-button").attr("href", "https://twitter.com/intent/tweet?text="+Random.quote + " - " + Random.author)
       });
});

function selectRandomQuote(){

    var randomNumber = Math.floor((Math.random() * quotes.length) + 1);
    //console.log(randomNumber, quotes.length);
    return quotes[randomNumber-1];
}
