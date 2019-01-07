
// D)
// Service-komponentti, jonka avulla on helppo siirtää informaatiota komponenttien
// kanssa, jotka eivät tunne toisiaan.
//
// @Injectable -decoratorin sisällä, käytämme kyseistä serviceä root-tasolla, jotta
// muut komponentit, kuten Heroes, voi käyttää sitä hyväkseen. Tämä on hyvä tapa
// myös sen takia, koska jos Angular huomaa ettei serviceä käytetä, se poistetaan
// tilapäisesti pois käytöstä.


// G) HTTP-CLIENT
//
// Angularin sisältää helpon HTTP-API sisällön, joka käyttää hyväkseen XMLHttpRequest-
// rajapintaa. Http-Client avulla voit lähettää ja vastaanottaa erilaisia tietoja ja
// se toimiikin RxJS-kirjaston kanssa hyvin käyttämällä Observables-avainsanaa.
//
// Kyseisessä tiedostossa on käytetty paljon hyväksi Angularin-http mahdollisuuksia.
// Muuttujassa httpOptions on määritelty http-käsityksen ominaisuuksia.
//
//

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Hero } from './hero';
// import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})


export class HeroService {

  // Typescript
  private heroesUrl = 'api/heroes';

  // Typescript
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // Typescript
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


  // Typescript
  //
  // Käsittele HTTP-virhe, anna ohjelman jatkaa toimintaansa samalla.
  // operation - operaation nimi, joka epäonnistui
  // result - valinnainen arvo, joka palautetaan
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // Kirjoita konsoliin virhe
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Typescript
  //
  // F) OBSERVABLE
  // Observablen avulla voit lähettää edestakaisin (esim. viestejä) tietoa
  // pyytäjän ja tuojan välillä. Observables ei suoriteta ennenkuin joku kutsuu
  // sitä "subscribe"-metodilla. Observable voi tuoda kaikenlaista tietoa.
  // Kun Observablea ei tarvita enään, tai kutsutaan "unsubscribe"-metodia, loppuu
  // Observablen toiminnallisuus.
  //
  // OBSERVABLE on yksi RxJS-kirjaston pääluokkia.
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  // Typescript
  //
  // Saa heron ID:n perusteella. 404 jos ei löydy.
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // Typescript
  //
  // Päivitä heroa serverissä (PUT)
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updatehero'))
    );
  }

  // Typescript
  //
  // Lisää uusi Hero (POST)
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((_hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // Typescript
  //
  // Poistaa heron serveriltä (DELETE)
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // Typescript
  //
  // Herot, joiden nimi sisältää hakusanan (GET)
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // jos ei ole hakusana, palauta tyhjä taulu
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes',  []))
    );
  }
}
