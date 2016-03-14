<?php
	header('Content-type: application/json');
	session_start();

	if(isset($_SESSION['fName']) && isset($_SESSION['lName']) && (isset($_SESSION["username"])))
	{
		unset($_SESSION['fName']);
		unset($_SESSION['lName']);
		unset($_SESSION['username']);
		session_destroy();
		setcookie("usernameCookie", "",time()-3600);
		echo json_encode(array('success' => 'Session deleted'));
	}
	else
	{
		header('HTTP/1.1 406 Session has expired, ypu wil be redirected to home');
		die(json_encode(array('message' => 'Session has expired')));
	}
?>