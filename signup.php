<?php
// Here we get all the information from the fields sent over by the form.
$first_name = $_POST['first_name'];
$email = $_POST['email'];
$phone = $_POST['phone'];


	$to = 'tcmclinic12@gmail.com';
	$subject = 'Seminar sign-up ';
	$message = 'Here are the details:<br/><br/>Name: '.$first_name.'<br/>'.'Email: '.$email.'<br/>'.'Phone: '.$phone.'<br/>';
	$headers = 'From: '. $email . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) { // this line checks that we have a valid email address
    mail($to, $subject, $message, $headers); //This method sends the mail.

}
?>