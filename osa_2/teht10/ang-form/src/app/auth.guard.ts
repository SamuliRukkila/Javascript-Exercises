// Guard -moduuli, joka suojaa List-komponenttia, ellet ole kirjautunut sisään.
// Keskustelee pääasiassa Router-moduulin sekä Auth -servicen kanssa.

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot, Router} from '@angular/router';

// Tuodaan service mikä keskustelee komponenttejen välillä
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Kaksi privaattimuuttujaa --
  // authService on service joka keskustelee muitten komponenttejen kanssa
  // router on Router-moduuli, jonka avulla käyttäjä voidaan navigoida login
  // -sivustolle.
  constructor (
    private authService: AuthService,
    private router: Router
  ) {}

  // Tämä metodi suoritetaan kun koitetaan päästä 'Add' -sivulle. Palauttaa
  // true/false.
  canActivate (
    _next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
      // Tallennetaan muuttujaan URL-sivu, johon koitettiin päästä
      let url: string = _state.url;
      // Simppelisti katsottuna palautetaan totuusarvo (true/false), jolla
      // kerrotaan, saako käyttäjä päästä näkemään suojattua sivustoa. Sitä ennen
      // (tässä tapauksessa) kuitenkin kutsutaan checkLogin() -metodia.
      return this.checkLogin(url);
  }

  // Tämä katsoo auth.servicen muuttujaa (isLoggedIn). Jos muuttuja on false,
  // viedään käyttäjä kirjautunut sivulle -- muuten käyttäjä voi jatkaa sivulle
  // normaalisti.
  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Tallennetaan URL mihin haluttiin navigoida
    this.authService.redirectUrl = url;

    // Navigoi Login -sivulle
    this.router.navigate(['/login']);
    // Tämä palautuu canActivaten() metodikutsuun eli canActivate() palauttaa
    // loppujen lopuksi falsen -> pääsy kielletty.
    return false;
  }
}
