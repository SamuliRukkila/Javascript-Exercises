'use strict';

// Sisältää yhteydenoton MongoDB:n tietokantaan Studentdbs
const mongoose = require('mongoose');
// Virheenkäsittelymoduuli
const helper = require('./helper');

// Exportataan yhteys (luo samalla tietokannan, jos sitä ei ole olemassa).
module.exports = mongoose.connect (
  'mongodb://localhost/studentdb', { useMongoClient: true }, err => {
    if (err) helper.handle(err);
    console.log('Connected to MongoDB');
});
