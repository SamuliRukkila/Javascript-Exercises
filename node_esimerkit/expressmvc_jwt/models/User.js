/*User -modelissa ovat käyttäjän tietoihin liittyvät kyselyt
*/

var db = require('../dbconnection'); //yhteys kantaan

/*
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'counter',
  `username` varchar(50) DEFAULT NULL COMMENT 'username',
  `password` varchar(50) DEFAULT NULL COMMENT 'password',
  `isadmin` varchar(10) DEFAULT NULL COMMENT 'isadmin',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

INSERT INTO `users` (`id`, `username`, `password`, `isadmin`) VALUES
(1, 'tunnus', 'salasana', 'true');
*/

var User = {
    //ensin suoritetaan SQL-kysely, sen jälkeen saadaan callback josta saadaan vastaus, callback on routerissa.
    //esivalmistelluissa kyselyissä ?-merkin tilalle tulee annettu parametri
    getUserByName: function(username, callback) {
        return db.query("Select * from users where Username=?", [username], callback);
    },
    addUser: function(User, callback) {
        //vaikka id on auto increment, se pitää laittaa tänne. Lomakkeelta ei kuitenkaan tarvitse lähettää sen arvoa
        return db.query("Insert into users values(?,?,?)", [User.id, User.username, User.password, User.isadmin], callback);
    }
    //voitaisiin tehdä vielä delete- ja update -metodit
};
module.exports = User;
