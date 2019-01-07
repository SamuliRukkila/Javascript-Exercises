import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  // Muuttuja, joka kertoo onko käyttäjä kirjautunut sisään vai ei -- tieto
  // tulee servicestä (auth.service)
  public logstate: boolean;

  // Tehdään instanssi Servicestä
  constructor ( public authService: AuthService ) {}

  ngOnInit() {
    // xrjs -subject oliolla tuleva jatkuva data, joka kertoo komponentille
    // onko käyttäjä kirjautunut sisään
    //
    // Data otetaan sisään Observablella ts. ei tiedetä koska data tulee
    this.authService.returnLoginCond()
      .subscribe(cond => this.logstate = cond );
  }


  // Kun painetaan uloskirjautumisnappia, suoritetaan tämä metodi.
  // Aluksi laitetaan lokaali muuttuja epätodeksi jonka jälkeen
  // kutsutaan AuthServicen logOut -metodia.
  logOut(): void {
    this.authService.logOut();
  }

}
