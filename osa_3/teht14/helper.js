'use scrict';

// Tuodaan yhteys-moduuli
const con = require('./dbconnection');


const Helper = {

  // Lopettaa yhtyden
  exit: () => {
    con.end();
    process.exit(1);
  },
  // Hoitelee virheet
  handle: err => {
    console.log(err);
    con.end();
    process.exit(1);
  }
}

module.exports = Helper;
