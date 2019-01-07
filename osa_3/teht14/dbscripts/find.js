'use scrict';

// Moduulit tietokantakyselyihin sekä virheenkäsittelyyn.
const Dbmethods = require('../Dbmethods');
// Yhteyden lopetus sekä virheenkäsittely
const helper = require('../helper');


// Etsii opiskelijat joiden opintopistemäärä on alle 100.
Dbmethods.find((err, res) => {
  if (err) helper.handle(err);
  // Jos ei löydy yhtäkään opiskelijaa.
  if (res.length < 1) {
    console.log('Could not find any student records.');
  } else {
      console.log(`Found ${res.length} row(s):`);
      console.dir(res);
  }
  helper.exit();
})
