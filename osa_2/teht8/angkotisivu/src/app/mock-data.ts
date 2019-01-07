// Tuodaan säännöstöt toisesta luokasta taulukoille
import { MyData, Study, Hobby } from './dataclasses';

// Mock-dataa, jota käytetään komponenteissa

const myDataArray: MyData[] = [
  { id: 1, text: '22 vuotias mies, joka on muuttanut Kouvolasta.'},
  { id: 2, text: 'Asunut 1.5 vuotta Kortepohjassa.'},
  { id: 3, text: 'Lempiruokana kaikki käy.'},
  { id: 4, text: 'Käy kotona Kouvolassa 3 viikon välein.'}
];

const studyArray: Study[] = [
  { id: 1, text: 'Tietojenkäsittelytradenomi, joka opiskelee JAMKissa.'},
  { id: 2, text: 'Opiskellut vähän yli vuoden nyt.'},
  { id: 3, text: 'Opiskelee Javascriptiä pääsääntöisesti tällä hetkellä.'},
  { id: 4, text: 'Aikoo valmistautua vuonna 2020.'}
];

const hobbyArray: Hobby[] = [
  { id: 1, text: 'Ei ole virallisia harrastuksia.'},
  { id: 2, text: 'Käynyt ennen juoksemassa aktiivisesti, mutta nyt pitää taukoa.'},
  { id: 3, text: 'Juokseminen ollut pääharrastus monia vuosia nyt.'},
  { id: 4, text: 'Harrasti ennen kamppailulajia, Taidoa, 6 vuotta.'}
];

export { myDataArray, studyArray, hobbyArray };
