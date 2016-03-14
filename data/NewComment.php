<?php
	include 'serverconnection.php';
	header('Accept: application/json');
	header('Content-type: application/json');
	session_start();


//Check connection
if($conn->connect_error)
{
	header('HTTP/1.1 500 Bad connection to Database');
	die("Something went wrong with the connection to the Database");
	//You end your execution here if something went wrong
	echo "error";
}
else
{
	if( isset($_SESSION["fName"]) && isset($_SESSION["lName"]))
	{
		$userName = $_SESSION["username"];
		$usercomment = $_POST["NewComment"];
		//$date=strtotime("today");
		//$time = time();
		//print_r(getdate());
		$mydate=getdate(date("U"));
	//echo " $mydate[year]-$mydate[mon]-$mydate[mday] $mydate[hours]:$mydate[minutes]:$mydate[seconds]";
		$addcomment = "INSERT INTO USERS_LAB5.User_Comments(username , fecha , comment) VALUES ('$userName','$mydate[year]-$mydate[mon]-$mydate[mday] $mydate[hours]:$mydate[minutes]:$mydate[seconds]','$usercomment')";
		if ($conn->query($addcomment))
		{
			echo json_encode("Comment successfully added");
		}
		else
		{
		header('HTTP/1.1 406 Could not add comment');
		die("Comment added");	
		}
	}
	else
	{
		header('HTTP/1.1 406 Session has expired, you will be redirected to the login');
		die(json_encode(array('message' => 'Session has expired.')));
	}
}
?>