// Rekisteröinti-service. Tämä service ottaa vastaan uudet rekisteröitymiset,
// sekä hakee vanhat HTML5:n localStoragesta.

import { Injectable } from '@angular/core';

// Konstruktori-muoto
import { Registration } from './registration';

@Injectable({
  providedIn: 'root'
})
export class RegService {

  // Sisältää kaikki rekisteröityneet -- taulukko
  public regs: Registration[];

  // Kun tehdään uusi rekisteröityminen. Työnnetään uusi taulukkoon, jonka
  // jälkeen taulukko viedään localStorageen.
  postNewReg(reg: Registration): void {
    // Jos localStoragessa on 'regs' niminen arvo, laitetaan se arvo lokaalin
    // taulukon sisään. Jos arvoa ei ole vielä olemassa tehdään siitä vain
    // tyhjä taulukko.
    this.regs = localStorage.getItem('regs') ?
      JSON.parse(localStorage.getItem('regs')) : [];

    this.regs.push(reg);
    // Kun viedään tieto LocalStorageen, muutetaan se yhdeksi tekstikappaleeksi,
    // jonka JSON.stringify() mahdollistaa.
    localStorage.setItem('regs', JSON.stringify(this.regs));
  }

  // Palauttaa localStoragesta JSON -taulukon (Registration -muodossa).
  returnRegs(): Registration[] {
    // Palautettu tieto muutetaan JSON.parse() metodin avulla validiksi JSON-
    // dataksi.
    return JSON.parse(localStorage.getItem('regs'));
  }

}
