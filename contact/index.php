<?php
    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    if ( isset($_POST['name']) )
    {
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
            // Send email containing contacts.
            $to = "d.barihuta@gmail.com";
            //$to = "info@linespeedapt.com";
            $subject = "Lead: Customer Requested To Be Contacted.";
            $headers = "From: admin\r\n";
            //$headers .= "Bcc: d.barihuta@gmail.com\r\n";
            //Enable HTML email
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
            //HTML email
            $HTML = "<html lang=\"en\"></body>";
            $message = $HTML."<h3>Information sent by customer:</h3>";
            $message .= "<b>Name:</b> ".$name."<br>";
            $message .= "<b>Email:</b> ".$email."<br>";
            $message .= "<b>Phone Number:</b>".$tel."<br>";
            $message .= "<b>Message:</b><br><p>".$question."</p>";
            $message .= "</body></html>";

            mail($to, $subject, $message, $headers);
            header('Location: index.php?success#contact');
            exit;
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Us | LineSpeedAPT | Perth Speed Training</title>
        <meta name="description" content="Send us an email or a call!">
        <meta name="keywords" content="Best Sprint Coach Perth, Sprint training Perth, Speed Training Perth, WA best Little Athletics coach, Sprinting Perth, Perth Athletics coach, Sprint coach Perth, Linespeed">
        <meta property="og:locale" content="en_AU">
        <meta property="og:title" content="Contact Details | LinespeedAPT">
        <meta property="og:image" content="https://linespeedapt.com/media/last.jpg">
        <meta property="og:url" content="https://linespeedapt.com">
        <meta property="og:site_name" content="Linespeed Atheltic Performance">
        <meta name="twitter:card" content="summary_large_image">
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KQSKV8X');</script>
        <!-- End Google Tag Manager -->
        <link rel="shortcut icon" href="/media/favicon.svg" type="image/x-icon">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
        <link rel="stylesheet" href="/css/quickAction.css">
        <link rel="stylesheet" href="/css/style_v1.0.0.css">
        <link rel="stylesheet" href="/training/css/style_v1.0.0.css">
        <link rel="stylesheet" href="css/style.css">
    </head>
<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KQSKV8X"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div id="topNavBar" class="container top-nav-wrapper top-nav-collapse">
        <nav class="navbar navbar-expand-sm navbar-dark">
            <a class="navbar-brand mr-auto" href="/"><img id="logo" src="/media/logo.svg" alt="Linespeed Logo" srcset=""></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
      
            <div class="collapse navbar-collapse" id="navbarsExample03">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active dis-none">
                    <a class="nav-link" href="/about">About <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item dropdown dis-block">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">About</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown04">
                            <a class="dropdown-item" href="/about">My Story</a>
                            <a class="dropdown-item" href="/about/linespeed/">LineSpeedAPT</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/events">Events</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact">Contact</a>
                    </li>
                    <!--To display on mobile only-->
                    <li id="training-link" class="nav-item dis-none">
                        <a class="nav-link" href="/training">Sessions</a>
                    </li>
                    <li class="nav-item dropdown dis-block">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sessions</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown03">
                            <a class="dropdown-item" href="/training/team-speed/">Team Speed</a>
                            <a class="dropdown-item" href="/training/linear-speed/">Linear Speed</a>
                            <a class="dropdown-item" href="/training/speed-agility/">Speed & Agility</a>
                            <a class="dropdown-item" href="/training/holiday-program/">Holiday Program</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <div class="container landing training-sessions">
        <div class="content-wrapper">
            <div class="landing-content">
                <h1 class="on-dark">
                    Contact <span style="color: #ED0012">Us</span>
                   <!--Improve Linear Speed and Athletic Performance-->
                </h1>
            </div>
        </div>
        <div class="container background-video">
            <img src="/media/contact.jpg" alt="" srcset="">
        </div>
    </div>
    <div class="short-gradient"></div>
    <div class="main">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Contact</li>
            </ol>
        </nav>
    </div>
    <div id="contact" class="row">
        <div class="container mt-5" >
            <div class="row" style="height:550px;">
            <div class="col-md-6 maps" >
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27181.575406248932!2d115.66251178299923!3d-31.614763405644403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2bcd580144fe4053%3A0x504f0b535df3dd0!2sAlkimos%20WA%206038%2C%20Australia!5e0!3m2!1sen!2szm!4v1607018885452!5m2!1sen!2szm" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
            <div class="col-md-6" id="contact-form">
                <h2 class="text-uppercase mt-3 font-weight-bold text-white">Contact</h2>
                <form action="" method="post">
                <div class="row">
                    <div class="col-lg-12">
                    <div class="form-group">
                        <input name="name" id="name_input"type="text" class="form-control mt-2" placeholder="Name*" required>
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <div class="form-group">
                        <input name="email" type="email" class="form-control mt-2" placeholder="Email*" required>
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <div class="form-group">
                        <input name="tel" type="tel" class="form-control mt-2" placeholder="Tel">
                    </div>
                    </div>
                    <div class="col-12">
                    <div class="form-group">
                        <textarea name="message" class="form-control" id="exampleFormControlTextarea1" placeholder="Reach out to us" rows="3" required></textarea>
                    </div>
                    </div>
                    <div class="col-12">
                    <button class="btn" type="submit">Submit</button>
                    </div>
                </div>
                </form>
                <div class="text-white">
                <h2 class="text-uppercase mt-4 font-weight-bold">Details</h2>
        
                <i class="fas fa-phone mt-3"></i> <a href="tel:+61403543403">(+61) 403 543 403</a><br>
                <i class="fa fa-envelope mt-3"></i> <a href="mailto:info@linespeedapt.com">info@linespeedapt.com</a><br>
                <i class="fas fa-globe mt-3"></i> Perth WA<br>
                <div class="my-4">
                <a href="https://www.facebook.com/pg/LinespeedAPT/"><i class="fab fa-facebook fa-3x pr-4"></i></a>
                <a href="https://www.instagram.com/linespeedapt/"><i class="fab fa-instagram fa-3x"></i></a>
                </div>
                </div>
            </div>
        
            </div>
        </div>
    </div>
    <footer class="footer text-center">
        <div class="footer-links">
            <a href="https://www.facebook.com/pg/LinespeedAPT/"><i class="fab fa-facebook fa-2x pr-2"></i></a>
            <a href="https://www.instagram.com/linespeedapt/"><i class="fab fa-instagram fa-2x"></i></a>
        </div>
        <div class="container">
            <p>'Start FAST Finish STRONG'</p>
            <span class="text-muted">@2020 LinespeedAPT. All rights reserved</span>
        </div>
    </footer>
    <!--Quick Action PopUp-->
    <div data-is-open="false" class="quickAction quickActionClosed " id="quickAction">
        <div class="quickActionOverlay"></div>
        <button aria-label="Quick actions" class="quickActionButton">
            <ul class="quickActionDots">
                <li class="quickActionFirstDot"></li>
                <li class="quickActionSecondDot"></li>
                <li class="quickActionThirdDot"></li>
            </ul>
        </button>
        <div style="display: none;" id="quickActionBar" class="quickActionBar">
            <a href="tel:0403543403" data-content="0403543403" aria-label="Phone" data-quick-action="action">
                <div>
                    <img src="/media/phone.svg" alt="Phone Contact" srcset="">
                </div>
            </a>
            <a href="mailto:info@linespeedapt.com" target="_self" data-content="info@linespeedapt.com" aria-label="Email" data-quick-action="action">
                <div>
                    <img src="/media/email.svg" alt="Mail Contact" srcset="">
                </div>
            </a>
            <a href="https://www.instagram.com/linespeedapt/?hl=en" target="_blank" data-content="https://www.instagram.com/linespeedapt/?hl=en" data-type="external" rel="noopener" aria-label="Instagram" data-quick-action="action">
                <div style="fill:#fff">
                    <div>
                        <img src="/media/insta.svg" alt="Instagram Link" srcset="">
                    </div>
                </div>
            </a>
            <div data-quick-action="separator"></div>
            <a href="https://www.facebook.com/LinespeedAPT/" target="_blank" data-content="https://www.facebook.com/LinespeedAPT/" data-type="external" rel="noopener" aria-label="Facebook" data-quick-action="action">
                <div>
                    <img src="/media/facebook.svg" alt="Facebook Link" srcset="">
                </div>
            </a>
        </div>
    </div>
    <!--End Quick Action PopUp-->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="/js/base.js"></script>
    <script src="/js/events.js"></script>
</body>
</html>