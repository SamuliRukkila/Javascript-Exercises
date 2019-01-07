'use strict';

// Sisältää yhteyden MongoDB-localhost -tietokantaan (StudentDB)
require('../dbconnection');
// Student -model + virheenkäsittely -moduuli
const Student = require('../models/Student');
const helper = require('../helper');

// Päivitetään oppilaan opintopistemäärää (opiskelijatunnus L4924)
Student.findOneAndUpdate({ student_code: 'l4924'}, { study_points: 80 }, err => {
  if (err) helper.handle(err);
  console.log('Student\'s study points has been updated!');
  helper.exit();
});
