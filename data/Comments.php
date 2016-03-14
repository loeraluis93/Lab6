<?php

	header('Accept: application/json');
	header('Content-type: application/json');
	session_start();

	$servername = "localhost";
	$username = "root";
	$password = "root";
	$dbname = "USERS_LAB5";

//Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

//Check connection
	if($conn->connect_error)
	{
		header('HTTP/1.1 500 Bad connection to Database');
		die("Something went wrong with the connection to the Database");
		//You end your execution here if something went wrong
	}
	else
	{
		if( isset($_SESSION["fName"]) && isset($_SESSION["lName"]))
		{
			$userName=$_SESSION["username"];
			$Comments = "SELECT username, comment, fecha FROM USERS_LAB5.User_Comments WHERE username in
			(SELECT receiver_uname as username FROM USERS_LAB5.Friendships2 WHERE username = '$userName' AND status = 'Accepted' 
			 UNION
			 SELECT username FROM USERS_LAB5.Friendships2 WHERE receiver_uname = '$userName' AND status = 'Accepted'
			 UNION
			 SELECT '$userName' as username FROM dual)
		     ORDER BY fecha DESC ";

				$resultComments = mysqli_query($conn,$Comments);
				if($resultComments->num_rows > 0)
				{
					$ans = array();
					while($row = $resultComments -> fetch_assoc()){
					$fc =  array('user_name'=> $row["username"],'comment' => $row["comment"]);
						array_push($ans, $fc);
					}
					echo json_encode($ans);
					} 
				else
				{
					json_encode(header('HTTP/1.1 406 You have no comments'));//$userName;
					json_encode(die("No Friends"));	
					
				}
		}
		else
		{
			header('HTTP/1.1 406 Session has expired, you will be redirected to the login');
		die(json_encode(array( 'message' => 'Session has expired.')));	
		}
	}

?>