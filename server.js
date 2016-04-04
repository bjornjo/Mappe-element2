const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const mongoose = require('mongoose');

const config = require('./webpack.config.js');
const compiler = webpack(config);

const app = express();

//Connect to database
mongoose.connect('mongodb://localhost/database');



var Album = mongoose.model('Album',{
    artist: String,
    title: String,
    year: Number
});

var snoop = new Album({
    artist: "Snoop Dogg",
    title: "Gin and Juice",
    year: 1997
});

snoop.save()
    .then(album => console.log(snoop))
    .catch(err => console.log(err));

var User = mongoose.model('User', {
    username: String,
    password: String
});

var newUser = new User({
    username: "bjorn",
    password: "passord"
});

newUser.save();


//file system
var fs = require('fs');
var readline = require('readline');

var albums = [];

var filename = "albums.txt";
readline.createInterface({
    input: fs.createReadStream(filename)
}).on('line', function(line) {
    var split = line.split(";");
    var album = {
        artist: split[0],
        title: split[1],
        year: split[2]
    };
    albums.push(album);

});


app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/albums', (req, res) => res.send(albums));


app.listen(3000, err => {
    if (err) {
        throw new Error(err);
    }


    console.log('Listening on http://localhost:3000');
});