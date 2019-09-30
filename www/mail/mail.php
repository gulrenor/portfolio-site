<?php
  $ip = getUserIP();
  
  function recaptcha() {
    include 'recaptcha_auth.php';
    
    $url = "https://www.google.com/recaptcha/api/siteverify";
    $response = $_POST["g-recaptcha-response"];

    $data = array(
      'secret' => $secret,
      'response' => $response
    );
    
    $options = array(
      'http' => array (
        'method' => 'POST',
        'content' => http_build_query($data)
      )
    );
    
    $context = stream_context_create($options);
    $verify = file_get_contents($url, false, $context);
    
    $recaptcha = json_decode($verify);
    if ($recaptcha->success==true) {
      return true;
    } else if ($recaptcha->success==false) {
      return false;
    }
  }
  
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

  $from = 'twharrison.com';
  $subject = 'Website Comment';
  include 'auth.php';

  $contactname = $_POST['contact-name'];
  $contactemail = $_POST['contact-email'];
  $contactcomment = $_POST['contact-comment'];
  
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
  $content .= "<tr><td colspan=\"2\"><span>" . $contactcomment . "</span>
  </td></tr></table>";
  
  // Send the email
  if (recaptcha()) {
    mail($to,$subject,$content,$headers) or die('There was an error sending mail.');
    echo 'Thanks, your message has been sent!';
  } else {
    echo 'There was an error, please try again';
  }

?>
