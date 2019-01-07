
// Strict Javascript code for more polished code
'use strict';


/**
 * Module pattern. Contains functions to create rolldices and get information
 * about them.
 *
 * @return {function} - returns whatever the function will return. More information
 *  inside function-blocks.
 *
 * @var {array} numbers - contains all the numbers from rolldices
 *
 */
let dicemodule = (function () {

    // Global variable inside module pattern
    let numbers = [];

    return {

        /**
         * Function which rolls the dice 10 times. Returns ready array with values.
         * @param {int} n - amount of throws
         *
         */
        rollDice: n => {
            numbers = Array(n).fill().map(() => Math.floor(Math.random() * 6 + 1));
            // return numbers;
        },

        /**
         * Function which will join all the numbers inside an array to a single
         * piece of string.
         *
         * @return {string} - contains all the numbers in a single string
         */
        returnNums: () => numbers.join(' '),


        /**
         * Finds the highest number inside an array and returns it.
         * @return {int} - highest number inside an array
         */
        max: () => Math.max(...numbers),


        /**
         * Finds the lowest number inside an array and returns it.
         * @return {int} - lowest number inside an array
         */
        min: () => Math.min(...numbers),


        /**
         * Finds the avarage number inside an array of numbers.
         * Counts all values inside an array to a variable which will then
         * be divided with the amount of values inside an array.
         *
         * @return {int} - avarage number inside an array
         *
         */
        calcAvg: () => numbers.reduce((total, score) => total + score) / numbers.length

    };
}());


dicemodule.rollDice(10);

console.log('Dice results: ' + dicemodule.returnNums());
console.log('Highest number: ' + dicemodule.max());
console.log('Lowest number: ' + dicemodule.min());
console.log('Avarage number: ' + dicemodule.calcAvg());

/* Export module pattern "dicemodule" for other files to be used. */
module.exports = dicemodule;
