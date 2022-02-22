<?php
//Fetches cart from data server
function getCart()
{
    $webroot = $_SERVER['DOCUMENT_ROOT'];
    $currentDir = $webroot . "/modules/products";
    $ENV = parse_ini_file("$webroot/env.ini");
    $endpoint = $ENV["GQLENDPOINT"];

    $query = array(
        "query" => "query Cart{
    cart{list{
        id
        name
        image
        fee
        count
    }}}"
    );
    $data = json_encode($query);
    $options = array(
        'http' => array(
            'header'  => "Content-Type: application/json\r\n" .
                "Cookie: angel=" . $_GET["s"] . "\r\n",
            'method'  => 'POST',
            'content' => $data
        )
    );
    if ($ENV["ENV"] === "development") {
        $options["ssl"] = array(
            "verify_peer" => false,
            "verify_peer_name" => false,
        );
    }
    $context  = stream_context_create($options);
    $result = file_get_contents($endpoint, false, $context);
    if ($result === FALSE) { /* Handle error */
        error_log("Something wrong happened fetching data from server.");
    }
    $data = json_decode($result);
    return $data->data->cart->list;
}
function cartSubtotal($cartList)
{
    $subtotal = 0;
    foreach ($cartList as $key => $value) {
        $subtotal += $value->fee * $value->count;
    }
    return ($subtotal);
}
