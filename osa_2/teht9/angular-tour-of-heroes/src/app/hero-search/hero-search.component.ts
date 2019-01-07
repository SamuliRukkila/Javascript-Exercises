// Tiedosto sisältää kaksi metodia, jotka ovat tarkoitettu hakuun. Search() -
// metodi toimii HeroServicen kanssa yhteistyössä, joka sisältää funktion hakemalle
// herolle. Joka kerta kun uusi kirjain tuodaan haku-boxiin, suoritetaan ngOnInit-
// metodin sisällä olevat koodit. Metodi tarkastaa 300ms välein hakusanaa, ja jos
// se valinnaisesti vastaa jotain sanaa, näytetään se käyttäjälle.

import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  // Typescript
  heroes$: Observable<Hero[]>;
  // Typescript
  private searchTerms = new Subject<string>();
  // Typescript
  constructor(private heroService: HeroService) {}
  // Typescript
  search(term: string): void {
    this.searchTerms.next(term);
  }

  // Typescript
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // odota 300ms jokaisen näppäimenlyönnin jälkeen
      debounceTime(300),
      // ignoraa uusi termi jos sama termi kuin aikaisemmin
      distinctUntilChanged(),
      // vaihda uuteen Observable joka kerta kun haku vaihtuu
      // Typescript
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

}
