'use strict';

// Sisältää yhteyden MongoDB-localhost -tietokantaan (StudentDB)
require('../dbconnection');
// Student -model + virheenkäsittely -moduuli
const Student = require('../models/Student');
const helper = require('../helper');

// Poistetaan opiskelija, jonka opiskelijatunnus on L4924
Student.findOneAndRemove({ student_code: 'l4924' }, err => {
  if (err) helper.handle(err);
  console.log('Student succesfully deleted!');
  helper.exit();
});
