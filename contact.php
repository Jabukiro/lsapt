<?php
    $ENV = parse_ini_file( "env.ini" );
    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    function isSpam($score, $reason_code){
        if (!is_nan($score) && $score >= 0.5){
            return false;
        }
        if ($reason_code === 1){
            return false;
        }
        return true;
    }
    if ($ENV["DEBUG"]){
        ob_start();
        var_dump($_POST);
        $result = ob_get_clean();
        error_log("Post content: $result");
    }
    if ( isset($_POST['name']) )
    {
        require 'reCaptcha.php';
        error_log('Evaluation of score:'.$SCORE);
        error_log('Reason if spam:'.$REASON["string"]);

        $flag = false;
        if ( empty($_POST['name']) )
        {
            $errMsg="No Name";
            $msg="Please provide a name for us to contact you.";
            $flag=true;
        }
        $name = test_input($_POST["name"]);
        $email = test_input($_POST["email"]);
        if ( !filter_var($email, FILTER_VALIDATE_EMAIL ))
        {
            $errMsg = "Invalid Email.";
            $msg = "Please provide a valid email address.";
            $flag=true;
        }
        $tel = test_input($_POST["tel"]);
        if ( !preg_match("/^[0-9+()\s]+$/", $tel) )
        {
            $errMsg = "Invalid Phone Number.";
            $msg = "Please provide a valid phone number";
            $flag=true;
        }
        $question = test_input($_POST["message"]);
        if ( $flag ) 
        {
            // Validation Failed. Redirect with proper error message.
            header('Location: index.php?errMsg='.$errMsg.'&msg='.$msg.'#contact');
            exit;
        } else {
            //Determine if spam
            $isSpam = isSpam($SCORE, $REASON["code"]);
            // Send email containing contacts.
            // One to the business email and another to the developer to monitor reCaptcha analysis.
            $toDev = $ENV["DEVMAIL"];
            $to = $ENV["MAIL"];
            $subject = "Lead: Customer Requested To Be Contacted.";
            $subjectDev = "Dev | ".$subject;
            $headers = "From: admin\r\n";
            //$headers .= "Bcc: d.barihuta@gmail.com\r\n";
            //Enable HTML email
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
            //HTML email
            $HTMLBEGIN = "<html lang=\"en\"></body>";
            $HTMLEND = "</body></html>";

            $message = $HTMLBEGIN."<h3>Information sent by customer:</h3>";
            $message .= "<b>Name:</b> ".$name."<br>";
            $message .= "<b>Email:</b> ".$email."<br>";
            $message .= "<b>Phone Number:</b>".$tel."<br>";
            $message .= "<b>Message:</b><br><p>".$question."</p>";

            $messageDev = $message."<h3>reCaptcha Analysis Information:</h3>";
            $messageDev .= "<b>Score:</b> ".$SCORE."<br>";
            $messageDev .= "<b>Reason:</b> ".$REASON["string"]."<br>";
            $messageDev .= "<b>Is Considered Spam?:</b> ".($isSpam ? "Yes" : "No")."<br>";

            $message .= $HTMLEND;
            $messageDev .= $HTMLEND;
            error_log("Is considered spam? ".($isSpam ? "Yes" : "No"));
            if (!$ENV["DEBUG"] && !$isSpam){
                mail($to, $subject, $message, $headers);
            }
            mail($toDev, $subjectDev, $messageDev, $headers);
            header('Location: index.php?success#contact');
            exit;
        }
    }
?>