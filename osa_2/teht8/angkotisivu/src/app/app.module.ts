import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Lisää routing-moduulin joka mahdollistaa sivuissa liikkumisen
import { RoutingModule } from './routing.module';

// Kyseinen kirjasto lisää animaatiomahdollisuudet sovellukseen
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

// KOMPONENTIT

// Root-komponentti
import { AppComponent } from './app.component';
// Komponentti navigointipalkille
import { NavbarComponent } from './navbar/navbar.component';

// SPA -sivustot - sisältävät kuvan ja tarpeetonta informaatiota
import { MeComponent } from './me/me.component';
import { StudiesComponent } from './studies/studies.component';
import { HobbiesComponent } from './hobbies/hobbies.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MeComponent,
    StudiesComponent,
    HobbiesComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
