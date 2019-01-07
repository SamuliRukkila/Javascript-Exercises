// In-memory-web-api -kirjaston avulla tehty feikattu serveri, missä sijaitsee
// kirjautumistunnukset.
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  // Rajapinta-metodi, joka on pakko suorittaa. Palauttaa tekaistun tietokannan,
  // joka sisältää oikeat tunnarit.
  createDb() {
    const loginValues = [
      { username: 'qwerty', password: 'qwerty' },
      { username: '123', password: '123' },
      { username: 'abc', password: 'abc' }
    ];
    return { loginValues };
  }
}
