<?php
//Required variables by _openHead.php
$webroot = $_SERVER['DOCUMENT_ROOT'];
$HEAD = parse_ini_file("$webroot/head.ini");
$title = "LineSpeedAPT | Perth Speed Training";
$description = $HEAD["DESCRIPTION"];
$keywords = $HEAD["KEYWORDS"];
$image = $HEAD["IMAGE"];
$SITE_NAME = $HEAD["SITE_NAME"];

$ENV = parse_ini_file("$webroot/env.ini");
//Simple function to populate a template given some data
//The function will target '{{key}}'
//where key is the key of an array and will replace it the value of said key.
function populateTemplate($data, $template)
{
    $data->total = $data->count * $data->fee;
    foreach ($data as $key => $value) {
        $template = str_replace('{{' . $key . '}}', $value, $template);
    }
    return ($template);
}
function loadProducts($cartList, $template)
{
    $finalHTML = ""; //what will be returned
    foreach ($cartList as $key => $value) {
        $finalHTML .= populateTemplate($value, $template);
    }
    return $finalHTML;
}

require "$webroot/modules/cart/fetchCart.php";
$cartList = getCart();
if (count($cartList) === 0) {
    header("Location: /");
    exit();
}
$template = file_get_contents($webroot . "/checkout/singleCartProduct.html");
require "$webroot/_openHead.php";
?>
<link rel="stylesheet" href="/css/quickAction.css">
<link rel="stylesheet" href="/css/style_v1.0.5.css">
<link rel="stylesheet" href="/css/cart.css">
<link rel="stylesheet" href="./checkout.css">
<script src="https://js.stripe.com/v3/"></script>
<script src="checkout.js" defer></script>
</head>

<body style="min-width: 315px; min-height: 100vh;">
    <div class="checkout wrap" style="min-height: inherit;">
        <div class="py-5 main" role="main">
            <div class="main-header">
                <span><img src="/media/logo.svg" alt="" srcset=""></span>
            </div>
            <div class="horizontal-divider hide_below_1025" style="height: 1px"></div>
            <div class="section-header">
                <h6 class="accentuate">
                    Contact Information
                </h6>
            </div>
            <div class="form-group">
                <label class="form-check-label accentuate" for="receipt_email" style="font-size: 0.80rem">To receive proof of payment</label>
                <input id="receipt_email" type="text" class="mb-2 form-control" required placeholder="Email address*">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                    <label class="form-check-label small-font" for="defaultCheck1">
                        I would like to receive updates on new sessions and offers via email. I understant that I can opt out at any time.
                    </label>
                </div>
            </div>
            <!-- Display a payment form -->
            <div class="section-header">
                <h6 class="accentuate">Payment Information</h6>
            </div>
            <form id="payment-form">
                <div id="payment-element" style="max-width: 100vw;">
                    <!--Stripe.js injects the Payment Element-->
                </div>
                <button class="btn btn-dark btn-accent" id="submit">
                    <div class="spinner-border spinner-border-sm hidden" id="spinner" style="color: var(--main-color);"></div>
                    <span id="button-text">Pay now</span>
                </button>
                <div id="payment-message" class="hidden"></div>
            </form>
        </div>
        <div id="collapseOne" class="sidebar collapse show">
            <div class="py-5 cart-content">
                <?php echo loadProducts($cartList, $template); ?>
                <!--
            <div class="horizontal-divider" style="height: 1px"></div>
            <div class="discounts">
                <form class="form-group" action="">
                    <input class="form-control" type="text" placeholder="Discount code">
                    <button class="btn btn-primary">Apply</button>
                </form>
            </div>-->
                <div class="horizontal-divider" style="height: 2px"></div>
                <div class="cart-checkout-totals mb-3">
                    <div class="cart-checkout-subtotals d-flex flex-row justify-content-between small-font">
                        <span class="font-weight-bold text-uppercase">SUBTOTAL:</span>
                        <span class="font-weight-bold">$<?php echo cartSubtotal($cartList); ?></span>
                    </div>
                    <div class="horizontal-divider" style="margin: 0.5rem 0"></div>
                    <div class="cart-checkout-estimated-totals d-flex flex-row justify-content-between">
                        <span class="font-weight-bold text-uppercase">Total:</span>
                        <span class="font-weight-bold">$<?php echo cartSubtotal($cartList); ?></span>
                    </div>
                </div>
            </div>
        </div>
        <div id="sidebarToggle" class="card">
            <div class=" card-header" id="headingOne">
                <h5 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        Show/Hide Order Summary
                    </button>
                </h5>
            </div>
        </div>
        <div class="banner">
            <span><img src="/media/logo.svg" alt="" srcset=""></span>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>