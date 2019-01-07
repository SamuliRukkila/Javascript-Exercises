'use strict';

// Sisältää yhteyden MongoDB-localhost -tietokantaan (StudentDB)
require('../dbconnection');
// Student -model + virheenkäsittely -moduuli
const Student = require('../models/Student');
const helper = require('../helper');

// Etsitään kaikki opiskelijat.
Student.find({}, (err, results) => {
  if (err) helper.handle(err);
  console.log('RESULTS: \n' + results);
  helper.exit();
});
