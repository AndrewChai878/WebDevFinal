
let express = require('express');
let quotes = require('./quotes.json');
const { get } = require('express/lib/response');
let app =express();


app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.get("/",function(request, response){
    response.send("<html> <title> Welcome</title> <body>This is the Node JS backend for Checkmate Games </body></html>");
});

app.get("/quote",function(request, response){
    //get 
    let quote_index = Math.floor(Math.random() * (quotes.quotes.length-1));
    console.log(quotes.quotes[quote_index].quote);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.json({"author": quotes.quotes[quote_index].author, 
                    "quote": quotes.quotes[quote_index].quote});
});

app.set('port',process.env.PORT ||4500);
app.listen(app.get('port'),function(){
    console.log(`Nodejs Server is up and listing to port ${app.get('port')}`);
});