'use strict';

// Sisältää yhteyden MongoDB-localhost -tietokantaan (StudentDB)
require('../dbconnection');

// Student -model + virheenkäsittely -moduuli
const Student = require('../models/Student');
const helper = require('../helper');

// Lisätään uusi JSON-alkio Grades-taulukkoon, joka kuuluu oppilaalle L4924.
Student.findOneAndUpdate({ student_code: 'l4924' }, { $push: { 'grades': {
    'course_code': 'HTA102929',
    'grade': 3
  }}}, err => {
    if (err) helper.handle(err);
    console.log('Added new grade to student!');
    helper.exit();
  }
);
