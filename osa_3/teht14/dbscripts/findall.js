'use scrict';

// Moduulit tietokantakyselyihin sekä virheenkäsittelyyn.
const Dbmethods = require('../Dbmethods');
// Yhteyden lopetus sekä virheenkäsittely
const helper = require('../helper');


// Etsii KAIKKI opiskelijat
Dbmethods.findAll((err, res) => {
  if (err) helper.handle(err);
  console.log(res);
  helper.exit();
});
