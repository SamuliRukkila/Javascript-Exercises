<?php
/* dbquery.php
  Tällä PHP-skriptillä otetaan yhteys MySQL-tietokantaan ja haetaan tieto
  siitä onko lomakkeelle syötetty tunnus kannassa. Tämä skripti ei toimi suoraan HTML-sivun
  kanssa kuten perinteisissä sovelluksissa vaan PHP-skriptin ja HTML-sivun välissä toimii ajax.js

  Testausta varten tarvitset seuraavanlaisen taulun jonka voit laittaa esim. kantaan nimeltään websk:

  CREATE TABLE `user` (
  `username` varchar(20) NOT NULL default '',
  `password` varchar(20) NOT NULL default '',
  `ID` int(11) NOT NULL auto_increment,
  PRIMARY KEY  (`ID`)
  ) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=0 ;
 */

//poimitaan ajax.js -skriptistä input-kenttään syötetty arvo
//sisääntulevan datan filtteröintiä ei ole
$value = $_GET['q'];
// Remove whitespaces
$value = str_replace(' ','',$value);
// If value isn't empty after whitespace-removal
if (!empty($value)) {

    //yhteydenotto kantaan kannattaisi laittaa connect.php -tiedostoon jonka voisi incluudata
    //joka sivulle jossa sitä tarvitaan
    $yhteys = mysqli_connect("localhost", "root", "123") or die("Yhteyttä kantaan ei saatu");
    mysqli_select_db($yhteys, "websk") or die("Tietokantaa ei löydy");

    //valitaan kaikki tietueet joiden username-kentässä on lomakkeelle syötetty arvo
    $query = "SELECT * FROM user where username ='$value'";
    $result = mysqli_query($yhteys, $query);
    //niiden rivien määrä jotka toteuttavavat hakuehdon
    $num_rows = mysqli_num_rows($result);
    //jos hakuehdon toteuttavia rivejä ei ole, on tunnus käytettävissä

    if ($num_rows == 0) {
        $msg = 'Käytettävissä';
    } else {
        $msg = 'On jo käytössä, valitse joku muu!';
    }
}

else {
    $msg = 'Älä jätä kohtaa tyhjäksi tai käytä pelkkää välilyöntä!';
}
    /* Lopuksi tulostetaan viesti joka lähtee ajax.js -skriptille tekstimuodossa.
      Muotona voisi olla myös esim. JSON tai XML jos lähetettäisiin paljon dataa
      jolla on tietty rakennne */
    echo $msg;
