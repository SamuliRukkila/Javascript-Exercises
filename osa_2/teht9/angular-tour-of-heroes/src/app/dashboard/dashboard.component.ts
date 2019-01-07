// Dasboard komponentin logiikka. On tyhjä taulukko "heroes". Komponentin luotua
// suoritetaan komento getHeroes()- joka hakee 4 arvokkainta heroa heroes-taulukkoon.
// Ne sijoitetaan templaattiin.

import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  // Typescript
  heroes: Hero[] = [];

  // Typescript
  constructor(private heroService: HeroService) { }

  // Tämä suoritetaan komponentin luontivaiheessa.
  ngOnInit() {
    this.getHeroes();
  }

  // Typescript
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
