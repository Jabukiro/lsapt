<?php
//Required variables by _openHead.php
$webroot = $_SERVER['DOCUMENT_ROOT'];
$HEAD = parse_ini_file("$webroot/head.ini");
$title = "Training Sessions | LineSpeedAPT | Perth Speed Training";
$description = $HEAD["DESCRIPTION"];
$keywords = $HEAD["KEYWORDS"] . ", Training Sessions";
$image = $HEAD["IMAGE"];
$SITE_NAME = $HEAD["SITE_NAME"];
require "$webroot/_openHead.php"
?>
<link rel="stylesheet" href="/css/quickAction.css">
<link rel="stylesheet" href="/css/style_v1.0.5.css">
<link rel="stylesheet" href="css/style_v1.0.1.css">
</head>

<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KQSKV8X" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <!--Navbar-->
    <?php require "$webroot/_navBar.php" ?>
    <div class="container landing training-list">
        <div class="content-wrapper">
            <div class="landing-content">
                <h1 class="on-dark">
                    Training <span style="color: #ED0012">Sessions</span>
                    <!--Improve Linear Speed and Athletic Performance-->
                </h1>
                <p class="on-dark p-large">
                    Observing the absence of SAQ (Speed, Agility and Quickness) coaching services available for the
                    EVERYDAY youth athlete, Linespeeds' STRUCTURED training sessions allow all athlete capabilities to
                    improve physically, and mentally.
                </p>
            </div>
        </div>
        <div class="container background-video">
            <img src="/media/training_sessions.jpg" alt="" srcset="">
        </div>
    </div>
    <div class="short-gradient"></div>
    <div class="main training-list">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Shop | Training Sessions</li>
            </ol>
        </nav>
        <div style="display: none;" class="container parent">
            <div class="big-bullet-wrapper">
                <div class="big-bullet-parent">
                    <div class="big-bullet-icon pop-scroll">
                        <a href="/training/speed-agility/">
                            <img src="/media/speed_agility_bullet_icon.jpg" alt="Speed and Agility Training" class="big-bullet-icon-img" href="/training/speed-agility/">
                        </a>
                    </div>
                    <div class="big-bullet-content-wrapper">
                        <h3 class="h3-large font_7">Speed and Agility Training</h3>
                        <p>
                            <a href="/training/speed-agility/">Learn&nbsp;More...</a>
                        </p>
                    </div>
                </div>
                <div class="big-bullet-parent">
                    <div class="big-bullet-icon pop-scroll">
                        <a href="/training/team-speed/">
                            <img style="position: absolute; height: 200px; top: 0px; left: -25px; width: unset;" src="/media/team_bullet_icon_1.jpg" alt="Sports Team Training" class="big-bullet-icon-img">
                        </a>
                    </div>
                    <div class="big-bullet-content-wrapper">
                        <h3 class="h3-large font_7">Sports Team Training</h3>
                        <p>
                            <a href="/training/team-speed/">Learn&nbsp;More...</a>
                        </p>
                    </div>
                </div>
                <div class="big-bullet-parent">
                    <div class="big-bullet-icon pop-scroll">
                        <a href="/training/linear-speed/">
                            <img src="/media/sprint_bullet_icon_1.jpg" alt="Linear Speed Training" class="big-bullet-icon-img">
                        </a>
                    </div>
                    <div class="big-bullet-content-wrapper">
                        <h3 class="h3-large font_7">Linear Speed Training</h3>
                        <p>
                            <a href="/training/linear-speed/">Learn&nbsp;More...</a>
                        </p>
                    </div>
                </div>
                <div class="big-bullet-parent">
                    <div class="big-bullet-icon pop-scroll">
                        <a href="/training/holiday-program/">
                            <img style="height: 200px; width: unset;" src="/media/holiday_bullet_icon.jpg" alt="Holiday Program" class="big-bullet-icon-img">
                        </a>
                    </div>
                    <div class="big-bullet-content-wrapper">
                        <h3 class="h3-large font_7">Holiday Program</h3>
                        <p>
                            <a href="/training/holiday-program/">Learn&nbsp;More...</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!--Add automated product List-->
        <?php require "$webroot/modules/products/products.php" ?>
        <!--End automated product List-->
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
</body>

</html>