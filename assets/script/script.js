// Global variables
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        jquery: 'jquery-3.4.1'
    }
});
var searchBtn = $('#search-btn');
var Spotify, s, spotifyApi;

require(['spotify-web-api-js'], function (Spotify) {
    // foo is now loaded.
    spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken('2bc509995dmsh8326cbc86baf20dp1bcc38jsnf0bffeeb17c5');
    // spotifyApi.setPromiseImplementation(Q);
    
    // get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
        if (err) console.error(err);
        else console.log('Artist albums', data);
    });
    // get Elvis' albums, using Promises through Promise, Q or when
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
    .then(function(data) {
        console.log('Artist albums', data);
    }, function(err) {
        console.error(err);
    });
});

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
        console.log(response);
        var userChoice = response.videos.results[3].key;
        var youTube = 'http://www.youtube.com/embed/' + userChoice;
        console.log(youTube);
    });
});
// ---------------------------------------------------------

searchBtn.on('click', function() {
    var userInput = $('#search').val();
    console.log('hello');
    console.log(userInput);
});


// --------------------------------------------------------- Spotify API




