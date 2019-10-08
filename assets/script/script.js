// // Global variables
// requirejs.config({
//     baseUrl: 'js/lib',
//     paths: {
//         // the left side is the module ID,
//         // the right side is the path to
//         // the jQuery file, relative to baseUrl.
//         // Also, the path should NOT include
//         // the '.js' file extension. This example
//         // is using jQuery 1.9.0 located at
//         // js/lib/jquery-1.9.0.js, relative to
//         // the HTML page.
//         jquery: 'jquery-3.4.1'
//     }
// });
// var Spotify, s, spotifyApi;
const movieBtn = $('#movie-btn').on('click', addMovie);
const musicBtn = $('#music-btn').on('click', addMusic);
let movieArray = [];
let musicArray = [];

// ------------------------------------------------------------ Firebase configuration
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC3YGy5JfZHdYFNGh8PRicPvSJnXPEtryc",
    authDomain: "medo-3c7b5.firebaseapp.com",
    databaseURL: "https://medo-3c7b5.firebaseio.com",
    projectId: "medo-3c7b5",
    storageBucket: "",
    messagingSenderId: "759891052026",
    appId: "1:759891052026:web:28e21af9c79d0bc71bd043"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


// require(['spotify-web-api-js'], function (Spotify) {
//     // foo is now loaded.
//     spotifyApi = new SpotifyWebApi();
//     spotifyApi.setAccessToken('2bc509995dmsh8326cbc86baf20dp1bcc38jsnf0bffeeb17c5');
//     // spotifyApi.setPromiseImplementation(Q);

//     // get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
//     spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
//         if (err) console.error(err);
//         else console.log('Artist albums', data);
//     });
//     // get Elvis' albums, using Promises through Promise, Q or when
//     spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
//     .then(function(data) {
//         console.log('Artist albums', data);
//     }, function(err) {
//         console.error(err);
//     });
// });

// authorizeSpotify();
// function authorizeSpotify() {
//     $.ajax({

//     }), function() {
//         'client_id': '',
//         'response_type': '',
//         'redirect_url': ''
//     }, function(result) {

//     }
// }

// function requestToken() {
//     $.ajax(
//         {
//           method: "POST",
//           url: "https://accounts.spotify.com/api/token",
//           data: {
//             "grant_type":    "authorization_code",
//             "code":          code,
//             "redirect_uri":  "localhost",
//             "client_secret": "",
//             "client_id":     "",
//           },
//           success: function(result) {
//                 configureSpotify(result)
//           },
//         }
//       );
// }

// function configureSpotify(token){
//     require(['spotify-web-api-js'], function (Spotify) {
//         // foo is now loaded.
//         spotifyApi = new SpotifyWebApi();
//         console.log(spotifyApi);
//         spotifyApi.setAccessToken('BQBcYS-E2-ce6qSORz3v-a9Vh3JRwQb73aCHTsZIQDnU64gprfI_zUS-lyli9YSeMEVaVpuPIU0WGjugmpji_ip7ox3JMvzGkDySN4Dpt3O352Xs7wVjKPXqxB91SlmXQRXDIOw5pIkSZOLV8ZFCWicipOOHnixx9IuIaRtNQQ03UO7B6WXswUaAVYfda0Ay0AATLMFusJA0iXaj41YSf5FMtMOJija8OF13OQJD33yaz9ILeo8AXHe2PLZVhtOqH1b6kTPJvh6-');
//         // spotifyApi.setPromiseImplementation(Q);
//         // get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
//         spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function(err, data) {
//             if (err) console.error(err);
//             else console.log('Artist albums', data);
//         });
//         // get Elvis' albums, using Promises through Promise, Q or when
//         spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
//         .then(function(data) {
//             console.log('Artist albums', data);
//         }, function(err) {
//             console.error(err);
//         });
//     });
// }

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

function addMovie() {
    if ( $('#search').val() === '') {
        return;
    } else {
        var userInput = $('#search').val();                 // define the search value
        movieArray.push(userInput);                         // push the value of the search bar to the musicArray
        var newRow = $('<tr>').attr('class', 'medo-item');  // create a table row dynamically, add 'medo-item' class
        var newItem = $('<td>').attr({                      // create a new table data, add the modal attributes
            'data-toggle': "modal", 
            'data-target': "#movieModal"
        });    

        newItem.text(userInput);                            // take the value in the search bar and make it the text of the table data
        var newButton = $('<button>').text('X');            // create a button give it an id of remove
        $('#search').val('');                               // empty the input value of the search bar
        newRow.append(newItem, newButton);                  // append the search term and the button the newly created table row
        $('#movie-medo').prepend(newRow);                   // prepend the table tow to the t-body id 'music-medo'

        // do this with Firebase configuration *IF YOU CAN* Also give the new item a data-name of the Firebase key
    }
}   

function addMusic() {
    if ( $('#search').val() === '') {
        return;
    } else {
        var userInput = $('#search').val();                 // define the search value
        musicArray.push(userInput);                         // push the value of the search bar to the musicArray
        var newRow = $('<tr>').attr('class', 'medo-item');  // create a table row dynamically, add 'medo-item' class
        var newItem = $('<td>').attr({                      // create a new table data, add the modal attributes
            'data-toggle': "modal", 
            'data-target': "#musicModal"
        });                
        newItem.text(userInput);                            // take the value in the search bar and make it the text of the table data
        var newButton = $('<button>').text('X');            // create a button give it an id of remove
        $('#search').val('');                               // empty the input value of the search bar
        newRow.append(newItem, newButton);                  // append the search term and the button the newly created table row
        $('#music-medo').prepend(newRow);                   // prepend the table tow to the t-body id 'music-medo'

        // do this with Firebase configuration *IF YOU CAN* Also give the new item a data-name of the Firebase key
    }
}

function movieMEDO() {
    // make an ajax call to TMBb and pull the responses you want
    // add the fields you'd like to pull to the modal so that the content can just fill in the blanks
    // include name of the movie, a poster for the movie, a small synopsis, the director, who stars, and a trailer
    // also include a rotten tomatoes review(s) if you can!
    // make the modal appear when the item is clicked
}

function musicMEDO() {
    // make an ajax call to Spotify and pull the responses you want
    // add the fields you'd like to pull to the modal so that the content can just fill in the blanks
    // include name of the band/artist, genre, a press photo, a small bio, and top 5 tracks from that artist / *music video*?
    // also any cool content you can find!
    // make the modal appear when the item is clicked
}

function removeItem() {
    // create a variable // var key = medoItem.attr('data-name);
    // detach $(this) table row (use the closest method)
    // remove this item from Firebase
}


// if we can, add if/else statements so that we can match movies or music based on what someone watches or listens to