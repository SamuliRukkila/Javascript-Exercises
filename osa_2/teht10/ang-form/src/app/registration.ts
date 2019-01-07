// Kerrotaan miten olio tehdään luokasta
// (uusi ilmoittautuminen Add -komponentin formissa).

export class Registration {
  constructor (
    public name: string,
    public email: string,
    public food: string,
    public sauna: string
  ) {}
}
