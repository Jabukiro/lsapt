<?php
$webroot = $_SERVER['DOCUMENT_ROOT'];
$ENV = parse_ini_file("$webroot/env.ini");
require "$webroot/vendor/autoload.php";
$stripe = new \Stripe\StripeClient(
    $ENV["STRIPE_SK"]
);
header('Content-Type: application/json');
try {
    $paymentIntent = $stripe->paymentIntents->update(
        $_GET["payment_intent"],
        ['receipt_email' => $_GET["receipt_email"]]
    );
    $output = [
        'paymentIntent' => $paymentIntent,
    ];
    echo json_encode($output);
} catch (Error $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
