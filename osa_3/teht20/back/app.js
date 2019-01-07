const express = require('express');
const bodyParser = require('body-parser');

// Cors mahdollistaa datan kulun eri osoitteista sijaitsevien sovellusten kesken.
const cors = require('cors');

// Yhteys MongoDB:n
require('./dbconn');

// Tehdään Express-kirjastosta paikallinen muuttuja
const app = express();

// Cors käyttöön / Cross-domain
app.use(cors())

// Parsi pyynnöt joiden content-type on: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Parsi pyynnöt joiden content-type on: JSON(application/json)
app.use(bodyParser.json())

// Perus route. Jos menet URL:n juureen
app.get('/', (req, res) => {
    res.json({"message": "Welcome to exercise 20 -- MEAN stack server-side"});
});

// Tuodaan Student-routet
require('./routes/routes.js')(app);

// Kuunnellaan pyyntöjä portista 3000
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
