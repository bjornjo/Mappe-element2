const router = require('express').Router();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

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


router.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
router.get('/albums', (req, res) => {
    // has a valid token?
    var token = req.header('x-token');
    const valid = token === 'A TOKEN LOL so secret';

    console.log('token was', token);

    if (valid) {
        res.send(albums)
    } else {
        res.send(albums.slice(0, 10));
    }
});

router.get('/login', (req, res) => res.send('HIT HERE'));

router.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // is username & password valid?
    const valid = username === 'blah' && password === 'bleh';
    if (valid) {
        return res.send('A TOKEN LOL so secret');
    } else {
        return res.status(401).send('wrong username or password');
    }
});

module.exports = router;