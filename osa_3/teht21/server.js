// Http-kirjasto
const http = require('http');
// Tiedostonavaus-kirjasto
const fs = require('fs');
// Arpoo satunnaisia nimiä pelaajille
const moniker = require('moniker');
// Voittonumero
let wanted_number = Math.floor(Math.random() * 101);
console.log('Oikea numero on ' + wanted_number);
// Kaikki aktiiviset pelaajat
let users = [];

// Luodaan app-muuttujaan server-yhteys. Luetaan samalla tiedosto "index.html".
// Kuunnellaan samalla porttia 3005.
const app = http.createServer((req, res) => {
  fs.readFile('index.html', (err, data) => {
    if (err) throw (err);
    res.writeHead(200);
    res.end(data);
  });
}).listen(3004);
console.log('HTTP Socket.io is listening in port 3004.');

// Luodaan Noden Socket IO:sta paikallinen muuttuja ja kuunnellaa app-muuttujaa
const io = require('socket.io').listen(app);

// Kun uusi käyttäjä saapuu paikalla, tehdään siitä uusi käyttäjä toisen metodin
// avulla.
io.sockets.on('connection', socket => {
  let user = addUser();
  console.log('USER CONNECTED: ' + user.name);

  // Kun käyttäjä lähtee pelistä pois poistetaan se käyttäjä-taulukosta
  socket.on('disconnect', () => {
    console.log('USER DISCONNECTED: ' + user.name);
    removeUser(user);
  });

  // Joka kerta kun käyttäjä arvaa uuden numeron, annetaan sen mukainen palaute
  // etusivulle. Käyttäjän antama numero tarkistetaan. Jos käyttäjä arpoo
  // oikean numeron tulostetaan oikein-viesti sekä arvotaan uusi numero
  // väliltä 0-100.
  socket.on('send_guess', number => {
    user.guesses++;
    updateUsers();
    number = checkNumber(number);
    if (number == wanted_number) {
      wanted_number = Math.floor(Math.random() * 101);
      console.log('Uusi numero on ' + wanted_number);
      updateResults(`<hr>${user.name}:${number}| <b>Oikein vastattu!</b>`);
        updateResults(`<hr><b>${user.name} VOITTI PELIN!</b>
          <i>Arvotaan uusi peli..</i>`);
    } else if (number > wanted_number){
        updateResults(`${user.name}: ${number} | Liian suuri numero`);
    } else {
        updateResults(`${user.name}: ${number} | Liian pieni numero`);
    }
  });
});

// Käyttäjän antaman valinnan palaute lähetetään takaisin etusivulle
const updateResults = fb => {
  io.sockets.emit('feedback', fb);
}

// Tarkastaa käyttäjän antaman numeron =>
//  Jos nro > 100 => muutetaan 100:ksi
//  Jos nro < 0 => muutetaan 0:ksi
const checkNumber = number => {
  number = number > 100 ? 100 : number;
  number = number < 0 ? 0 : number;
  return number;
}

// Lisää uuden käyttäjän käyttäjä-taulukoon. Moniker-kirjasto arpoo uuden nimen.
// Samalla kutsutaan päivitysfunktiota päivittämään käyttäjille näkyvän listan.
const addUser = () => {
  let user = {
    name: moniker.choose(),
    guesses: 0
  }
  users.push(user);
  updateUsers();
  return user;
}

// Poistaa käyttäjän kun hän lähtee ulos pelistä. Samalla kutsutaan päivitys-
// funkiota, jotta muutos näkyy käyttäjille.
const removeUser = user => {
  for (let i = 0; i < users.length; i++) {
    if (user.name === users[i].name) {
      users.splice(i, 1);
      updateUsers();
      return;
    }
  }
}

// Päivitysfunktio, joka päivittää sekä näyttää aktiivisesti käyttäjille
// ketkä ovat pelissä.
const updateUsers = () => {
  let str = '';
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    str += user.name + ' | Guesses: ' + user.guesses + ' <br>';
  }
  io.sockets.emit('users', str);
}
