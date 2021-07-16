<?php
 require 'vendor/autoload.php';
 use Google\Cloud\RecaptchaEnterprise\V1\RecaptchaEnterpriseServiceClient;
 use Google\Cloud\RecaptchaEnterprise\V1\Event;
 use Google\Cloud\RecaptchaEnterprise\V1\Assessment;
 use Google\Cloud\RecaptchaEnterprise\V1\TokenProperties\InvalidReason;
 //$SPAM = false;
 $REASON = "";
 $SCORE = NAN;
 ob_start();
 var_dump($_POST);
 $result = ob_get_clean();
 error_log("Post content: $result");
 if (isset($_POST['g-recaptcha-response'])){
    error_log("Starting Recaptcha Enterprise Client...");
    $client = new RecaptchaEnterpriseServiceClient();
    error_log("... Recaptcha Enterprise Client initialised:");
    define('SITE_KEY', '6LcVmn8bAAAAAAbCHhXQzz9uiQ8S8IrHZKABfnZE');
    define('TOKEN', $_POST['g-recaptcha-response']);
    define('PROTECTED_ACTION', 'contact');
    define('PARENT_PROJECT', 'projects/lsapt-319116');

    $event = (new Event())
        ->setSiteKey(SITE_KEY)
        ->setExpectedAction(PROTECTED_ACTION)
        ->setToken(TOKEN);

    $assessment = (new Assessment())
        ->setEvent($event);

    try {
        $response = $client->createAssessment(
            PARENT_PROJECT,
            $assessment
        );

        if ($response->getTokenProperties()->getValid() == false) {
            error_log('The CreateAssessment() call failed because the token was invalid for the following reason: '.InvalidReason::name($response->getTokenProperties()->getInvalidReason()));
            $SCORE = NAN;
            $REASON = 'The CreateAssessment() call failed because the token was invalid for the following reason: '.InvalidReason::name($response->getTokenProperties()->getInvalidReason());
        } else {
            if ($response->getEvent()->getExpectedAction() == PROTECTED_ACTION) {
                error_log("The score for the protection action is: ".$response->getRiskAnalysis()->getScore());
                $SCORE = $response->getRiskAnalysis()->getScore();
                $REASON = "";
            }
            else
            {
                error_log("The action attribute in reCAPTCHA tag did not match expected action");
                $SCORE = NAN;
                $REASON = "The action attribute in reCAPTCHA tag did not match expected action";
            }
        }
    } catch (exception $e) {
        error_log('CreateAssessment() call failed with the following error: '.$e);
        $SCORE = NAN;
        $REASON = 'CreateAssessment() call failed with the following error: '.$e;
    }
 } else{
     error_log("g-recaptcha-response was not set");
     //Assuming is spam
     $SCORE = NAN;
     $REASON = "g-recaptcha-response was not set";
 }