// Global variables and event listeners
$('#movie-btn').on('click', addMovie);              // add movie to list
$('#music-btn').on('click', addMusic);              // add music to list

$(document).on('click', '.music-name', function() { // api call to display movie info
    var artistPicked = $(this).attr('data-name');
    musicMEDO(artistPicked, getBandImage);
    musicMEDO(artistPicked, getTopTracks);
});

$(document).on('click', '.movie-name', function() { // api call to display music info
    var moviePicked = $(this).attr('data-name');
    movieMEDO(moviePicked, getYouTube);
});

$(document).on('click', '.like', function() {       // moves item to favorites and recommends similar stuff
    var favePick = $(this).attr('data-name');
    var key = $(this).attr('data-ref');
    var thisItem = $(this).closest('li');
    
    if (thisItem.hasClass('music-item')) {
        favoriteMedia(favePick, key, thisItem, getMusicRecommendations);
    } else if (thisItem.hasClass('movie-item')) {
        favoriteMedia(favePick, key, thisItem, getMovieRecommendations);
    }
});

$(document).on('click', '.remove', removeItem);     // removes an item from your list
$('#clear-fave-btn').on('click', clearFavorites);   // clears all the favorites

var musicArray = [];
var movieArray = [];
var favoritesArray = [];
var omdbKey = '95a6c9d4de568b3ebaa4ea26320798b4';
var lastfmKEY = 'd1540ed62dffa25c98967940f03afc6f';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC3YGy5JfZHdYFNGh8PRicPvSJnXPEtryc",
    authDomain: "medo-3c7b5.firebaseapp.com",
    databaseURL: "https://medo-3c7b5.firebaseio.com",
    projectId: "medo-3c7b5",
    storageBucket: "medo-3c7b5.appspot.com",
    messagingSenderId: "759891052026",
    appId: "1:759891052026:web:28e21af9c79d0bc71bd043"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Functions
function addMovie() { // Adds a movie item to the music medo
    var userInput = $('#search').val();
    var dateAdded = moment().format();

    if ($('#search').val() === '') {
        return;
    } else if (movieArray.includes(userInput) || favoritesArray.includes(userInput)) {
        $('#recommended').empty();
        var newMessage = $('<h1>');
        newMessage.text('This movie is already included in one of your lists.');
        $('#recommended').append(newMessage);
        return;
    } else {
        movieArray.push(userInput);
        database.ref('Watch/').push({
            movie: userInput,
            date_added: dateAdded
        });
    }
}

function addMusic() { // Adds a music item to the music medo
    var userInput = $('#search').val();
    var dateAdded = moment().format();

    if ($('#search').val() === '') {
        return;
    } else if (musicArray.includes(userInput) || favoritesArray.includes(userInput)) {
        $('#rec-message').empty();
        var newMessage = $('<h1>');
        newMessage.text('This band is already included in one of your lists.');
        $('#rec-message').append(newMessage);
        return;
    } else {
        musicArray.push(userInput);
        database.ref('Listen/').push({
            artist: userInput,
            date_added: dateAdded
        });
    }
}

function movieMEDO(movie, callback) {
    var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + omdbKey + '&query=' + movie;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        var movieObject = response.results[0];
        var movieTitle = movieObject.title;
        var movieSummary = movieObject.overview;
        var movieRelease = movieObject.release_date;
        var releaseMoment = moment(movieRelease).format('MMMM D YYYY');
        var basePosterURL = 'https://image.tmdb.org/t/p/w185';
        var moviePoster = movieObject.poster_path;
        var posterExt = basePosterURL + moviePoster;
        var queryDetails = movieObject.id;

        $('#movie-title').text(movieTitle);
        $('#movie-image').attr({
            'src': posterExt.toString(),
            'class': 'shadow-lg float-left mr-5'
        });
        $('#movie-summary').html(movieSummary);
        $('#release-date').text(releaseMoment);

        callback(queryDetails);
    });
}

function musicMEDO(artist, callback) {
    var lastfmURL = 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist + '&api_key=' + lastfmKEY + '&format=json';

    $.ajax({
        url: lastfmURL,
        method: 'GET'
    }).then(function(response) {

        if (response.error) {
            $('#band-name').text('This is not a band');
        } else {
            var bandName = response.artist.name;
            var bandBio = response.artist.bio.summary;
            var genre = response.artist.tags.tag;
            var similarBands = response.artist.similar.artist;

            $('#band-bio').html(bandBio);
            $('#genre').empty();
            for (var j = 0; j < genre.length; j++) {
                var genreLoop = $('<span>').text(genre[j].name + ' ');
                $('#genre').append(genreLoop);
            }
            $('#similar-bands').empty();
            for (var i = 0; i < similarBands.length; i++) {
                var newHREF = response.artist.similar.artist[i].url;
                var newLink = $('<a>').attr({
                    'href': newHREF,
                    'target': '_blank'
                });
                var bandLoop = $('<h6>').text(similarBands[i].name);
                newLink.append(bandLoop);
                $('#similar-bands').append(newLink);
            }

            callback(artist);
        }
    });
}

database.ref('Listen/').on('child_added', function(data) { // LISTEN retrieves data from Firebase on page load
    var newArtist = data.val().artist;
    var dateAdded = data.val().date_added;
    var dateMoment = moment(dateAdded).fromNow();
    var key = data.key;

    musicArray.push(newArtist);

    var newListItem = $('<li>').attr('class', 'music-item list-group-item hvr-shutter-out-vertical d-flex justify-content-between');
    var newListen = $('<span>').attr({
        'class': 'music-name',
        'data-name': newArtist,
        'data-ref': key,
        'data-toggle': "modal",
        'data-target': "#musicModal"
    });
    var newDate = $('<span>').text(dateMoment).attr('class', 'date-added');
    var newRemove = $('<button>').text('X').attr({
        'class': 'remove listen',
        'data-name': newArtist,
        'data-ref': key
    });
    var newLike = $('<button>').text('Like').attr({
        'class': 'like listen',
        'data-name': newArtist,
        'data-ref': key
    });
    newListen.text(newArtist);
    newListItem.append(newListen, newDate, newLike, newRemove);
    $('#music-medo').prepend(newListItem);
    $('#search').val('');
});

database.ref('Watch/').on('child_added', function(data) { // WATCH retrieves data from Firebase on page load
    var newMovie = data.val().movie;
    var dateAdded = data.val().date_added;
    var dateMoment = moment(dateAdded).fromNow();
    var key = data.key;

    movieArray.push(newMovie);

    var newListItem = $('<li>').attr('class', 'movie-item list-group-item hvr-shutter-out-vertical d-flex justify-content-between');
    var newWatch = $('<span>').attr({
        'class': 'movie-name',
        'data-name': newMovie,
        'data-ref': key,
        'data-toggle': "modal",
        'data-target': "#movieModal"
    });
    var newDate = $('<span>').text(dateMoment).attr('class', 'date-added');
    var newRemove = $('<button>').text('X').attr({
        'class': 'remove watch',
        'data-name': newMovie,
        'data-ref': key
    });
    var newLike = $('<button>').text('Like').attr({
        'class': 'like watch',
        'data-name': newMovie,
        'data-ref': key
    });
    newWatch.text(newMovie);
    newListItem.append(newWatch, newDate, newLike, newRemove);
    $('#movie-medo').prepend(newListItem);
    $('#search').val('');
});

database.ref('Favorites/').on('child_added', function(data) { // FAVORITES retrieves data from Firebase on page load
    var newFavoriteArtist = data.val().favorite_artist;
    var newFavoriteMovie = data.val().favorite_movie;
    var key = data.key;
    var category = data.val();

    if (newFavoriteArtist) {
        favoritesArray.push(newFavoriteArtist);
    } else if (newFavoriteMovie) {
        favoritesArray.push(newFavoriteMovie);
    }

    if (category.favorite_artist) {
        var newListItem = $('<li>').attr('class', 'music-item list-group-item hvr-shutter-out-vertical d-flex justify-content-between align-items-center');
        var newListen = $('<span>').attr({
            'class': 'music-name',
            'data-name': newFavoriteArtist,
            'data-ref': key,
            'data-toggle': "modal",
            'data-target': "#musicModal"
        });
        var musicTag = $('<span>').text('listened').attr('class', 'listen-tag');
        var newRemove = $('<button>').text('X').attr({
            'class': 'remove listen',
            'data-name': newFavoriteArtist,
            'data-ref': key
        });
        newListen.text(newFavoriteArtist);
        newListItem.append(newListen, musicTag, newRemove);

    } else if (category.favorite_movie) {
        var newListItem = $('<li>').attr('class', 'movie-item list-group-item hvr-shutter-out-vertical d-flex justify-content-between align-items-center');
        var newWatch = $('<span>').attr({
            'class': 'movie-name',
            'data-name': newFavoriteMovie,
            'data-ref': key,
            'data-toggle': "modal",
            'data-target': "#movieModal"
        });
        var movieTag = $('<span>').text('watched').attr('class', 'watch-tag');
        var newRemove = $('<button>').text('X').attr({
            'class': 'remove watch',
            'data-name': newFavoriteMovie,
            'data-ref': key
        });
        newWatch.text(newFavoriteMovie);
        newListItem.append(newWatch, movieTag, newRemove);
    }

    $('#favorites-list').prepend(newListItem);
});

function removeItem() {
    var key = $(this).attr('data-ref');
    var thisItem = $(this).closest('li');
    thisItem.detach();
    if (thisItem.hasClass('music-item')) {
        database.ref('Listen/' + key).remove(); //WORKING
        database.ref('Favorites/' + key).remove();
        musicArray.splice(musicArray.indexOf(name), 1);

    } else if (thisItem.hasClass('movie-item')) {
        database.ref('Watch/' + key).remove(); //WORKING
        database.ref('Favorites/' + key).remove();
        movieArray.splice(movieArray.indexOf(name), 1);
    }
};

function favoriteMedia(somePick, someKey, item, callback) { // moves the media to the favorites section
    item.detach();
    var recText = $('<h2>').text('Since you liked ' + somePick + '').attr({
        'id': 'rec-prompt'
    });
    $('#recommended').empty();
    $('#rec-message').empty();
    $('#rec-message').prepend(recText);
    $('#favorites-text').attr('class', 'favorites-text');

    if (item.hasClass('music-item')) {      // if you're liking a music item
        database.ref('Favorites/').push({
            favorite_artist: somePick
        });
        database.ref('Listen/' + someKey).remove();
        callback(somePick);

    } else if (item.hasClass('movie-item')) {       // if you're liking a movie item
        database.ref('Favorites/').push({
            favorite_movie: somePick
        });
        database.ref('Watch/' + someKey).remove();
        callback(somePick);
    }
}

function getYouTube(movieID) {
    var youtubeURL = 'https://api.themoviedb.org/3/movie/' + movieID + '?api_key=' + omdbKey + '&append_to_response=videos';

    $.ajax({
        url: youtubeURL,
        method: 'GET'
    }).then(function(response) {
        var userChoice = response.videos.results;
        $('#youtube-content').empty();
        for (var j = 0; j <= 4; j++) {
            var youTube = 'https://www.youtube.com/embed/' + userChoice[j].key;
            var newVideo = $('<iframe>').attr({
                'src': youTube,
                'height': '400px',
                'width': '600px'
            });
            $('#youtube-content').append(newVideo);
        }
    });
};

function getBandImage(artist) {
    var lastfmImage = 'https://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=' + artist + '&api_key=' + lastfmKEY + '&format=json';

    $.ajax({
        url: lastfmImage,
        method: 'GET'
    }).then(function(data) {
        $('#band-name').text(artist);
        var bandPhoto = data.topalbums.album[0].image[3]['#text'];
        $('#band-image').attr({
            'src': bandPhoto,
            'class': 'shadow-lg float-left mr-5 mb-5'
        })
    })
}

function getTopTracks(artist) {
    var lastfmTracks = 'https://ws.audioscrobbler.com/2.0/?method=artist.getTopTracks&artist=' + artist + '&api_key=' + lastfmKEY + '&format=json';

    $.ajax({
        url: lastfmTracks,
        method: 'GET'
    }).then(function(tracks) {
        var topTracks = tracks.toptracks.track;
        $('#top-tracks').empty();
        for (var x = 0; x <= 4; x++) {
            var trackHREF = topTracks[x].url;
            var newLink = $('<a>').attr({
                'href': trackHREF,
                'target': '_blank'
            });
            var tracksLoop = $('<h6>').text(topTracks[x].name);
            newLink.append(tracksLoop);
            $('#top-tracks').append(newLink);
        }
    })
}

function getMusicRecommendations(name) {
    var musicRecommendationsURL = 'https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=' + name + '&api_key=' + lastfmKEY + '&format=json';

    $.ajax({
        url: musicRecommendationsURL,
        method: 'GET'
    }).then(function(response) {
        var similarBands = response.similarartists.artist;

        for (var x = 0; x < 3; x++) {
            var randomBand = Math.floor(Math.random() * similarBands.length);
            var bandName = similarBands[randomBand].name;
            var medoRec = $('<li>').text(bandName).addClass('music-name animated slideInLeft delay-0.5s');
            medoRec.attr({
                'data-name': bandName,
                'data-toggle': "modal",
                'data-target': "#musicModal"
            });
            $('#recommended').append(medoRec);
        };
    });
}

function getMovieRecommendations(movieID) {
    var movieRecommendationsURL = 'https://api.themoviedb.org/3/movie/' + movieID + '/recommendations?api_key=' + omdbKey + '&language=en-US&page=1';

    $.ajax({
        url: movieRecommendationsURL,
        method: 'GET'
    }).then(function(recResponse) {
        var recObject = recResponse.results;
        for (var x = 0; x < 3; x++) {
            var randomMovie = Math.floor(Math.random() * recObject.length);
            var movieName = recObject[randomMovie].title;
            var medoRec = $('<li>').text(movieName).addClass('movie-name animated slideInLeft delay-0.5s');
            medoRec.attr({
                'data-name': movieName,
                'data-toggle': "modal",
                'data-target': "#movieModal"
            });
            $('#recommended').append(medoRec);
        };
    });
}

function clearFavorites() {
    database.ref('Favorites/').remove();
    $('#favorites-list').empty();
}