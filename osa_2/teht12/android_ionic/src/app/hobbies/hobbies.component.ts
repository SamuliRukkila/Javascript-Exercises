import { Component, OnInit } from '@angular/core';

import { Hobby } from '../dataclasses';
import { hobbyArray } from '../mock-data';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.scss']
})
export class HobbiesComponent implements OnInit {

  hobbies: Hobby[] = hobbyArray;

  constructor() { }

  ngOnInit() {
  }

}
