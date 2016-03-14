<?php
	header('Content-type: application/json');

	if(isset($_COOKIE["usernameCookie"]))
	{
		echo json_encode(array("cookieValue" => $_COOKIE["usernameCookie"]));
	}
	else
	{
		header('HTTP/1.1 406 Cookie has not been set yet');
		die(json_encode(array('message' => 'Cookie not set')));
	}
?>