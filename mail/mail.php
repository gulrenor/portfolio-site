<?php

  $from = 'From: web@twharrison.com';
  $to = 'gulrenor@gmail.com';
  $subject = 'Website Message';

  $contactname = $_POST['contact-name'];
  $contactemail = $_POST['contact-email'];
  $contactcomment = $_POST['contact-comment'];

  //Form email content
  $content = "The following is a message received at twharrison.com \r\n FROM: " . $contactname . "(" . $contactemail . ")" . "\r\n\r\n" . $contactcomment;

  //include the email
  mail($to,$subject,$content,$from) or die('There was an error sending mail.');
  echo 'Thanks for your message!'
 ?>
