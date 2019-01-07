// Komponentti , joka "tulostaa" tiedot sankareista. Komponentti lähettää tietoa
// root-komponentille, joka tulostaa tiedon sivulla. Kyseinen komponentti toimii
// siis omana entiteettinään, joten sitä voisi myös käyttää muuualla. 3 metodia
// keskustelevat HeroService -luokan kanssa.

import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  // TYPESCRIPT
  heroes: Hero[];

  // TYPESCRIPT
  constructor(private heroService: HeroService) {}

  // Kun komponentti luodaan, suoritetaan tämä kohta.
  ngOnInit() {
    this.getHeroes();
  }

  // TYPESCRIPT
  //
  // Vastaanotetaan heroet.
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  // Typescript
  //
  // Lisätään uusi sankarin nimi sankarit-taulukkoon, jos nimi on välilyönti-
  // poistojen jälkeen tyhjä, lopetetaan ajo. Jos onnistuttu, pusketaan uusi hero
  // taulukkoon.
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  // Typescript
  //
  // Poistetaan valittu hero.
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
