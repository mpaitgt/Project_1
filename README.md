

## MEDO: A MEDIA TO DO LIST 
### Alpha Version : 0.1.1

---- 

 ## Table of contents
* [What is Medo](#what-is-medo)
* [Technologies](#technologies)
* [Files Included](#files-included)
* [Functionality](#functionality)
* [Upcomming Changes](#upcomming-changes)
* [Contributors](#contributors)

----

## What is Medo 


Have you ever been at a bar, and been talking about music or movies with a group of people?  Normally, conversations flow around the "Hey, have you seen this movie?!"  or "Did you ever hear of this band"? 

Another dilema we often find ourselves in is our Constant Comfort Media picks.  How many times have you watched the Office now?  7 times?  What about that Motley Crew record?  Probably in the *hundreds* by now...

#### **This is where MEDO comes in.**

A streamlined WEBAPP (mobile coming soon) to create a Media focused to-do list!


Now, when you get those recommendations at a bar, simply add them to your MeDo list! Your entries will provide small tidbits of info and ultimately help you determine if it suites your fancy!  

You can finally hang up the Office in here, just incase somehow you forgot that you've already watched every episode 20 times...

----

## Technologies

* [Bootstrap 4](https://getbootstrap.com/)

    - A framework for building responsive, mobile-first sites.

* [Hover.css](https://ianlunn.github.io/Hover/)

    - A collection of CSS3 powered hover effects to be applied to links, buttons, logos, SVG, featured images and so on. Easily apply to your own elements, modify or just use for inspiration. Available in CSS, Sass, and LESS.

* [Animate.css](https://daneden.github.io/animate.css/)

    - Just add water CSS animations

* [Moment.js](https://momentjs.com/docs/)
    - Parse, validate, manipulate, and display dates and times in JavaScript.

* [Firebase](https://firebase.google.com/docs)

    - Firebase gives you functionality like analytics, databases, messaging and crash reporting so you can move quickly and focus on your users.

* [TMDb](https://www.themoviedb.org/documentation/api?language=en-US)

    - TMDb helps power our Watch (movies, series) list, providing you with the movie poster, release date, a short synopsis, and a trailer/short clip of the movie.

* [Last.fm](https://www.last.fm/api)

    - Last.fm helps power our Listen list, providing you with an image of their top Album, genre list, a short Artist's bio, and similar Artists.  You will be directed to the Artist's Last.fm page for more information and top songs.

----

## Files 

* root
    * index.html
    * README.MD
* assets
    * hover-min.css
    * project-1.css
* js
    * jquery-3.4.1.min.js
    * require.js
    * script.js

----

## Functionality

* Currently, No Installation necessary.  Simply navigate to [the Medo webpage](https://mpaitgt.github.io/Project_1/) to begin using.
* Google Chrome is our recommended web browser, but your preferred browser will work as well.
* User can input an artist/movie's name and add them to their respective list
* A list item will display the following:
    * The tile of the artist/band
    * The amount of time that has passed since the item was first added
    * A like button 
    * A removed button
* Clicking on a list item will pop-up the proper return info
    * Movies
        * Movie Poster
        * Release Date
        * Synopsis
        * Embedded Video Trailer
    * Music
        * Album Art
        * Genres
        * Biography
        * Similar Artists
* User can *LIKE* a list item, which will:
    * Dynamically generate a list of recommended musicians/movies 
    * Add the item to the top-left Favorites dropdown medo list
* Users can *REMOVE* [X] any list item they no longer wish to save

    
----

## Upcomming Changes

* Username Authorization functionality
* Completely Mobile Responsive 
* Ability to curate and save specific lists (ie HORROR MOVIES, MUSIC TO STUDY/RELAX/CHILL)
* Spotify Integration to be able to listen to suggested songs within the MEDO page
* Social sharing to allow Medo users to interact with one another, as well as share their lists with other Social Media Platforms

----

## Contributors

MEDO was inspired by the countless recommended bands and movies we've all forgotten, and all gas we wasted idling in our cars trying to find something to listen to while driving.

Our initial ALPHA version was compiled as a group project with the efforts of the following individuals:

* [@mpaitgt](https://github.com/mpaitgt)
* [@cerpinconsafo](https://github.com/cerpinconsafo)
* [@angeli](https://github.com/angeli)
* [@Mikirtumov](https://github.com/Mikirtumov)
* [@Sromero1015](https://github.com/Sromero1015)

----