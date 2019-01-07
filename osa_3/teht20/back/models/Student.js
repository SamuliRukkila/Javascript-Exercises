// Tuodaan Mongoose -kirjasto
const mongoose = require('mongoose');
// Mongoose-schema -kirjasto
const Schema = mongoose.Schema;
// Tuodaan Grade-modeeli, koska se on Student-skeeman alidokumentti
const Grade = require('./Grade');

// Estetään Mongoosen Promisen deprecation error!!
mongoose.Promise = global.Promise;

// Student-taulun skeema
const studentSchema = new Schema({
  student_code: { type: String, unique: true, required: true, match: /[a-z]{1}[0-9]{4}/ },
  name: { type: String, required: true, max: 80 },
  email: { type: String, unique: true, required: true, max: 60 },
  study_points: { type: Number, required: false, min: 0, max: 300 },
  grades: { type: [Grade], required: true }
});

// Skeemasta luodaan model, joka exportataan
module.exports =  mongoose.model('Student', studentSchema);
