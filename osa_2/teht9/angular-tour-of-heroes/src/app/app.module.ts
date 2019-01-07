// Angularin root-moduuli. Kertoo Angularille miten "koota" ohjelma. Kertoo mitä
// kirjastoja tuodaan mukaan ohjelmaan, sekä tuo komponentteja muualta.
// "bootstrap: [AppComponent] kertoo, että komponentti "app-component" on moduulin
// root komponentti.

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // Tämä moduuli sieppaa HTTP pyyntöjä and palauttaa simuloituja servereiden
    // vastauksia. Poista kun oikea serveri käytössä.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  // Todentaa root-komponentin
  bootstrap: [AppComponent]
})
export class AppModule { }
