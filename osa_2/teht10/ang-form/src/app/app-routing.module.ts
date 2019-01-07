// Routing moduuli, sisältää kaikki mahdolliset sivut (komponentit), joihin voit
// navigoitua.

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

// Komponentit pitää tuoda moduulin, jotta ne voidaan lisätä URL-reitteihin.
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';

// Taulukko, joka sisältää kaikki (SPA)sivut
const routes: Routes = [
  // Tähän navigoidaan automaattisesti, kun tullaan pääsivulle.
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  // AuthGuardin suojaama sivu. AuthGuardin pitää palauttaa true, jotta sivulle
  // voidaan päästä.
  { path: 'add', component: AddComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  // Routingia voidaan käyttää missä vaan (aka. root-levelillä)
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
