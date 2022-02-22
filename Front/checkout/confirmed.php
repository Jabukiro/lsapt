<?php
//Required variables by _openHead.php
$webroot = $_SERVER['DOCUMENT_ROOT'];
$HEAD = parse_ini_file("$webroot/head.ini");
$title = "LineSpeedAPT | Perth Speed Training";
$description = $HEAD["DESCRIPTION"];
$keywords = $HEAD["KEYWORDS"];
$image = $HEAD["IMAGE"];
$SITE_NAME = $HEAD["SITE_NAME"];

//Stripe stuff
require "$webroot/vendor/autoload.php";
$stripe = new \Stripe\StripeClient(
    'sk_test_gNkL1QrUxRrsXUaIRrNybGrw00IEsKJSaC'
);
$paymentIntent = $stripe->paymentIntents->retrieve(
    $_GET["payment_intent"],
    []
);

require "$webroot/modules/cart/clearCart.php";
clearCart();

require "$webroot/_openHead.php";
?>
<link rel="stylesheet" href="/css/quickAction.css">
<link rel="stylesheet" href="/css/style_v1.0.5.css">
<link rel="stylesheet" href="./checkout.css">
</head>

<body>
    <section class="main d-flex flex-column align-items-center py-5 px-1" role="main">
        <div class="" style="max-width: 300px;">
            <a href="/"><img style="width: 100%;" src="/media/logo.svg" alt="Go Home" srcset=""></a>
        </div>
        <h2 class="header mt-5" style="color: var(--main-color);">Thank you!</h2>
        <p class="mb-4 text-center" style="max-width: 500px;">Your registration has been completed succesfully. Check your email for further details</p>
        <a class="btn btn-dark btn-accent" href="<?php echo $paymentIntent->charges->data[0]->receipt_url ?>">View Receipt</a>
    </section>
</body>

</html>