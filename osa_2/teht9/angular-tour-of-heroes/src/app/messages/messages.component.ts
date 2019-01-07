// Messages-tiedoston toiminnallisuus. Kyseinen tiedosto toimiii messages.service -
// tiedoston kanssa. Kyseinen tiedosto ei tää paljoa itekseen, vaan toimii enemmänkin
// "välikätenä" oman HTML-tiedoston ja message-servicen kanssa.

import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // Typescript
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
