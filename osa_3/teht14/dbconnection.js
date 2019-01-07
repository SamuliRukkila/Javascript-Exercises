'use scrict';

// Sisältää yhteydenoton MySQL-tietokantaan

// Luodaan moduulista MySQL paikallinen muuttuja
const mysql = require('mysql');

// Luodaan muuttuja, joka sisältää yhteyden MySQL-tietokantaan
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'nodesk'
});

// Tehdään muuttujasta moduuli, mitä muut tiedostot voivat käyttää.
module.exports = con;
