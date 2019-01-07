// Root -moduuli, tämä on ns. bootstrap-moduuli, eli se avataan ensimmäisenä.

// Tänne tuodaan kaikki moduulit, joita tarvitaan
import { BrowserModule }                  from '@angular/platform-browser';
import { NgModule }                       from '@angular/core';
import { AppRoutingModule }               from './app-routing.module';
import { FormsModule }                    from '@angular/forms';
import { HttpClientModule }               from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }            from './in-memory-data.service';

// Yleensä kaikki komponentit tuodaan myös tänne, jotta niitä voidaan käyttää
// moduulin mukana.
import { AppComponent }    from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent }  from './login/login.component';
import { ListComponent }   from './list/list.component';
import { AddComponent }    from './add/add.component';

// !! Kun servicet on Injectattu root-levelillä, ei niitä tarvi importata root
// !! -moduulissa.

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ListComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // Tämä moduuli tulee HTTP kutsujen väliin ja antaa feikattuja vastauksia
    // serveriltä. Tämä siis poistetaan kun käytetään oikeata serveriä.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  // Määrittää root-komponentin
  bootstrap: [AppComponent]
})
export class AppModule { }
