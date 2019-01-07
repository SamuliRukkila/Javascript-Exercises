'use scrict';

// Tuodaan mongoose-moduuli
const mongoose = require('mongoose');

const Helper = {

  // Lopettaa yhtyden
  exit: () => {
    mongoose.disconnect();
    process.exit(1);
  },

  // Hoitelee virheet
  handle: err => {
    console.log(err);
    mongoose.disconnect();
    process.exit(1);
  }
}

module.exports = Helper;
