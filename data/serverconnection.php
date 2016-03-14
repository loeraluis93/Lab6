<?php
	session_start();
	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "USERS_LAB5";

//Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
?>