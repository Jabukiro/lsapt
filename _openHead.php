<?php 
function get_file_url(){
    $file_path = $_SERVER['SCRIPT_FILENAME'];
    $webrootPattern="/".preg_quote($_SERVER["DOCUMENT_ROOT"], '/')."/";
    $weburl = "https://linespeedapt.com";
    return(preg_filter($webrootPattern, $weburl, $file_path));
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo($title); ?></title>
    <meta name="description" content="<?php echo($description); ?>">
    <meta name="keywords" content="<?php echo($keywords); ?>">
    <meta property="og:locale" content="en_AU">
    <meta property="og:title" content="<?php echo($title); ?>">
    <meta property="og:description" content="<?php echo($description); ?>">
    <meta property="og:image" content="<?php echo($image); ?>">
    <meta property="og:url" content="<?php echo(get_file_url()); ?>">
    <meta property="og:site_name" content="<?php echo($SITE_NAME); ?>">
    <meta name="twitter:card" content="summary_large_image">
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KQSKV8X');</script>
    <!-- End Google Tag Manager -->
    <!-- Entreprise reCaptcha --->
    <script src="https://www.google.com/recaptcha/enterprise.js?render=6LcVmn8bAAAAAAbCHhXQzz9uiQ8S8IrHZKABfnZE"></script>
    <script defer src="/js/svelte-bundle.js"></script>
    <link rel="shortcut icon" href="/media/favicon.svg" type="image/x-icon">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
<!--Head not closed to leave individual pages to add aditional headers up themselves-->