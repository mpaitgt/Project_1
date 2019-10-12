<<<<<<< HEAD

//var videoPath='https://api.themoviedb.org/3/movie/{movie_id}/video?api_key=95a6c9d4de568b3ebaa4ea26320798b4';

//END OF LATEST ATTEMPT CODE
var movies = [];

function displayMovieInfo() {


  var movie = $("#movie-input").val();
  var APIkey = '95a6c9d4de568b3ebaa4ea26320798b4';
  var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + APIkey + '&query=' + movie;

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: 'GET'
  })

    .then(function (response) {
      var movieObject = response.results[0];
      var queryDetails = movieObject.id;
      var detailsURL = 'https://api.themoviedb.org/3/movie/' + queryDetails + '?api_key=' + APIkey + '&append_to_response=videos';

      $.ajax({
        url: detailsURL,
        method: 'GET'
      }).then(function (data) {
        console.log(data)

        var userChoice = data.videos.results[0].key;
        
        var youTube = 'https://www.youtube.com/embed/';
        var video = youTube + userChoice;
        console.log(video);
        // Creating an element to hold the video
      var videoContainer = $("<iframe>").attr("src", video);
  
      // Appending the image
      movieDiv.append(videoContainer);
      });
  
      // Creating a div to hold the movie
      var movieDiv = $("<div class='movie'>");

      // Retrieving the URL for the image
      var imageURL = 'https://image.tmdb.org/t/p/w500';
      var imgURL = imageURL + movieObject.poster_path;

      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      movieDiv.append(image);

      // Storing the move id data
      var id = movieObject.id;

      // Creating an element to have the rating displayed
      var pOne = $("<p>").text("Movie ID: " + id);

      // Displaying the rating
      movieDiv.append(pOne);

      // Storing the release year
      var release_date = movieObject.release_date;

      // Creating an element to hold the release year
      var pTwo = $("<p>").text("Released: " + release_date);

      // Displaying the release year
      movieDiv.append(pTwo);

      // Storing the plot
      var overview = movieObject.overview;

      // Creating an element to hold the plot
      var pThree = $("<p>").text("Overview: " + overview);

      // Appending the overview
      movieDiv.append(pThree);

   // Putting the entire movie above the previous movies
      $("#movies-view").prepend(movieDiv);
    });
};

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < movies.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of movie-btn to our button
    a.addClass("movie-btn");
    // Adding a data-attribute
    a.attr("data-name", movies[i]);
    // Providing the initial button text
    a.text(movies[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a movie button is clicked
$("#add-movie").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var movie = $("#movie-input").val().trim();

  // Adding movie from the textbox to our array
  movies.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".movie-btn", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();



=======
// Global variables and event listeners
const movieSelector = $('#movie-btn').on('click', addMovie);
const musicSelector = $('#music-btn').on('click', addMusic);
const musicBtn = $(document).on('click', '.music-name', musicMEDO);
const movieBtn = $(document).on('click', '.movie-name', movieMEDO);
const removeBtn = $(document).on('click', '.remove', removeItem);
const likeBtn = $(document).on('click', '.like', favoriteMedia);
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
    
    if ($('#search').val() === '') {
        return;
    } else if (movieArray.includes(userInput)) {        
        return;
    } else {  
        movieArray.push(userInput);  
        database.ref('Watch/').push({
            movie: userInput
        });       
    }   
}  

function addMusic() {                       // Adds a music item to the music medo
    var userInput = $('#search').val(); 

    if ($('#search').val() === '') {
        return;
    } else if (musicArray.includes(userInput)) {       
        return;
    } else {  
        musicArray.push(userInput);  
        database.ref('Listen/').push({
            artist: userInput
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
        var basePosterURL = 'http://image.tmdb.org/t/p/w185';
        var moviePoster = movieObject.poster_path;
        
        console.log(basePosterURL + moviePoster);
        $('#movie-title').text(movieTitle);
        $('#movie-poster').attr('src', basePosterURL + moviePoster);
        $('#movie-summary').html(movieSummary);
        $('#release-date').text(movieRelease);

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

        $.ajax({
            url: recommendationsURL,
            method: 'GET'
        }).then(function(recResponse) {
            console.log(recResponse);
            var recObject = response.results;
            for (var x = 0; x < recObject.length; x++) {

            }
        });
    });
}

function musicMEDO() {
    var artistPicked = $(this).attr('data-name');
    var lastfmKEY = 'd1540ed62dffa25c98967940f03afc6f';
    var lastfmURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artistPicked + '&api_key=' + lastfmKEY + '&format=json';

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
        var lastfmDetails = 'http://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=' + artistPicked + '&api_key=' + lastfmKEY + '&format=json';
        
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
    var newListItem = $('<li>').attr('class', 'music-item list-group-item hvr-shutter-out-vertical');
    var newListen = $('<span>').attr({                  
        'class': 'music-name col-10',
        'data-name': newArtist, 
        'data-ref': key,
        'data-toggle': "modal", 
        'data-target': "#musicModal"
    });     
    var newRemove = $('<button>').text('X').attr({
        'class': 'remove listen col-1',
        'data-name': newArtist,
        'data-ref': key
    }); 
    var newLike = $('<button>').text('Like').attr({
        'class': 'like listen col-1',
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
        'class': 'movie-name col-10',
        'data-name': newMovie, 
        'data-ref': key,
        'data-toggle': "modal", 
        'data-target': "#movieModal"
    });     
    var newRemove = $('<button>').text('X').attr({
        'class': 'remove watch col-1',
        'data-name': newMovie,
        'data-ref': key
    }); 
    var newLike = $('<button>').text('Like').attr({
        'class': 'like watch col-1',
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
            'class': 'music-name col-10',
            'data-name': newFavoriteArtist, 
            'data-ref': key,
            'data-toggle': "modal", 
            'data-target': "#musicModal"
        });     
        var musicTag = $('<span>').text('listened').attr('class', 'listen-tag'); 
        var newRemove = $('<button>').text('X').attr({
            'class': 'remove listen col-1',
            'data-name': newFavoriteArtist,
            'data-ref': key
        }); 
        newListen.text(newFavoriteArtist);                                              
        newListItem.append(newListen, musicTag, newRemove);

    } else if (category.favorite_movie) {
        var newListItem = $('<li>').attr('class', 'movie-item list-group-item hvr-shutter-out-vertical');
        var newWatch = $('<span>').attr({                  
            'class': 'movie-name col-10',
            'data-name': newFavoriteMovie, 
            'data-ref': key,
            'data-toggle': "modal", 
            'data-target': "#movieModal"
        });  
        var movieTag = $('<span>').text('watched').attr('class', 'watch-tag');   
        var newRemove = $('<button>').text('X').attr({
            'class': 'remove watch col-1',
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

    if (thisItem.hasClass('music-item')) {
        database.ref('Favorites/').push({
            favorite_artist: name
        });
        database.ref('Listen/' + key).remove();

    } else if (thisItem.hasClass('movie-item')) {
        database.ref('Favorites/').push({
            favorite_movie: name
        });
        database.ref('Watch/' + key).remove();
    }
    // when like button is clicked, use the ajax call to access the related artists
    // store those related artists in the database
    // pull the related artists from the database and display them prepended in the recommended id
}

// recommended function
// make it an event listener that fires when the like button is pressed


// detach the clicked list item and append it - not prepend as it was before - to the list
// populate the recommended list by calling the musicMEDO function
// may need to create an array so that these band names stay static on the page
// rather than being pulled from the API on every page load
// when the like button is clicked, grab the recommended artists from the JSON object with a for loop (grab 3)
// push the three into an array (find a method that puts them first in the array)
// have the array populate the recommended field
// give each of the list items in the recommended field the music or movie medo class so that the modal works for them too
// concatinate what category it is 
// i.e.
// userInput;
// var category = $('<span>').attr('class', 'category'); - style this so that it stands out clearly as a marker
// category.text(' Listen/Watch');
// var newRec = userInput + category;
>>>>>>> e4290cd782b0150f6cd6d19a7a185758068ffc25
