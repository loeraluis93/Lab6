<?php
	include 'serverconnection.php';
	header('Accept: application/json');
	header('Content-type: application/json');
	


//Check connection
if($conn->connect_error)
{
	header('HTTP/1.1 500 Bad connection to Database');
	die("Something went wrong with the connection to the Database");
	//You end your execution here if something went wrong
}
else
{
	$userName = $_POST["username"];
	$userPassword = $_POST["password"];	
	$remember = $_POST["remember"];
	//echo $remember;
	$sql = "SELECT fName, lName, username FROM Users WHERE username = '$userName' AND passwrd='$userPassword'";
	$result = $conn->query($sql);
	 
	if($result->num_rows > 0)
	{
		while($row = $result ->fetch_assoc())
		{
			$response = array('fName' => $row['fName'], 'lName' => $row['lName'], 'username' => $row['username']);
			//Starting the session
			session_start();
			$_SESSION["fName"] =$row["fName"];
			$_SESSION["lName"] =$row["lName"];
			$_SESSION["username"]=$row["username"];

			//Setting cookies
			if($remember=='true')
			{
			setcookie("usernameCookie",$userName, time() + 3600 * 24 *30);
			}
			else
			{
				//if rememberme checbox is not cheched
				//validate if cookie is already set
				if(isset($_COOKIE["usernameCookie"]))
				{
					setcookie("usernameCookie",$userName, time() + 3600 * 24);
				}
			}
		}

		echo json_encode(array('firstName' =>$_SESSION["fName"],'lastName' => $_SESSION["lName"]));//, 'username' =>$_SESSION["username"]));
	} 
	else
	{
		header('HTTP/1.1 406 User not found');
		die("User was not found in the database");	
		
	}
}

?>