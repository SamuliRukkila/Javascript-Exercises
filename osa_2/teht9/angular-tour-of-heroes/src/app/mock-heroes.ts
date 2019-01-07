// Tiedosto joka sisältää nimen mukaisesti kasan itsetehtyjä sankareita. Tuodaan
// export-menetelmällä komponenttiin mukaan.

import { Hero } from './hero';

// Typescript -> tehdään taulukosta HEROES taulukko tyypitetysti
export const HEROES: Hero[] = [
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
