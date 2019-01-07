// Heroes-detail -komponentin logiikkatiedosto. Toimii Heroes-komponentin kanssa
// yhteystyössä. Näyttää yksityiskohtia Heroista. Metodit toimivat yhteystoiminnassa
// myös heroService -tiedoston kanssa.

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  // TYPESCRIPT
  //
  // @Input -avainsana toimii Heroes-komponentin kanssa. @Input-kuuntelee.
  @Input() hero: Hero;

  // Typescript
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  // Typescript
  // Komponentin luotua kutsuu heti getHero() -metodia
  ngOnInit(): void {
    this.getHero();
  }

  // Typescript
  //
  // Kutsuu heroservice.ts -metodia updateHero, johon se vie valitun heron.
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  // Typescript
  // Kutsuu heroservice.ts -metodia, id-parametrilla.
  getHero(): void {
    // "+" kääntää tekstin alempana numeroksi koska id = numero => 11, 12, 13 jne.
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  // Typescript
  // Yksinkertaisesti menee yhden kohdan taaksepäin.
  goBack(): void {
    this.location.back();
  }
}
