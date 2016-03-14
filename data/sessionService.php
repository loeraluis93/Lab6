<?php
	header('Content-type: application/json');
	session_start();

	if(isset($_SESSION["fName"]) && isset($_SESSION["lName"]) && isset($_SESSION["username"]))
	{
		echo json_encode(array("firstName" => $_SESSION["fName"], 
			"lastName" => $_SESSION["lName"], "username" => $_SESSION["username"]));
	}
	else
	{
		header('HTTP/1.1 406 Session has expired, you will be redirected to the login');
		die(json_encode(array( 'message' => 'Session has expired.')));	
	}
?>