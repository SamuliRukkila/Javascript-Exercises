/***
 * Mocha -testikirjastolla ja chai-väitekirjastolla
 * toteutettu testikoodi joka määrittelee kuinka dicemodulen
 * tulee toimia. Testit eivät ole täysin kattavia vaan antavat
 * suuntaviivat toteutukselle.
***/
// requirella haku vaatii dicemodule.js:n lopussa exporttauksen: module.exports = dicemodule;
const dicemodule = require('../dicemodule.js');
const expect = require('chai').expect; // expect-väitekirjasto eli assert-kirjasto

describe('Testing dicemodule', () => {

    it('dicemodule should be an object', () => {

        expect(dicemodule).to.be.an('Object');
    });
    /* rollDice funktion testaus vaatii että se palautetaan muiden funktioiden tavoin.
        Nimi palautettavan olion alussa riittää: rollDice, Testauksen jälkeen voi
        muuttaa takaisin privaatiksi */
    it('rollDice should return an array which has ten members', () => {

        const result = dicemodule.rollDice(10);

        expect(result).to.be.an('array');
        expect(result).to.have.lengthOf(10);
    });

    it('returnNumbers should return a string', () => {

        const result = dicemodule.returnNums();

        expect(result).to.be.a('string');
    });

    it('max should return a number between 1 and 6', () => {

        const result = dicemodule.max();

        expect(result).to.be.within(1, 6);
    });

    it('min should return a number between 1 and 6', () => {

        const result = dicemodule.min();

        expect(result).to.be.within(1, 6);
    });

    it('max should not be smaller than min', () => {

        const result1 = dicemodule.max();
        const result2 = dicemodule.min();

        expect(result1).not.to.be.below(result2);
    });

    it('calcAvg should return a number between 1 and 6', () => {

        const result = dicemodule.calcAvg();

        expect(result).to.be.within(1, 6);
    });

});
