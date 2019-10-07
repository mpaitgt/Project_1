// Global variables
var searchBtn = $('#search-btn');

// ---------------------------------------------------------TMDB
var APIkey = '95a6c9d4de568b3ebaa4ea26320798b4';
var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + APIkey + '&query=' + '2001';

$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function(response) {
    var movieObject = response.results[0];
    var queryDetails = movieObject.id;
    var detailsURL = 'https://api.themoviedb.org/3/movie/' + queryDetails + '?api_key=' + APIkey + '&append_to_response=videos';

    $.ajax({
        url: detailsURL,
        method: 'GET'
    }).then(function(response) {
        var userChoice = response.videos.results[3].key;
        var youTube = 'http://www.youtube.com/embed/' + userChoice;
    });
});
// ---------------------------------------------------------

searchBtn.on('click', function() {
    var userInput = $('#search').val();
    console.log('hello');
    console.log(userInput);
});
