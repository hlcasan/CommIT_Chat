<?php
/*db_connect.php 
	This file is a tiny resource used to connect to the database.
  It is used by all the files in your app
*/

//Connection Information
$host = "localhost";  // always this value
$user = "*****";    // your student id
$pass = "*****";      // your password
$db = "db1111111";    // your database

//Establish connection: host, user, password, database
//The connection variable is called $dbi
$dbi = mysqli_connect($host,$user,$pass,$db);
if ($dbi->connect_error) {
    die('Connect Error (' . $dbi->connect_errno . ') ' . $dbi->connect_error);
}
?>