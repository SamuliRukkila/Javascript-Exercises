import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { Login } from '../login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  // Tähän muuttujaan tuodaan feikkiserveriltä tulevat tunnarit
  public loginValues: Login[];

  // Kaksi privaattimuuttujaa, joita käytetään kertomaan userille asianomainen
  // viesti templaatissa.
  public loginFailed: string;
  public loginSuccess: string;

  // Instanssit AuthServicestä sekä Angularin Routerista
  constructor (
    private authService: AuthService,
    private router: Router
  ) { }

  // Kun komponentti luodaan -> suoritetaan tämä metodi
  ngOnInit() {
    this.getLoginValues();
  }

  // Funktio hakee LoginService -tiedoston metodin 'getCredentials()', joka
  // palauttaa feikkiserveriltä tunnukset ja laittaa ne paikalliseen muuttujaan
  getLoginValues(): void {
    this.authService.getCredentials()
      .subscribe(values => this.loginValues = values);
  }

  // Tämä metodi käy läpi kun käyttäjä painaa 'Kirjaudu sisään' -nappia.
  onSubmit(f): void {
    for (let v of this.loginValues) {
      if (v.username === f.username && v.password === f.password) {
        this.authService.login().subscribe(() => {
          // Kirjautumisviesti käyttäjälle onnistumisesta
          this.loginSuccess = 'Oikeat tunnarit. Kirjaudutaan sisään..';
          // Jos vanhaa navigoitusmispaikkaa ei ole olemassa, navigoidaan
          // valmiiksi valitulle URL:lle
          let navigateTo = this.authService.redirectUrl ?
            this.authService.redirectUrl : '/';
          // Feikataan aika, jotta kirjautuminen näyttää autenttiselta
          setTimeout(() => {
            this.router.navigate([navigateTo]);
            // Lähetetään Servicelle tieto, että kirjautuminen on onnistunut.
            // Näin muut komponentit saavat tiedon siitä.
            this.authService.sendLoginCond(true);
          }, 1800);
          // Lopetetaan metodin suorittamnen
          return;
        });
      }
    }
    // Jos mikään tunnareista ei vastaa oikeita tunnareita annetaan virheviesti
    this.loginFailed = 'Väärä tunnus tai salasana.';
  }

}
