
// H) IN-MEMORY-WEB-API
//
// In-memory-web-API tekniikka. Jonka avula voidaan stimuloida feikki-serveriä.
// Normaalisti ohjelma lähettää ja vastaanottaa tiedostoja HTTP:n avulla - tällä
// kertaa kuitenkin tietämättä että in-memory-web-api tekee välintulon välissä,
// laittamalla ne väliaikaiseen tallennuspisteseen ja palauttamalla feikattuja
// vastauksia.
//
// In-memory-web-api on hyvä tapa harjoitella HTTP-aiheisia pyyntöjä, koska sinun
// ei tarvitse laittaa serveriä pystyyn sen takia.

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return { heroes };
  }

  // Typescript
  //
  // Ylikirjoittaa genId() metodin varmistaen, että HERO:lla on aina id. Jos
  // hero-taulukko on tyhjä, palauttaa metodi arvon 11.
  // Jos hero-taulukko ei ole tyhjä - palautetaan isoimman heron id + 1
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
