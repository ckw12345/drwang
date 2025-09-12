<?php
// Here we get all the information from the fields sent over by the form.
//$name = $_POST['name'];
$email = $_POST['email'];
//$phone = $_POST['phone'];
//$date = $_POST['date'];
//$comments = $_POST['comments'];
	$to = 'tcmclinic12@gmail.com';
	$subject = 'Seminar sign-up';
	$message = 'Here is the Email id:<br/><br/>'.'Email: '.$email.'<br/>';
	$headers = 'From: '. $name . $phone . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) { // this line checks that we have a valid email address
    mail($to, $subject, $message, $headers); //This method sends the mail.
	echo "Thank you! You have successfully signed up to attend the seminar. We will send you an email for confirmation shortly."; // success message
	
}else{
	echo "Invalid Email, please provide a correct email.";
}
?>