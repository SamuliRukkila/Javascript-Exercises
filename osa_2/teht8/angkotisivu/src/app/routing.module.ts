import { NgModule } from '@angular/core';
// Sis. tarvittavat kirjastot routerin mahdollistamiseen
import { RouterModule, Routes } from '@angular/router';

// Kaikki komponentit joihin halutaan linkkautua täytyy tuoda moduuliin
import { MeComponent } from './me/me.component';
import { StudiesComponent } from './studies/studies.component';
import { HobbiesComponent } from './hobbies/hobbies.component';

// Sisältää kaikki sivut, mitä SPA-sovelluksesta halutaan.
// Tässä tapauksessa kolme sivua; otsikko ja navbar pysyy entisellään.
const routes: Routes = [
  // Ensimmäinen olio määrittää mikä sivu avataan ensimmäiseksi
  { path: '', redirectTo: '/me', pathMatch: 'full' },
  { path: 'me', component: MeComponent },
  { path: 'studies', component: StudiesComponent },
  { path: 'hobbies', component: HobbiesComponent }
];

@NgModule({
  exports: [ RouterModule ],
  // Navigointi halutaan toteuttaa root-levelissä eli sen voi ottaa käyttöön
  // jokaisessa komponentissa.
  imports: [ RouterModule.forRoot(routes)]
})

export class RoutingModule { }
