// Kyseinen service hoitaa kaiken autentikaatioon tarvittavat välityksen ja
// tiedot. Se hakee in-memory-web-apista oikeat tunnarit, sekä lähettää tietoja
// komponenttejen välillä.

import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// Tiedosto kertoo missä muodossa tunnusdatan pitää tulla
import { Login } from './login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Kertoo onko käyttäjä kirjautunut sisään, tätä tietoa käyttää hyväkseen
  // NavBar -komponentti.
  public loginCondition = new Subject <any>();

  // Url mihin siirrytään, jos kirjautuminen onnistuu.
  public redirectUrl: string;

  // Simppeli muuttuja, joka kertoo onko käyttäjä kirjautunut sisään
  public isLoggedIn = false;

  // Osoite mistä tunnustiedot haetaan. 'loginValues'
  // -tarkoittaa tässä tapauksessa tiedoston sisällä olevaa muuuttujaa,
  // joka sisältää taulukon käyttäjäarvoista.
  public url = 'api/loginValues';

  // Tehdään Angularin HTTP:stä instanssi, jota voidaan käyttää lokaalisti
  // komponentin sisällä.
  constructor (private http: HttpClient) {}

  // Metodi handlaa errorit, kirjoittaa logiin virheviestin, mutta palauttaa
  // Observablen jokatapauksessa.
  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${error} | ${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Servicen sisällä oleva metodi, joka hakee HTTP:n avulla in-memory-data-servicestä
  // arvoja. Tätä metodia kutsuu Login -komponentti. Service toimii siis välikätenä.
  getCredentials(): Observable<Login[]> {
    return this.http.get<Login[]>(this.url)
      .pipe(
        catchError(this.handleError('getCredentials', []))
      );
  }

  // Jos käyttäjä kirjautuu sisään, tätä metodia kutsutaan
  // Kertoo AuthGuardille, että käyttäjä on kirjautunut sisään
  login(): Observable<boolean> {
    return of(true).pipe(
      tap(() => this.isLoggedIn = true)
    );
  }

  // Kun käyttäjä kirjautuu ulos.
  //
  // "Tuhoaa" viimeisimmän kutsun. Eli jos loginstate on ollut "true" observablen
  // takia, tämä palauttaa sen alkumuotoon (tässä tapauksessa true => false).
  logOut(): void {
    this.loginCondition.next();
    this.isLoggedIn = false;
  }

  // Osa XrJS:n subject -metodia. Tänne tulevat uudet Observablet, joita niitä
  // haluavat komponentit käyttävät hyväkseen.
  sendLoginCond(cond: boolean) {
    this.loginCondition.next({ text: cond });
  }


  // Tämä metodi palauttaa Subject -olion observablen sitä haluaville
  // komponenteille.
  returnLoginCond(): Observable<boolean> {
    return this.loginCondition.asObservable();
  }

}
