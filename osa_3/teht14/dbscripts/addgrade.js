'use scrict';

// Moduulit tietokantakyselyihin sekä virheenkäsittelyyn.
const Dbmethods = require('../Dbmethods');

// Yhteyden lopetus sekä virheenkäsittely
const helper = require('../helper');


// Lisää uuden arvosanan opiskelijalle.
Dbmethods.addGrade('a1234', 'ETO10105', 4, (err, res) => {
  if (err) helper.handle(err);
  console.log('Added new grade and updated student\'s points.');
  helper.exit();
});
