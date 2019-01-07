'use scrict';

// Eksporttaa ES6-luokan. Sisältää 2 metodia.
// Arpoo satunnaisluvun ja laskee lukujen keskiarvon.

// Tällä kertaa exportataan olio luokan sijaan.

class Modb {

  constructor(num1, num2, arr) {
    this.num1 = num1;
    this.num2 = num2;
    this.arr = arr;
  }

  randomNumber () {
    if (typeof (this.num1) === 'number' &&
        typeof (this.num2) === 'number' && this.num1 < this.num2) {
          return Math.floor(this.num1 + Math.random() *
            ((this.num2 - this.num1) + 1));
    } else {
        return null;
    }
  }

  calcAverage () {
    return this.arr.reduce((total, score) => total + score) / this.arr.length;
  }
}

module.exports = new Modb(100, 200, [1, 2, 3, 4, 5, 6]);
