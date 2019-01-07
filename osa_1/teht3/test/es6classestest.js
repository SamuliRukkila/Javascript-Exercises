
// Luokat ja oliot pitää exportata es6class.js-tiedostosta jotta ne voi hakea tähän
const { Henkilo, Opiskelija, henkiloOlio, opiskelijaOlio } = require('../es6classes.js');
const expect = require('chai').expect; // expect-väitekirjasto eli assert-kirjasto

describe('Testing Henkilo -class', () => {
    // JS-luokka on oikeasti konstruktorifunktio
    it('Henkilo should be a class (or constructor -function)', () => {

        expect(Henkilo).to.be.a('Function');
    });


    it('get Etunimi should return a string', () => {

        const result = henkiloOlio.Etunimi;

        expect(result).to.be.a('string');
    });

    it('set Hetu should remain original if hetu is wrong', () => {

        henkiloOlio.Hetu = 'huuhaa'; //setting Hetu

        expect(henkiloOlio.Hetu).to.equal('123456-123A');
    });

    it('set Hetu should change hetu if hetu is right', () => {

        henkiloOlio.Hetu = '123456-098X'; //setting Hetu

        expect(henkiloOlio.Hetu).to.equal('123456-098X');
    });


});

describe('Testing Opiskelija -class', () => {

    // JS-luokka on oikeasti konstruktorifunktio
    it('Opiskelija should be a class (or constructor -function)', () => {

        expect(Opiskelija).to.be.a('Function');
    });



});
