<?php

/*
  adduser.php
  Skripti jolla lisätään käyttäjät kantaan
  mikäli ajax.js -skriptin enableButton()
  -funktiossa se sallitaan
 */

//Poimitaan syötetyt arvot lomakkeelta
//sisääntulevan datan filtteröintiä ei ole
$username = $_POST['username'];
$password = $_POST['password'];
$submit = $_POST['submit'];

//jos nappia on painettu
if ($submit) {

    //yhteydenotto kantaan kannattaisi laittaa connect.php -tiedostoon jonka voisi incluudata
    //joka sivulle jossa sitä tarvitaan
    $yhteys = mysqli_connect("localhost", "root", "123") or die("Yhteyttä kantaan ei saatu");
    mysqli_select_db($yhteys, "websk") or die("Tietokantaa ei löydy");

    $query = "INSERT INTO user SET username='$username', password='$password'";

    mysqli_query($yhteys, $query) or die("Tietojen lisääminen ei onnistunut<br>"
                    . mysqli_error());


    echo "Käyttäjä lisätty!<meta http-equiv=refresh content='0; url=../index.html'>";
}
