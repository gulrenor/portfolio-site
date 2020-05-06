<?php

  // Test
  // echo "IP=" . $ip;
  // // print_r($_POST);
  // if (checkHoneypot()) {
  //   echo "it returned true";
  // } else {
  //   echo "it returned false?";
  // }

  function recaptchav3() {
    // Make sure the form has been submitted
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['recaptcha_response'])) {

      // Get the site key for verification
      include 'recaptcha_auth.php';

      // Build the verification request for Google
      $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
      $recaptcha_response = $_POST['recaptcha_response'];

      // Interpret the response
      $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
      $recaptchatwo = json_decode($recaptcha);

      // You can edit the score here to adjust how strict it is
      if ($recaptchatwo->score >= 0.5) {
        // Ok to send the email
        echo "ok to send";
        return true
      } else {
        // Return an error, or maybe just silence?
        echo "likely spammer";
        return false
      }
    }
  }
  
  // // function recaptcha() {
  // //   include 'recaptcha_auth.php';
    
  // //   $url = "https://www.google.com/recaptcha/api/siteverify";
  // //   $response = $_POST["g-recaptcha-response"];

  // //   $data = array(
  // //     'secret' => $secret,
  // //     'response' => $response
  // //   );
    
  // //   $options = array(
  // //     'http' => array (
  // //       'method' => 'POST',
  // //       'content' => http_build_query($data)
  // //     )
  // //   );
    
  // //   $context = stream_context_create($options);
  // //   $verify = file_get_contents($url, false, $context);
    
  // //   $recaptcha = json_decode($verify);
  // //   if ($recaptcha->success==true) {
  // //     return true;
  // //   } else if ($recaptcha->success==false) {
  // //     return false;
  // //   }
  // // }
  
  function getUserIP(){
  // For proxy users
  $clientIp = @$_SERVER['HTTP_CLIENT_IP'];
  $forwardIp = @$_SERVER['HTTP_X_FORWARDED_FOR'];
  $remoteIp = $_SERVER['REMOTE_ADDR'];

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

  function checkHoneypot(){
    // If any of the honeypot fields are filled in, then we know it's a bot
    if ($_POST['name'] !== "") {
      return false;
    }
    if ($_POST['email'] !== "") {
      return false;
    }
    if ($_POST['comment'] !== "") {
      return false;
    }
    return true;
  }

  $honeypot = "honeypot usage detected";
  if (checkHoneypot()) {
    $honeypot = "no honeypot usage";
  }

  $from = 'twharrison.com';
  $subject = 'Website Comment';
  include 'auth.php';
  $ip = getUserIP();

  $contactname = $_POST['contact-name6LcK'];
  $contactemail = $_POST['contact-email6LcK'];
  $contactcomment = $_POST['contact-comment6LcK'];
  
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
  $headers .= "From: " . $from . "\r\n";
  $headers .= "Reply-To: " . $from . "\r\n";
  $headers .= "X-Mailer: PHP/" . phpversion();
  
  // Form email content
  $content = "<h3>The following is a message received at twharrison.com</h3><table border=\"1\" cellpadding=\"4\">";
  $content .= "<tr><td><span>From</span></td><td><span>" . $contactname . "</span></td></tr>";
  $content .= "<tr><td><span>Email</span></td><td><span>" . $contactemail . "</span></td></tr>";
  $content .= "<tr><td><span>Browser IP</span></td><td><span>" . $ip . "</span></td></tr>";
  $content .= "<tr><td colspan=\"2\"><span>" . $contactcomment . "</span></td></tr>";
  $content .= "<tr><td><span>Honeypot Status</span></td><td><span>" . $honeypot . "</span></td></tr></table>";

  // // Send the email
  // if (recaptchav3()) {
  //   mail($to,$subject,$content,$headers) or die('There was an error sending mail.');
  //   echo 'Thanks, your message has been sent!';
  // } else {
  //   echo 'There was an error, please try again';
  // }

?>
