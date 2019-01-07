'use strict';

// Sisältää yhteyden MongoDB-localhost -tietokantaan (StudentDB)
require('../dbconnection');
// Student -model + virheenkäsittely -moduuli
const Student = require('../models/Student');
const helper = require('../helper');

// Muokataan tietyn opiskelijan, tietyn opintojakson arvosanaa.
Student.findOneAndUpdate(
  { student_code: 'l4924', 'grades.course_code': 'HTS10600' },
    { $set: { 'grades.$.grade': 2 }}, err => {
      if (err) helper.handle(err);
      console.log('Updated grade.');
      helper.exit();
});
