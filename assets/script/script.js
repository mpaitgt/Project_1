// Global variables and event listeners
const movieSelector = $('#movie-btn').on('click', addMovie);
const musicSelector = $('#music-btn').on('click', addMusic);
const musicBtn = $(document).on('click', '.music-item', musicMEDO);
const movieBtn = $(document).on('click', '.movie-item', movieMEDO);
const removeBtn = $(document).on('click', '.remove', removeMusicItem);
const likeBtn = $(document).on('click', '.like', recommendedMedia);
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

// ---------------------------------------------------------TMDB
var APIkey = '95a6c9d4de568b3ebaa4ea26320798b4';
var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + APIkey + '&query=' + '2001';

$.ajax({
    url: queryURL,
    method: 'GET'
}).then(function(response) {
    
    var movieObject = response.results[0];
    var queryDetails = movieObject.id;
    var detailsURL = 'https://api.themoviedb.org/3/movie/' + queryDetails + '/recommendations?api_key=' + APIkey +'&language=en-US&page=1';
    // var detailsURL = 'https://api.themoviedb.org/3/movie/' + queryDetails + '?api_key=' + APIkey + '&append_to_response=videos';

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
    var userInput = $('#search').val();

    database.ref('Watch/').push({
        movie: userInput
    });

    if ( $('#search').val() === '') {
        return;
    } else {
    
        var newRow = $('<tr>').attr('class', 'movie-item');
        var newItem = $('<td>').attr({            
            'class': 'movie-item',
            'data-toggle': "modal", 
            'data-target': "#movieModal",
            'data-name': userInput
        });    

        newItem.text(userInput);                        
        var newButton = $('<button>').text('X').attr('class', 'remove');
        var newLike = $('<button>').text('Recs').attr('class', 'recs');
        $('#search').val('');                            
        newRow.append(newItem, newLike, newButton);       
        $('#movie-medo').prepend(newRow);     
    }
}   

function addMusic() {                       // this function adds a music item to the music medo
    var userInput = $('#search').val();   
    if ( $('#search').val() === '') {
        return;
    } else if (musicArray.includes(userInput)) {        // need to check the database, not the array!
        return;
    } else {  
        database.ref('Listen/').push({
            artist: userInput
        });
        musicArray.push(userInput);            
    }
    console.log(musicArray);
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
    var lastfmKEY = 'd1540ed62dffa25c98967940f03afc6f';
    var lastfmURL = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + musicSelector + '&api_key=' + lastfmKEY + '&format=json';

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
            var bandLoop = $('<h6>').text(similarBands[i].name);
            $('#similar-bands').append(bandLoop);
        }
        var lastfmDetails = 'http://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=' + musicSelector + '&api_key=' + lastfmKEY + '&format=json';
        $.ajax({
            url: lastfmDetails,
            method: 'GET'
        }).then(function(response) {
            $('#band-name').text(bandName);

            var bandPhoto = response.topalbums.album[0].image[3]['#text'];
            $('#band-image').attr({
                'src': bandPhoto,
                'height': '250px',
                'width': '250px'
            })
        })
    });
}

database.ref('Listen/').on('child_added', function(data) {      // retrieves data from Firebase on page load
    var newArtist = data.val().artist;
    var name = data.key;
    var newListItem = $('<li>').attr('class', 'list-group-item hvr-shutter-out-vertical');
    var newBand = $('<span>').attr({                  
        'class': 'music-item col-10',
        'data-toggle': "modal", 
        'data-target': "#musicModal",
        'data-name': newArtist
    });     
    var newRemove = $('<button>').text('X').attr({
        'class': 'remove col-1',
        'data-name': name,
        'data-ref': newArtist
    }); 
    var newLike = $('<button>').text('Like').attr('class', 'like col-1'); 
    newBand.text(newArtist);                                              
    newListItem.append(newBand, newLike, newRemove);
    $('#music-medo').prepend(newListItem);
    $('#search').val('');
})

function removeMusicItem() {
    var key = $(this).attr('data-name');
    var ref = $(this).attr('data-ref');
    $(this).closest('li').detach();
    database.ref('Listen/' + key).remove();
    musicArray.splice(musicArray.indexOf(ref), 1);
}

function removeMovieItem() {
    var key = $(this).attr('data-name');
    $(this).closest('li').detach();
    database.ref('Watch/' + key).remove();
}

// recommended function

function recommendedMedia() {
// make it an event listener that fires when the like button is pressed
// detach the clicked list item and append it - not prepend as it was before - to the list
    var thisItem = $(this).closest('li');
    thisItem.detach();
    $('#music-medo').append(thisItem);
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

}