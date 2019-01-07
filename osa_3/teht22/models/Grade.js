// Tuodaan Mongoose-kirjasto
const mongoose = require('mongoose');
// Mongoose-schema -kirjasto
const Schema = mongoose.Schema;

// Grade-skeema tulee Student-skeeman sisälle => Student:in alidokumentti
// Tästä ei tehdä moduulia, koska moduuli tehdään Student-skeemassa
const Grade = new Schema({
  course_code: { type: String, required: true, max: 50 },
  grade: { type: Number, required: false, min: 0, max: 5 }
});

// Exportataan Grade-skeema
module.exports = Grade;
