import { Component, OnInit } from '@angular/core';

import { RegService } from '../reg.service';
import { Registration } from '../registration';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  // Paikallinen muuttuja, joka sisältää kaikki rekisteröityneet
  public regs: Registration[];

  // Tehdään servicestä paikallinen instanssi
  constructor(private regService: RegService) { }

  // Komponentin luotua haetaan servicestä kaiki rekisteröityneet
  ngOnInit() {
    this.getRegistrations();
  }

  // Metodi hakee rekisteröityneet servicestä käyttäen LocalStoragea
  getRegistrations(): void {
    this.regs = this.regService.returnRegs();
  }

}
