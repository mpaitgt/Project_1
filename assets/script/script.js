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
    console.log(movieObject);
    var queryDetails = movieObject.id;
    var detailsURL = 'https://api.themoviedb.org/3/movie/' + queryDetails + '/recommendations?api_key=' + APIkey + '&language=en-US&page=1';
    // var detailsURL = 'https://api.themoviedb.org/3/movie/' + queryDetails + '?api_key=' + APIkey + '&append_to_response=videos';

    $.ajax({
        url: detailsURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
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

const addRec = function(userInput) {
    newListItem.append(userInput)
}


function addMovie() {
    if ($('#search').val() === '') {
        return;
    } else {
        var userInput = $('#search').val();
        var newListItem = $('<li>').attr('class', 'list-group-item hvr-shutter-out-vertical', 'movie-item');
        var newItem = $('<span>').attr({
            'class': 'movie-item col-10',
            'data-toggle': "modal",
            'data-target': "#movieModal",
            'data-name': userInput
        });

        newItem.text(userInput);
        var newButton = $('<button>').text('X').attr('class', 'remove');
        var newLike = $('<button>').text('Recs').attr('class', 'recs');
        $('#search').val('');
        newListItem.append(newItem, newLike, newButton);
        $('#movie-medo').prepend(newListItem);
    }
}

function addMusic(addRec, musicMEDO) { // this function adds a music item to the music medo
    if ($('#search').val() === '') {
        return;
    } else {
        var userInput = $('#search').val();
        var newListItem = $('<li>').attr('class', 'list-group-item hvr-shutter-out-vertical');
        var newBand = $('<span>').attr({
            'class': 'music-item col-10',
            'data-toggle': "modal",
            'data-target': "#musicModal",
            'data-name': userInput
        });
        var newRemove = $('<button>').text('X').attr('class', 'remove col-1');
        var newLike = $('<button>').text('Recs').attr('class', 'recs');

        newBand.text(userInput);
        newListItem.append(newBand, newRemove, newLike);
        $('#music-medo').prepend(newListItem);
        $('#search').val('');
    }
    addRec(musicMEDO, userInput);

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
    console.log('hellohello');
    var lastfmKEY = 'd1540ed62dffa25c98967940f03afc6f';
    var lastfmURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + musicSelector + '&api_key=' + lastfmKEY + '&format=json';

    $.ajax({
        url: lastfmURL,
        method: 'GET'
    }).then(function(response) {
        var bandName = response.artist.name;
        var bandBio = response.artist.bio.summary;
        var genre = response.artist.tags.tag; // array
        var similarBands = response.artist.similar.artist; // array

        $('#band-bio').html(bandBio); // filling in the band bio
        $('#genre').empty();
        for (var j = 0; j < genre.length; j++) { // filling in all of the genre tags
            var genreLoop = $('<span>').text(genre[j].name + ' ');
            $('#genre').append(genreLoop);
        }

        $('#similar-bands').empty();
        for (var i = 0; i < similarBands.length; i++) { // filling in all of the similar bands
            var bandLoop = $('<h6>').text(similarBands[i].name);
            $('#similar-bands').append(bandLoop);
        }

        var lastfmDetails = 'http://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=' + musicSelector + '&api_key=' + lastfmKEY + '&format=json';
        $.ajax({
            url: lastfmDetails,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
            $('#band-name').text(bandName); // filling in the band name

            var bandPhoto = response.topalbums.album[0].image[3]['#text']; // array
            console.log(bandPhoto);
            $('#band-image').attr({
                'src': bandPhoto,
                'height': '250px',
                'width': '250px'
            })
        })
    });
}

function removeItem() {
    // create a variable // var key = medoItem.attr('data-name);
    $(this).closest('li').detach();
    // remove this item from Firebase
}


// if we can, add if/else statements so that we can match movies or music based on what someone watches or listens to