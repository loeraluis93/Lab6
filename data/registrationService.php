<?php
	header('Accept: application/json');
	header('Content-type: application/json');

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
	$useName = $_POST["User"];
	$userPassword = $_POST["Pass"];
	$userFirst=$_POST["first"];
	$userLast=$_POST["last"];
	$userMail=$_POST["mail"];
	$userGend= $_POST["gend"];
	$userCountry= $_POST["country"];
	
	$checkUserID = "SELECT * FROM Users WHERE username = '$useName'";
	$result = mysqli_query($conn,$checkUserID);
	if(mysqli_num_rows($result)>0)
	{
		echo "user already exists";
	}
	else
	{
		$sql = "INSERT INTO Users (fName, lName, username, passwrd, mail ,gender , country) VALUES ('$userFirst', '$userLast', '$useName','$userPassword', '$userMail','$userGend','$userCountry')";
		if($conn->query($sql) === TRUE)
		{
			session_start();
			$_SESSION["fName"] =$row["fName"];
			$_SESSION["lName"] =$row["lName"];
			$_SESSION["username"]=$row["username"];
			echo json_encode("User was successfully created");
		} 
		else
		{
			header('HTTP/1.1 406 User not found');
			die("User was not found in the database");	
		
		}
	}
}

?>