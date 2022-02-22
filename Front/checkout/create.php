<?php
//Fetch items in cart
$webroot = $_SERVER['DOCUMENT_ROOT'];
$HEAD = parse_ini_file("$webroot/head.ini");
require "$webroot/modules/cart/fetchCart.php";
$cartList = getCart();
//Stripe stuff
require "$webroot/vendor/autoload.php";
\Stripe\Stripe::setApiKey('sk_test_gNkL1QrUxRrsXUaIRrNybGrw00IEsKJSaC');
//Create payment intent
header('Content-Type: application/json');
try {
    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => cartSubtotal($cartList) * 100,
        'currency' => 'aud',
        'automatic_payment_methods' => [
            'enabled' => true,
        ],
    ]);
    $output = [
        'paymentIntent' => $paymentIntent,
    ];
    echo json_encode($output);
} catch (Error $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
