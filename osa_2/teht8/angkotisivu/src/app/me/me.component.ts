import { Component, OnInit } from '@angular/core';
// Tuodaan taulukko mock-dataa tiedostosta..
import { myDataArray } from '../mock-data';
import { MyData } from '../dataclasses';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  // ..joka alustetaan uuteen muuttujaan (tätä käytetään html-templatessa)
  myData: MyData[] = myDataArray;

  constructor() { }

  ngOnInit() {
  }

}
