<?php
$webroot = $_SERVER['DOCUMENT_ROOT'];
$currentDir = $webroot . "/modules/products";
$ENV = parse_ini_file("$webroot/env.ini");
$endpoint = $ENV["GQLENDPOINT"];

$query = array(
    "query" => "query GetProduct{
    getProductList{
        id
        name
        attributes
        description
        image
        fee
    }
}"
);
$data = json_encode($query);
$options = array(
    'http' => array(
        'header'  => "Content-Type: application/json\r\n",
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
}
$data = json_decode($result);
$productsList = $data->data->getProductList;
//Build html of products
$productTemplate = file_get_contents($currentDir . "/singleProduct.html");

//Takes the template that is singleProduct.html and populate it with data
function buildSingleProduct($productdetails, $template)
{
    $productOptions = array(
        "product_id" => $productdetails->id,
        "product_image_full" => $productdetails->image,
        "product_image" => $productdetails->image,
        "product_title" => $productdetails->name,
        "product_subtitle" => $productdetails->attributes,
        "product_fee" => $productdetails->fee,
    );
    foreach ($productOptions as $key => $value) {
        $template = str_replace('{{' . $key . '}}', $value, $template);
    }
    return ($template);
}
/**
 * This function will provide the final HTML
 */
function buildProductsHtml($productsList, $productHtml)
{
    $finalproductsHTML = ""; //what will be returned
    foreach ($productsList as $key => $value) {
        $finalproductsHTML .= buildSingleProduct($value, $productHtml);
    }
    return $finalproductsHTML;
}
?>
<div class="sessions-wrapper container parent offWhiteSurface text-center">
    <div class="sessions">
        <?php echo buildProductsHTML($productsList, $productTemplate) ?>
    </div>
</div>