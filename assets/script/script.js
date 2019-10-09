// // Global variables
const movieSelector = $('#movie-btn').on('click', addMovie);
const musicSelector = $('#music-btn').on('click', addMusic);
const musicBtn = $(document).on('click', '.music-item', musicMEDO);
const removeBtn = $(document).on('click', '.remove', removeItem);
var musicSelection;

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

        var newVideo = $('<iframe>').attr({
            'src': youTube,
            'height': '400px',
            'width': '600px'
        });

        $('body').append(newVideo);
    });
});


function addMovie() {
    if ( $('#search').val() === '') {
        return;
    } else {
        var userInput = $('#search').val();                 // define the search value
        // movieArray.push(userInput);                         // push the value of the search bar to the musicArray
        var newRow = $('<tr>').attr('class', 'movie-item');  // create a table row dynamically, add 'medo-item' class
        var newItem = $('<td>').attr({                      // create a new table data, add the modal attributes
            'class': 'movie-item',
            'data-toggle': "modal", 
            'data-target': "#movieModal",
            'data-name': userInput
        });    

        newItem.text(userInput);                            // take the value in the search bar and make it the text of the table data
        var newButton = $('<button>').text('X').attr('class', 'remove');            // create a button give it an id of remove
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
        // musicArray.push(userInput);                         // push the value of the search bar to the musicArray
        var newRow = $('<tr>');                             // create a table row dynamically, add 'medo-item' class
        var newItem = $('<td>').attr({                      // create a new table data, add the modal attributes
            'class': 'music-item',
            'data-toggle': "modal", 
            'data-target': "#musicModal",
            'data-name': userInput
        });     
                   
        newItem.text(userInput);                            // take the value in the search bar and make it the text of the table data
        var newButton = $('<button>').text('X').attr('class', 'remove');             // create a button give it an id of remove
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
    var musicSelector = $(this).attr('data-name');
    console.log(musicSelector);
    console.log($(this));
    console.log(this);
    var lastfmKEY = 'd1540ed62dffa25c98967940f03afc6f';
    var lastfmURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + musicSelector + '&api_key=' + lastfmKEY + '&format=json';

    $.ajax({
        url: lastfmURL,
        method: 'GET'
    }).then(function(response) {
        var bandName = response.artist.name;
        var bandBio = response.artist.bio.summary;
        var genre = response.artist.tags.tag;                   // array
        var similarBands = response.artist.similar.artist;      // array

        $('#band-bio').html(bandBio);                               // filling in the band bio
        $('#genre').empty();
        for (var j = 0; j < genre.length; j++) {                    // filling in all of the genre tags
            var genreLoop = $('<span>').text(genre[j].name + ' ');
            $('#genre').append(genreLoop);
        }

        $('#similar-bands').empty();
        for (var i = 0; i < similarBands.length; i++) {             // filling in all of the similar bands
            var bandLoop = $('<h6>').text(similarBands[i].name);
            $('#similar-bands').append(bandLoop);
        }

        var lastfmDetails = 'http://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=' + musicSelector + '&api_key=' + lastfmKEY + '&format=json';
        $.ajax({
            url: lastfmDetails,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
            $('#band-name').text(bandName);                             // filling in the band name

            var bandPhoto = response.topalbums.album[0].image[0]['#text'];      // array
            console.log(bandPhoto);
            $('#band-image').attr({
                'src': bandPhoto,
                'height': '250px',
                'width': '250px'
            })
        })
    });
    // make an ajax call to Spotify and pull the responses you want
    // add the fields you'd like to pull to the modal so that the content can just fill in the blanks
    // include name of the band/artist, genre, a press photo, a small bio, and top 5 tracks from that artist / *music video*?
    // also any cool content you can find!
    // make the modal appear when the item is clicked
}

function removeItem() {
    // create a variable // var key = medoItem.attr('data-name);
    $(this).closest('tr').detach();
    // remove this item from Firebase
}


// if we can, add if/else statements so that we can match movies or music based on what someone watches or listens to