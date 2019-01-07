import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Service
import { RegService } from '../reg.service';
// Luokka, joka sisältää tyyppimuodon
import { Registration } from '../registration';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})
export class AddComponent implements OnInit {

  // Taulukko, jota käytetään HTML-templaatissa.
  foods = [ 'Kala', 'Liha', 'Kasvis' ];

  // Tehdään instanssit Register-servicestä sekä Routerista
  constructor (
    private regService: RegService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // Kun Submit-nappulaa painetaan, suoritetaan tämä metodi.
  //
  // Muuttaa Checkboxin boolean-valuen stringiksi.
  //
  // Käytetään hyväksi serviceä, jonka metodin avulla postataan uudet tiedot
  // JSON-muodossa. Tämän jälkeen käyttäjä viedään takaisin pääsivulle.
  onSubmit(formData: Registration): void {

    formData.sauna = formData.sauna ? 'joo' : 'ei';
    console.log(`Uusi rekisteröinti: ${formData}`);

    this.regService.postNewReg({
      'name': formData.name,
      'email': formData.email,
      'food': formData.food,
      'sauna': formData.sauna
    });
    this.router.navigate(['/']);
  }

}
