'use strict';

// Sisältää yhteyden MongoDB-localhost -tietokantaan (StudentDB)
require('../dbconnection');
// Student -model + virheenkäsittely -moduuli
const Student = require('../models/Student');
const helper = require('../helper');

// Etsitään ne oppilaat, joiden opintopistemäärä on alle 100:n.
Student.find({}).where('study_points').lt(100).exec((err, students) => {
  if (err) helper.handle(err);
  students.length ? console.log('RESULTS: \n' + students) :
    console.log('No students found.')
  helper.exit();
});
