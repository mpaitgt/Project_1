// Global variables and event listeners
const movieSelector = $('#movie-btn').on('click', addMovie);
const musicSelector = $('#music-btn').on('click', addMusic);
const musicBtn = $(document).on('click', '.music-name', musicMEDO);
const movieBtn = $(document).on('click', '.movie-name', movieMEDO);
const removeBtn = $(document).on('click', '.remove', removeItem);
const likeBtn = $(document).on('click', '.like', favoriteMedia);
const musicRecBtn = $(document).on('click', '.recommendations', musicMEDO);
const movieRecBtn = $(document).on('click', '.recommendations', movieMEDO);
var musicSelection;
var movieSelection;
var musicArray = [];
var movieArray = [];

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
function addMovie() {                       // Adds a movie item to the music medo
    var userInput = $('#search').val();
    var dateAdded = moment().format('LLLL');

    if ($('#search').val() === '') {
        return;
    } else if (movieArray.includes(userInput)) {        
        return;
    } else {  
        movieArray.push(userInput);  
        database.ref('Watch/').push({
            movie: userInput,
            date_added: dateAdded
        });       
    }   
}  

function addMusic() {                       // Adds a music item to the music medo
    var userInput = $('#search').val(); 
    var dateAdded = moment().format('LLLL');

    if ($('#search').val() === '') {
        return;
    } else if (musicArray.includes(userInput)) {       
        return;
    } else {  
        musicArray.push(userInput);  
        database.ref('Listen/').push({
            artist: userInput,
            date_added: dateAdded
        });       
    }
}

function movieMEDO() {
    var moviePicked = $(this).attr('data-name');
    var APIkey = '95a6c9d4de568b3ebaa4ea26320798b4';
    var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + APIkey + '&query=' + moviePicked;
        
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        var movieObject = response.results[0];
        var movieTitle = movieObject.title;
        var movieSummary = movieObject.overview;
        var movieRelease = movieObject.release_date;
        var releaseMoment = moment([movieRelease]).format('MMMM D YYYY');
        console.log(releaseMoment);
        var basePosterURL = 'http://image.tmdb.org/t/p/w185';
        var moviePoster = movieObject.poster_path;
        var posterExt = basePosterURL + moviePoster;

        $('#movie-title').text(movieTitle);
        $('#movie-image').attr({
            'src': posterExt.toString(),
            'width': '25%', 
            'height': '25%'
            });
        $('#movie-summary').html(movieSummary);
        $('#release-date').text(releaseMoment);

        var queryDetails = movieObject.id;
        var recommendationsURL = 'https://api.themoviedb.org/3/movie/' + queryDetails + '/recommendations?api_key=' + APIkey +'&language=en-US&page=1';
        var youtubeURL = 'https://api.themoviedb.org/3/movie/' + queryDetails + '?api_key=' + APIkey + '&append_to_response=videos';
    
        $.ajax({
            url: youtubeURL,
            method: 'GET'
        }).then(function(response) {
            var userChoice = response.videos.results;

            $('#youtube-content').empty();
            for (var j = 0; j <= 4; j++) {
                var youTube = 'http://www.youtube.com/embed/' + userChoice[j].key;
                var newVideo = $('<iframe>').attr({
                    'src': youTube,
                    'height': '400px',
                    'width': '600px'
                });
                $('#youtube-content').append(newVideo);
            }
        });
    });
}

function musicMEDO() {
    var artistPicked = $(this).attr('data-name');
    var lastfmKEY = 'd1540ed62dffa25c98967940f03afc6f';
    var lastfmURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artistPicked + '&api_key=' + lastfmKEY + '&format=json';
    var lastfmDetails = 'http://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=' + artistPicked + '&api_key=' + lastfmKEY + '&format=json';

    $.ajax({
        url: lastfmURL,
        method: 'GET'
    }).then(function(response) {
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
        
        $.ajax({
            url: lastfmDetails,
            method: 'GET'
        }).then(function(data) {
            $('#band-name').text(bandName);
            var bandPhoto = data.topalbums.album[0].image[3]['#text'];
            $('#band-image').attr({
                'src': bandPhoto,
                'height': '250px',
                'width': '250px'
            })
        })
    });
}

database.ref('Listen/').on('child_added', function(data) {      // LISTEN retrieves data from Firebase on page load
    var newArtist = data.val().artist;
    var key = data.key;
    var newListItem = $('<li>').attr('class', 'row mx-auto music-item list-group-item hvr-shutter-out-vertical');
    var newListen = $('<span>').attr({                  
        'class': 'music-name',
        'data-name': newArtist, 
        'data-ref': key,
        'data-toggle': "modal", 
        'data-target': "#musicModal"
    });     
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
    newListItem.append(newListen, newLike, newRemove);
    $('#music-medo').prepend(newListItem);
    $('#search').val('');
});


database.ref('Watch/').on('child_added', function(data) {      // WATCH retrieves data from Firebase on page load
    var newMovie = data.val().movie;
    var key = data.key;
    var newListItem = $('<li>').attr('class', 'movie-item list-group-item hvr-shutter-out-vertical');
    var newWatch = $('<span>').attr({                  
        'class': 'movie-name',
        'data-name': newMovie, 
        'data-ref': key,
        'data-toggle': "modal", 
        'data-target': "#movieModal"
    });     
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
    newListItem.append(newWatch, newLike, newRemove);
    $('#movie-medo').prepend(newListItem);
    $('#search').val('');
});


database.ref('Favorites/').on('child_added', function(data) {      // FAVORITES retrieves data from Firebase on page load
    var newFavoriteArtist = data.val().favorite_artist;
    var newFavoriteMovie = data.val().favorite_movie;
    var key = data.key;
    var category = data.val();

    if (category.favorite_artist) {
        var newListItem = $('<li>').attr('class', 'music-item list-group-item hvr-shutter-out-vertical');
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
        var newListItem = $('<li>').attr('class', 'movie-item list-group-item hvr-shutter-out-vertical');
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
        database.ref('Listen/' + key).remove();                 //WORKING
        database.ref('Favorites/' + key).remove();  
        musicArray.splice(musicArray.indexOf(name), 1);

    } else if (thisItem.hasClass('movie-item')) {
        database.ref('Watch/' + key).remove();                  //WORKING
        database.ref('Favorites/' + key).remove();  
        movieArray.splice(movieArray.indexOf(name), 1);
    }
};

function favoriteMedia() {                  // when the like button fires, this function movies the media to the favorites section
    var key = $(this).attr('data-ref');
    var name = $(this).attr('data-name');
    var thisItem = $(this).closest('li');
    thisItem.detach();
    var recText = $('<h2>').text('Since you liked ' + name + '').attr({
        'id': 'rec-prompt'
    });
    $('#recommended').empty();
    $('#rec-message').empty();
    $('#rec-message').prepend(recText);

    if (thisItem.hasClass('music-item')) {
        database.ref('Favorites/').push({
            favorite_artist: name
        });
        database.ref('Listen/' + key).remove();

        var lastfmKEY = 'd1540ed62dffa25c98967940f03afc6f';
        var lastfmURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=' + name + '&api_key=' + lastfmKEY + '&format=json';
    
        $.ajax({
            url: lastfmURL,
            method: 'GET'
        }).then(function(response) {
            var similarBands = response.similarartists.artist;  
        
            for (var x = 0; x < 3; x++) {
                var randomBand = Math.floor(Math.random() * similarBands.length);
                var bandName = similarBands[randomBand].name;
                var medoRec = $('<h3>').text(bandName).addClass('recommendations animated slideInLeft delay-1.25s');
                medoRec.attr({
                    'data-name': bandName,
                    'data-toggle': "modal", 
                    'data-target': "#musicModal"
                });
                $('#recommended').append(medoRec);
            };
        });

    } else if (thisItem.hasClass('movie-item')) {
        database.ref('Favorites/').push({
            favorite_movie: name
        });
        database.ref('Watch/' + key).remove();

    // MOVIE RECOMMENDED AJAX CALL
        var moviePicked = $(this).attr('data-name');
        var APIkey = '95a6c9d4de568b3ebaa4ea26320798b4';
        var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + APIkey + '&query=' + name;
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {
            console.log(response);
            var movieObject = response.results[0];
    
            // start here
            var queryDetails = movieObject.id;
            var recommendationsURL = 'https://api.themoviedb.org/3/movie/' + queryDetails + '/recommendations?api_key=' + APIkey +'&language=en-US&page=1';
            var youtubeURL = 'https://api.themoviedb.org/3/movie/' + queryDetails + '?api_key=' + APIkey + '&append_to_response=videos';

            $.ajax({
                url: recommendationsURL,
                method: 'GET'
            }).then(function(recResponse) {

                console.log(recResponse);
                var recObject = recResponse.results;
                for (var x = 0; x < 3; x++) {
                    var randomMovie = Math.floor(Math.random() * recObject.length);
                    var movieName = recObject[randomMovie].title;
                    var medoRec = $('<h3>').text(movieName).addClass('recommendations animated slideInLeft delay-1.25s');
                    medoRec.attr({
                        'data-name': movieName,
                        'data-toggle': "modal", 
                        'data-target': "#movieModal"
                    });
                    $('#recommended').append(medoRec);
                };
            });
        });
    }
}