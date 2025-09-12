<?php
// Here we get all the information from the fields sent over by the form.
$first_name = $_POST['first_name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$subjectrequest = $_POST['subject'];
$date = $_POST['date'];
$comments = $_POST['comments'];

	$to = 'tcmclinic12@gmail.com';
	$subject = 'Dr. Wang - '.$subjectrequest;
	$message = 'Here are the details:<br/><br/>Name: '.$first_name.'<br/>'.'Email: '.$email.'<br/>'.'Phone: '.$phone.'<br/>'.'Date and Time : '.$date.'<br/>'.'Message: '.$comments;
	$headers = 'From: '. $email . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) { // this line checks that we have a valid email address
    mail($to, $subject, $message, $headers); //This method sends the mail.
	if($subjectrequest == "Inquiries"){
		echo "Your message was sent successfully, we will contact you as soon as possible, thank you."; // success message
	}else{
		echo "Thank you for your appointment request. We will reconfirm your appointment booking with you as soon as possible."; // success message
	}
	
}else{
	echo "<span style='color:red;'>Invalid Email, please provide a correct email.</span>";
}
?>