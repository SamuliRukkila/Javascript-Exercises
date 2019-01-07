
// C)
// Sisältää kaikki tarpeelliset router-tiedot, url-sivujen arvot sekä kaikki
// mahdolliset sivut, joihin voit mennä.
//
// Tiedosto sisältää myös taulukon routes, joka sisältää kaikki mahdolliset sivustot
// johon voit mennä.
//
// @NgModulessa tuodaan aluksi RouterModule forRoot -muodossa, koska halutaan, että
// router-tietää missä url-osoitteessa olemme sillä hetkellä.
// @NgModule myös vie routerin myös root-komponenttiin, jotta sitä voidaan käyttää jokaisessa
// kopmonentissa.



import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Tuodaan HeroesComponent -komponentti, jotta siihen pystytään navigoimaan
import { HeroesComponent } from './heroes/heroes.component';
// Jotta voidaan navigoida dashboardissa, router tarvitsee oikean reitin
import { DashboardComponent } from './dashboard/dashboard.component';
// Jotta voidaan navigoida tiettyyn sankariin
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// Typescript
// Normaali Angularin 'Route' sisältää kaksi arvoa
// 1. path = merkkijon joka vastaa selaimen URL arvoa
// 2. component = minkä komponentin router pitäisi luoda kun sinne navigoidaan
const routes: Routes = [
  // Sivuun tullessa mennään sivun root-leveliin. Tämän avulla päästään alkusivuun
  // Eli kun menet "http://localhost/4200" ANG vie sinut osoitteeseen "http://localhost:4200/dashboard"
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  // ":" tarkoittaa, että se on placeholder -- tässä tilanteessa :id => heron id
  { path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  // Eksporttaamalla RouterModulen voit käyttää sitä root -kohdassa (app-module)
  // kaikile käytettäväksi.
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
