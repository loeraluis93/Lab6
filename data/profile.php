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
			$profile = "SELECT * FROM Users WHERE username = '$userName'";
			$resultProfile = mysqli_query($conn,$profile);
			if($resultProfile->num_rows > 0)
			{
				while($row = $resultProfile->fetch_assoc()){
					$fc =  array('user_name'=> $row["username"],'firstname' => $row["fName"], 'lastname' => $row["lName"],'email' => $row["mail"] ,'gender' => $row["gender"], 'country' => $row["country"], 'image' => $row["profile_image"]);
				}
				echo json_encode($fc);
				//echo '<img src="data:image/jpeg;base64,'.base64_encode( $fc['profile_image'] ).'"/>';

			} 
			else
			{
				header('HTTP/1.1 406 User not found');//$userName;
				die("Error loading profile");	
				
			}
		}
		else
		{
			header('HTTP/1.1 406 Session has expired, you will be redirected to the login');
			die(json_encode(array('message'=>'Session has expired.')));
		}
	}

?>