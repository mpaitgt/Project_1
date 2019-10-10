
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



