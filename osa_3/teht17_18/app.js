// Express-sovelluskehyksen "sydän"

// View-sivustoja tmv ei tarvi koska sovelluksessa ei ole frontendiä

const express = require('express');
const bodyParser = require('body-parser');

// Yhteys MongoDB:n
require('./dbconn');

// Tehdään Express-kirjastosta paikallinen muuttuja
const app = express();

// Parsi pyynnöt joiden content-type on: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Parsi pyynnöt joiden content-type on: JSON(application/json)
app.use(bodyParser.json())

// Perus route. Jos menet URL:n juureen
app.get('/', (req, res) => {
    res.json("Welcome to exercise 17 - protected REST-API");
});

// Tuodaan Student-routet (ja users)
require('./routes/routes.js')(app);

// Kuunnellaan pyyntöjä portista 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
