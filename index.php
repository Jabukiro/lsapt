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
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LineSpeedAPT | Perth Speed Training</title>
    <link rel="preload" href="media/loader.mp4" as="video">
    <link rel="shortcut icon" href="/media/favicon.svg" type="image/x-icon">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous">
    <link rel="stylesheet" href="css/quickAction.css">
    <link rel="stylesheet" href="css/events.css">
    <link rel="stylesheet" href="css/style_v1.0.1.css">
</head>
<body style="min-width: 315px;">
    <div id="topNavBar" class="container top-nav-wrapper">
        <nav class="navbar navbar-expand-sm navbar-dark">
            <a class="navbar-brand mr-auto" href="/"><img id="logo" src="media/logo.svg" alt="Linespeed Logo" srcset=""></a>
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
        <div class="top-nav-gradient"></div>
    </div>
    <div class="container landing">
        <div class="content-wrapper">
            <div id="load1" class="landing-content" style="opacity: 0; padding-top: 100vh;">
                <!--
                <h1 class="on-dark">
                    Start <span style="color: #ED0012">FAST</span> <br>Finish <span style="color: #ED0012">STRONG</span>
                Improve Linear Speed and Athletic Performance
                </h1>-->
                <!--
                <p class="on-dark p-large">
                    Ages 6-16 are crucial for a child to reach their full atheltic performance. Discover how Linespeed's speed training method can help your child reach their full potential!
                </p>
                -->
                <div class="content-link-wrapper">
                    <label for="name_input" class="content-link">
                        <div class="content-link-text">
                            Start your LineSpeed Journey
                        </div>
                        <img src="/media/arrow.svg" alt="" class="content-link-arrow">
                    </label>
                </div>
            </div>
        </div>
        <!--Uncomment for full width and height background<div class="container background-video">-->
        <!--Full Width only background and centered vertically -->
        <div class="container landscape-background-video">
            <video id="background_vid" src="media/loader.mp4" muted></video>
            <img id="background_img" style="display: none;" src="media/last.jpg" />
        </div>
    </div>
    <div id="about" class="container about">
        <div class="about-text on-red" style="text-align: center;">
            <h1 class="on-red">Start <span style="color: #000">FAST</span><br>Finish <span style="color: #000">STRONG</span></h1>
            <!--
            <p class="p-med">
                Based In Perth, WA, I created LineSpeed to help young atheletes reach their full potential. Over the years LineSpeed has developped into a close-knit community and a lot of the atheletes I've trained have gone on to win trophies in their respective sports. Here at LineSpeed Athletic Performance Training we are committed to creating a CULTURE that allows our athletes to strive for EXCELLENCE in sport, and in LIFE. Speed is a core aspect to many sports as well as the general athletic performance of a person; for this reason, LineSpeed speed training focuses on improving running mechanics and movement efficiency.<br>We see every youth as an athlete; whether you see your child as a serious athlete looking to get better or just wanting to get fit and have fun doing it, the LineSpeed Training System has a corresponding program.<br><br><span class="about-quote text-center">"Good is not enough when BETTER is expected."</span>
                <br><span class="d-flex"><a href="/about" class="mx-auto btn btn-success" role="button" aria-pressed="true">More&nbsp;Info</a></span>
                
            </p>
        -->
        <p class="p-med">
            SPEED is a skill that can be improved in any athlete with the correct training and education towards preparation, technique and intensity.
        </p>
        <p class="p-med mb-0">
            Our structured training sessions expose athletes to components of SPEED DEVELOPMENT that will:
        </p>
        <ul class="list-inline justify-content-center">
            <li>Increase speed</li>
            <li>Improve sports performance</li>
            <li>Improve running technique</li>
            <li>Improve running efficiency</li>
            <li>Reduce risk of injury</li>
            <li>Increase confidence</li>
        </ul>
        <p class="p-med">
            From 8yrs old to adults, different range of capabilities and experience, multiple sports codes, Linespeed APT strives to assist athletes to reach their full athletic potential.
            <br>Its not where you START, its where you FINISH.<br><br>
            <br><a href="#contact" class="mx-auto btn btn-success" role="button" aria-pressed="true">Contact&nbsp;Us</a> to start your journey.
        </p>
        </div>
    </div>
    <div class="container parent">
        <div id="events" class="events">
            <h2 class="events-title text-center"><span>COMING UP</span></h2>
            <div class="events-toggle-frame-container">
                <div class="events-toggle-frame">
                    <div data-collapsed="false" class="events-toggle-accordion active">
                        <label class="switch">
                            <input type="checkbox" id="switchBtn">
                            <span class="slider round"></span>
                        </label>
                        <h5 class="events-toggle-accordion-title align-middle">October Holiday Program</h5>
                    </div><div class="events-toggle-content">
                        <div class="block">
                            <a href="media/holiday_prog.jpg" target="_blank">
                                <img src="media/holiday_prog.jpg" alt="" srcset="">
                            </a>
                            <!--
                            <p>
                            We will be conducting a holiday programme during the school holidays in October (5th - 9th). The programme will be challenging but baalanced and will aim to keep the children active and motivated and provide team building skills and mentorship
                            </p>
                            -->
                        </div>
                    </div>
                </div>
                <!-- Repeated structure as above -->
                <div class="events-toggle-frame">
                    <div data-collapsed="true" class="events-toggle-accordion">
                        <label class="switch">
                            <input type="checkbox" id="switchBtn">
                            <span class="slider round"></span>
                        </label>
                        <h5 class="events-toggle-accordion-title">Shark - Rugby Academy</h5>
                    </div><div class="events-toggle-content">
                        <div class="block">
                            <a href="media/shark_flyer.jpg" target="_blank">
                                <img src="media/shark_flyer.jpg" alt="" srcset="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="short-horizontal-divider"></div>
        <div class="big-bullet-wrapper">
            <div class="big-bullet-parent">
                <div class="big-bullet-icon">
                    <a href="/training/speed-agility/">
                        <img src="media/agility_bullet_icon.jpg" alt="Speed and Agility Training" class="big-bullet-icon-img">
                    </a>
                </div>
                <div class="big-bullet-content-wrapper">
                    <h3 class="text-center h3-large font_7">Speed and Agility Training</h3>
                    <p>
                        Speed and Agility drills to improve performance in sports that require changing direction quickly whilst keeping balance, strength, speed and body in control.<br><a href="/training/speed-agility/">Learn&nbsp;More...</a>
                    </p>
                </div>
            </div>
            <div class="big-bullet-parent">
                <div class="big-bullet-icon">
                    <a href="/training/team-speed/">
                        <img style="position: absolute; height: 200px; top: 0px; left: -25px; width: unset;" src="media/team_bullet_icon_1.jpg" alt="Sports Team Specific Training" class="big-bullet-icon-img">
                    </a>
                </div>
                <div class="big-bullet-content-wrapper">
                    <h3 class="text-center h3-large font_7">Sports Team Training</h3>
                    <p>
                        Gain the competitive edge. Reduce chances of injury, increase movement efficiency, improve team confidence and unity.<br><a href="/training/team-speed/">Learn&nbsp;More...</a>
                    </p>
                </div>
            </div>
            <div class="big-bullet-parent">
                <div class="big-bullet-icon">
                    <a href="/training/linear-speed/">
                        <img src="media/sprint_bullet_icon_1.jpg" alt="Linear Speed Training" class="big-bullet-icon-img">
                    </a>
                </div>
                <div class="big-bullet-content-wrapper">
                    <h3 class="text-center h3-large font_7">Linear Speed Training</h3>
                    <p>
                        Straight speed sprint training. Cover distance in faster time, on grass or on the court. Game breaker SKILL that is an integral part of any sport.<br><a href="/training/linear-speed/">Learn&nbsp;More...</a>
                    </p>
                </div>
            </div>
            <div class="big-bullet-parent">
                <div class="big-bullet-icon">
                    <a href="/training/holiday-program/">
                        <img style="width: unset; height: 200px; position: absolute; top: 0px; left: -100px;"src="media/holiday_bullet_icon_1.jpg" alt="Holiday Programs" class="big-bullet-icon-img">
                    </a>
                </div>
                <div class="big-bullet-content-wrapper">
                    <h3 class="text-center h3-large font_7">Holiday Program</h3>
                    <p>
                        Programs aimed at exposing athletes to the full Linespeed sports performance framework aswell as associating speed and agility to sports performance.<br><a href="/training/holiday-program/">Learn&nbsp;More...</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="container instagram">
        <!--<div class="quote-wrapper">
            <p class="quote">
                SPEED is a SKILL, and like any skill, it must be practised correctly, and honed with consistency to achieve greater results.
            </p>
        </div>-->
        <div class="insta-embed" id="instaFrameContainer">
            <div class="instaFrameWrapper">
                <iframe id = "instaFrame" src="insta.html" frameborder="0" scrolling="no" class="instaFrame"></iframe>
            </div>
        </div>
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
        
                <i class="fas fa-phone mt-3"></i> <a href="tel:+65403543403">(+61) 403 543 403</a><br>
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
                    <img src="media/phone.svg" alt="Phone Contact" srcset="">
                </div>
            </a>
            <a href="mailto:info@linespeedapt.com" target="_self" data-content="info@linespeedapt.com" aria-label="Email" data-quick-action="action">
                <div>
                    <img src="media/email.svg" alt="Mail Contact" srcset="">
                </div>
            </a>
            <a href="https://www.instagram.com/linespeedapt/?hl=en" target="_blank" data-content="https://www.instagram.com/linespeedapt/?hl=en" data-type="external" rel="noopener" aria-label="Instagram" data-quick-action="action">
                <div style="fill:#fff">
                    <div>
                        <img src="media/insta.svg" alt="Instagram Link" srcset="">
                    </div>
                </div>
            </a>
            <div data-quick-action="separator"></div>
            <a href="https://www.facebook.com/LinespeedAPT/" target="_blank" data-content="https://www.facebook.com/LinespeedAPT/" data-type="external" rel="noopener" aria-label="Facebook" data-quick-action="action">
                <div>
                    <img src="media/facebook.svg" alt="Facebook Link" srcset="">
                </div>
            </a>
        </div>
    </div>
    <!--End Quick Action PopUp-->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="js/style_no_loader.js"></script>
    <script src="js/events.js"></script>
    <script src="js/base.js"></script>
</body>
</html>