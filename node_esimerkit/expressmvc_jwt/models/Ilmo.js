//Ilmo.js sisältää Ilmo-olion joka kuvaa ilmoituksen tietomallia
//olio sisältää metodit joissa SQL-kyselyt tietokantaan.

var db = require('../dbconnection'); //yhteys kantaan

/*
CREATE TABLE IF NOT EXISTS `ilmot` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'laskuri',
  `nimi` varchar(50) DEFAULT NULL COMMENT 'nimi',
  `email` varchar(50) DEFAULT NULL COMMENT 'email',
  `ruoka` varchar(10) DEFAULT NULL COMMENT 'ruokavalinta',
  `sauna` varchar(5) DEFAULT NULL COMMENT 'saunailta',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

INSERT INTO `ilmot` (`id`, `nimi`, `email`, `ruoka`, `sauna`) VALUES
(1, 'Ilmo Ilmonen', 'ilmo@jamk.fi', 'Kala', 'joo'),
(2, 'Ossi Osallistujainen', 'ossi@osallistu.com', 'Liha', 'joo');
*/

var Ilmo = {
    //ensin suoritetaan SQL-kysely, sen jälkeen saadaan callback josta saadaan vastaus, callback on routerissa.
    //esivalmistelluissa kyselyissä ?-merkin tilalle tulee annettu parametri
    getAllIlmos: function(callback) {
        return db.query("Select * from ilmot", callback);
    },
    getIlmoById: function(id, callback) {
        return db.query("Select * from ilmot where Id=?", [id], callback);
    },
    addIlmo: function(Ilmo, callback) {
        //vaikka id on auto increment, se pitää laittaa tänne. Lomakkeelta ei kuitenkaan tarvitse lähettää sen arvoa
        return db.query("Insert into ilmot values(?,?,?,?,?)", [Ilmo.id, Ilmo.nimi, Ilmo.email, Ilmo.ruoka, Ilmo.sauna], callback);
    }
    //voitaisiin tehdä vielä delete- ja update -metodit
};
module.exports = Ilmo;
