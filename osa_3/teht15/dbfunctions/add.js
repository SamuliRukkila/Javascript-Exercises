'use strict';

// Sisältää yhteyden MongoDB-localhost -tietokantaan (StudentDB)
require('../dbconnection');

// Student -model + virheenkäsittely -moduuli
const StudentModel = require('../models/Student');
const helper = require('../helper');

// Käyttäjästä tehty olio
const studentObject = require('../NewStudentObject');
// Uusi opiskelija Modelista => valmiina tietokantaan
const Student = new StudentModel(studentObject);


// Tallennetaan uusi opiskelija MongoDB -tietokantaan
Student.save(err => {
  if (err) helper.handle(err);
  console.log('New student saved! Details:');
  console.log(studentObject);
  helper.exit();
});
