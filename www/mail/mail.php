<?php

  require_once 'recaptchalib.php';
  
  function getUserIP(){
  // For proxy users
  $clientIp = @$_SERVER['HTTP_CLIENT_IP'];
  $forwardIp = @$_SERVER['HTTP_X_FORWARDED_FOR'];
  $remoteIp = @$_SERVER['REMOTE_ADDR'];

    if(filter_var($clientIp, FILTER_VALIDATE_IP))
    {
      $ip = $clientIp;
    }
    elseif(filter_var($forwardIp, FILTER_VALIDATE_IP))
    {
      $ip = $forwardIp;
    }
    else
    {
      $ip = $remoteIp;
    }
    
    return $ip;
  }

  $user_ip = getUserIP();

  $from = 'From: twharrison.com';
  $subject = 'Website Comment';
  $ip = $_SERVER['REMOTE_ADDR'];
  $real_ip = getUserIP();
  include 'auth.php';

  $contactname = $_POST['contact-name'];
  $contactemail = $_POST['contact-email'];
  $contactcomment = $_POST['contact-comment'];

  //Form email content
  $content = "The following is a message received at twharrison.com \r\n FROM: " . $contactname . "(" . $contactemail . ")" . "(Browser IP: " . $ip . ")" . "(Real IP: " . $real_ip . ")" . "\r\n\r\n" . $contactcomment;

  //include the email
  mail($to,$subject,$content,$from) or die('There was an error sending mail.');
  echo 'Thanks for your message!'

?>
