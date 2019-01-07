// Make JS strict
'use strict';

/* Class representing Henkilo. */
class Henkilo {

    /**
     * Create an object.
     *
     * @param {string} etunimi - forename of Henkilo
     * @param {string} sukunimi - surname of Henkilo
     * @param {string} hetu - social security number of Henkilo
     */
    constructor(etunimi, sukunimi, hetu) {
        if (this.validateHetu(hetu)) {
            this._Etunimi = etunimi;
            this._Sukunimi = sukunimi;
            this._Hetu = hetu;
        } else {
            console.log('Väärä hetu.');
        }
    }

    /**
     * Get the forename's value
     * @return {string} Etunimi
     */
    get Etunimi() {
        return this._Etunimi;
    }
    /**
     * Get the surname's value
     * @return {string} Sukunimi
     */
    get Sukunimi() {
        return this._Sukunimi;
    }
    /**
     * Get the social security number value
     * @return {string} Hetu
     */
    get Hetu() {
        return this._Hetu;
    }

    /**
     * Set new value for Etunimi
     * @param {string} etunimi - new value
     */
    set Etunimi (etunimi) {
        this._Etunimi = etunimi;
    }
    /**
     * Set new value for Sukunimi
     * @param {string} sukunimi - new value
     */
    set Sukunimi (sukunimi) {
        this._Sukunimi = sukunimi;
    }
    /**
     * Set new value for Hetu if it's valid
     *
     * @param {string} hetu - new value
     *
     */
    set Hetu (hetu) {
        if (this.validateHetu(hetu)) {
            this._Hetu = hetu;
        } else {
            console.log('Väärä hetu.');
        }
    }

    /**
     * Validates social number and retuns true/false
     *
     * @param  {string} hetu - string to be validated
     * @return {boolean} true / false
     */
    validateHetu (hetu) {
        const expr = /\d{6}[+-A]\d{3}[0-9ABCDEFHJKLMNPRSTUVWXY]/;
        return (expr.test(hetu) ? true : false);
    }

    /**
     * Prints information about the user.
     */
    tulosta() {
        console.log(`${this._Etunimi} ${this._Sukunimi} on ` +
            `henkilö jonka henkilötunnus on ${this._Hetu}.`);
    }
}


/**
 * Class representing Opiskelija. Child class to a class Henkilo.
 * @extends Henkilo
 *
 */
class Opiskelija extends Henkilo {
    /**
     * Create an object.
     *
     * @param {string} etunimi - calls Henkilo-constructor
     * @param {string} sukunimi - calls Henkilo-constructor
     * @param {string} hetu - calls Henkilo-constructor
     * @param {int} op - academic credit
     */
    constructor (etunimi, sukunimi, hetu, op) {
        super(etunimi, sukunimi, hetu);
        this._op = op;
    }

    /**
     * Prints information about the user. Overrides Henkilo-class' function.
     */
    tulosta() {
        console.log(`${this._Etunimi} ${this._Sukunimi} on henkilö jonka ` +
             `henkilötunnus on ${this._Hetu} ja opintopistekertymä ${this._op} kpl.`);
    }
}

// Make object from Henkilo-class and call some of its functions
let henkiloOlio = new Henkilo('Samuli', 'Salainen', '201222-105F');
henkiloOlio.Hetu = 'abcefgasda';
henkiloOlio.Hetu = '123456-123A';
henkiloOlio.tulosta();

// Make object from Opiskelija-class and call some of its functions
let opiskelijaOlio = new Opiskelija('Turu', 'Tuttiruukku', '202020-102F', 25);
opiskelijaOlio.tulosta();


/**
 * Exports both classes and both objects to other files calling them.
 * @type {Object}
 */
module.exports = {
    Henkilo,
    Opiskelija,
    opiskelijaOlio,
    henkiloOlio
}
