// Yhteydenotto MongoDB:n tietokantaan StudentDB
const mongoose = require('mongoose');

// Ympäristömuuttujaan tallennettu osoite
const url = process.env.MONGOLAB_URI;

// Muuttuja-yhteys
const connection = mongoose.connect (
  url, { useMongoClient: true }, err => {
    if (err) console.log(err);
      else { 
        console.log('Connected to database!');
    }
});

// Exportataan se
module.exports = connection;
