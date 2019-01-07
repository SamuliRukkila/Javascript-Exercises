// Express-sovelluskehyksen "sydän"

// View-sivustoja tmv ei tarvi koska sovelluksessa ei ole frontendiä

const express = require('express');
const bodyParser = require('body-parser');

// Yhteys MongoDB:n
require('./dbconn');

let port = process.env.PORT || 3020;

// Tehdään Express-kirjastosta paikallinen muuttuja
const app = express();

// Parsi pyynnöt joiden content-type on: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Parsi pyynnöt joiden content-type on: JSON(application/json)
app.use(bodyParser.json())

// Perus route. Jos menet URL:n juureen
app.get('/', (req, res) => {
    res.json('Welcome to teht 22. This is only for backend. Nothing to see here.');
});

// Tuodaan Student-routet
require('./routes/routes.js')(app);

// Kuunnellaan pyyntöjä portista 3000
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
