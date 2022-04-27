
# Web Dev Final Project

Group Members

| Josh Zak | Josh-Zak ([https://github.com/Josh-Zak](https://github.com/Josh-Zak "https://github.com/Josh-Zak"))

| Alexander Bianchi | alexBianchi4 ([https://github.com/alexBianchi4](https://github.com/alexBianchi4 "https://github.com/alexBianchi4"))

| Wahbi Raihan | Wahbi-R (https://github.com/Wahbi-R)

| Benjamin Tsoumagas | benjamin-tsoumagas ([https://github.com/benjamin-tsoumagas](https://github.com/benjamin-tsoumagas "https://github.com/benjamin-tsoumagas"))

| Andrew Chai | AndrewChai878 (https://github.com/AndrewChai878)


# Description
Welcome to checkmate games!

Our site allows for user to login and play Chess, Checkers, Tic Tac Toe and Connect Four!

# Site Running Instructions
- Clone the repo
- Run 'npm i' to install all of the packages
- To run the site run 'npm run serve'

# Backend Running Instructions (to be done after cloning the repo)
- cd to the node_server director
- run 'npm i' to install all of the packages
- run 'nodemon' to run the backend node js server
- you may need to run 'npm install nodemon' before running the server

# Site Elements
SVG and HTML
-   Pages are structured using HTML within views
-   SVG files are used for various graphics throughout the site

CSS and CSS frameworks
-   SCSS is used within vue to style our views
-   Bootstrap is used for our navbar

JavaScript, jQuery, D3
-   Ours games are created entirely in javascript

DHTML
-   We use vue and javascript to make our html based views dynamically interact with users allowing them to play games.

AJAX, web services
-   The vue frontend accesses firebase for user authentication
-   Uses axios to get a quote from the Node.js server

Node.js
-   Serves a quote to be displayed on the front end

Views and/or client-side framework
-   We use Vue as the framework for our site

Database
-   We implemented firebase authentication and firestore as our database and independent study portion of the project

# Independent Study
For our independent study portion, we used firebase. Firebase is an API created by google that contains many features. 
In our case we use its features for these purposes:

Authentication
-   Firebase Authentication combined with Firebase Realtime Database is used to let users create accounts and login.
    It stores passwords in a way makes it so that each users password is stored safely and cannot be accessed by anyone (including us).

Information
-   Firebase Realtime Database alongside Firebase Storage allows us to store information about the user such as their display name.
    This lets users do things like change and set their profile picture by uploading it personally or changing their display name on the website.   

Hosting
-   Firebase Hosting keeps the website running 24/7 without having to run it ourselves with npm run serve. The website is currently hosted at
    https://webdevfinal-e9585.web.app/
    (the node.js server still has to be run manually)
