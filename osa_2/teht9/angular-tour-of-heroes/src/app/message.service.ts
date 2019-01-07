// Message-service -tiedosto. Sisältää Angularin @Injectable -avainsanan, joka
// toimii root-tasolla (avoin kaikille). Sisältää myös kaksi metodia, toinen
// lisää merkkijonoisia sanoja messages-taulukkoon ja toinen alustaa ko. taulukon
// tyhjäksi.
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  // Typescript
  messages: string[] = [];

  // Typescript
  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
