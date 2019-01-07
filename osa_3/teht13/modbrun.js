'use scrict';

// B) Moduulin käyttö

const Modb = require('./modb.js')
const modObj = new Modb(290, 300, [1, 2, 3, 4, 5, 6]);

console.log(`Random number between 2 values: ${modObj.randomNumber()}
and average number in array: ${modObj.calcAverage()}`);
