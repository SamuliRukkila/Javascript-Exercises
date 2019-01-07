// Yhteydenotto MongoDB:n tietokantaan StudentDB
const mongoose = require('mongoose');
// mongodb://localhost/studentdb
const connection = mongoose.connect (
  'mongodb://localhost/studentdb', { useMongoClient: true }, err => {
    if (err) console.log(err);
    console.log('Connected to database!');
});

// Exportataan se
module.exports = connection;
