import { Component, OnInit } from '@angular/core';
import { studyArray } from '../mock-data';

import { Study } from '../dataclasses';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss']
})
export class StudiesComponent implements OnInit {

  // Paikallinen muuttuja, joka sisältää taulukon mock-datasta, Study[]-tyyppinen
  studies: Study[] = studyArray;

  ngOnInit() { }
}
