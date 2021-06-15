var express = require("express")
const app = require('express')();
const http = require('http').Server(app);
var PORT = process.env.PORT || 3000;
var path = require("path")

var hbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));         // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' }));   // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs');                           // określenie nazwy silnika szablonów
app.use(express.static('static'))
app.use(express.static('dist'))
var Datastore = require('nedb')
var nick = ""
var wynik

var wyniki = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});

const io = require('socket.io')(http, {
    cors: {
        origin: ['http://localhost:8080'],
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true

    }
});
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/menu.html"))


});
app.get('/game', function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/game.html"))

});
app.get('/wyniki', function (req, res) {

    wyniki.find({}, function (err, docs) {
        console.log("przeslano")
        wynik = { "docsy": docs }
        var context = wynik
        console.log(context)
        res.render('wyniki.hbs', context);

    });

});


var tab = []
var tab1 = []
var czasy = []
io.on('connection', socket => {
    // console.log("Connected:" + socket.id)

    tab.push(socket.id)
    socket.on('disconnect', () => {
        // console.log("DisConnected:" + socket.id)
        for (var i = 0; i < tab.length; i++) {
            if (tab[i] == socket.id) {

                tab.splice(i, 1)

            }
            if (tab1[i] == socket.id) {

                tab1.splice(i, 1)

            }
        }
    })
    if (tab.length == 3) {
        var pom = tab[2]
        tab1.push(pom)
    }
    if (tab.length == 6) {
        var pom1 = tab[5]
        tab1.push(pom1)
    }
    socket.emit('odbierz', tab1)



    socket.on('test', floor => {
        io.emit('sendfloor', floor)
    })
    socket.on('w', w => {
        socket.broadcast.emit('sendw', w)
    })
    socket.on('position', position => {
        socket.broadcast.emit('sendposition', position)
    })
    socket.on('points', pkt => {
        io.emit('sendpoints', pkt)
    })
    socket.on('points1', pkt1 => {
        io.emit('sendpoints1', pkt1)
    })
    socket.on('clock', clock => {
        io.emit('sendclock', clock)
    })
    socket.on('time', (time) => {
        czasy.push(time)
        var pom1

        if (czasy.length > 1) {
            pom1 = czasy[0]
        } else {
            pom1 = czasy[0]
        }
        var doc = {
            czas: pom1,
            gracz: "Winner"
        }
        wyniki.insert(doc, function (err, newDoc) {

        });
        pom1 = ""
        czasy = []

    })



})

http.listen(PORT, function () {
    console.log('listening on *:3000');
});

