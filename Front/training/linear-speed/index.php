<?php
//Required variables by _openHead.php
$webroot = $_SERVER['DOCUMENT_ROOT'];
$HEAD = parse_ini_file("$webroot/head.ini");
$title = "Linear Speed Training | Perth Speed Training";
$description = $HEAD["DESCRIPTION"];
$keywords = $HEAD["KEYWORDS"] . ", Top-Speed Training";

$image = $HEAD["IMAGE"];
$SITE_NAME = $HEAD["SITE_NAME"];
require "$webroot/_openHead.php"
?>
<link rel="stylesheet" href="/css/quickAction.css">
<link rel="stylesheet" href="/css/style_v1.0.1.css">
<link rel="stylesheet" href="../css/style_v1.0.1.css">
</head>

<body style="min-width: 315px;" class="text-md">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KQSKV8X" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <!-- Populate Navbar -->
    <?php require "$webroot/_navBar.php" ?>
    <div class="container landing training-sessions">
        <div class="content-wrapper">
            <div class="landing-content">
                <h1 class="on-dark">
                    Linear <span style="color: #ED0012">Speed</span>
                    <!--Improve Linear Speed and Athletic Performance-->
                </h1>
                <!-- <p class="on-dark p-large">
                    Ages 6-16 are crucial for a child to reach their full atheltic performance. Discover how Linespeed's speed training method can help your child reach their full potential!
                </p>
                <div>
                    <a href="#contact" class="content-link">
                        <div class="content-link-text">
                            Become Part of the #LinespeedCommunity in Perth
                        </div>
                        <img src="/media/arrow.svg" alt="" class="content-link-arrow">
                    </a>
                </div> -->
            </div>
        </div>
        <div class="container background-video">
            <img src="/media/linear_speed_3.jpg" alt="" srcset="">
        </div>
    </div>
    <div class="short-gradient"></div>
    <div class="main">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item"><a href="..">Training</a></li>
                <li class="breadcrumb-item active" aria-current="page">Linear-Speed</li>
            </ol>
        </nav>
        <div class="container training-content">
            <h1><strong>Linear Speed</strong></h1>
            <p>
                <strong>Duration: </strong>90 minutes
            </p>
            <strong>Focus:</strong>
            <ul>
                <li>Acceleration (0m – 30m) – Sprint starts, Explosive movement, first step speed</li>
                <li>Max Velocity (Max Speed – 30m+) Running Form, Stride length/frequency</li>
                <li>Speed Endurance - maintaining speed over distance, sprint efficiency.</li>
            </ul>
            <strong>Groups*:</strong>
            <ul>
                <li>Foundation - 8yrs - 10yrs</li>
                <li>Development - 11yrs - 13yrs</li>
                <li>Performance - 14yrs+</li>
            </ul>
            <span>*Capabilities of athletes will also be assessed for session suitability.</span><br><br>
            <!--
            <p>
                <strong>Description:</strong>
                Straight speed sprint training. Cover distance in faster time, on grass or on the court. Game breaker SKILL that is an integral part of any sport.
            </p>-->
            <strong>Program:</strong>
            <ul>
                <li>Dynamic&nbsp;warmup</li>
                <li>Plyometric&nbsp;Training</li>
                <li>Running&nbsp;Mechanics</li>
                <li>Sprint&nbsp;conditioning</li>
                <li>Alternate&nbsp;Starts</li>
                <li>Cooldown</li>
            </ul>
            <div class="d-flex session-button-container">
                <div class="ml-auto mr-auto">
                    <button data-id="5" class="btn btn-dark btn-accent" style="min-width: 250px;">Add To Cart</button>
                    <div id="storeCreationLoading" class="angel-linear-loading">
                        <div class="line"></div>
                        <div class="subline inc"></div>
                        <div class="subline dec"></div>
                    </div>
                </div>
            </div>
            <!--
            <p>
                <a href="/contact" class="mx-auto btn btn-success" role="button" aria-pressed="true">Contact&nbsp;Us</a> to begin your journey towards increasing your linear speed with linespeed.
            </p>
    -->
        </div>
    </div>
    <!--Svelte content target. Drawer for the cart from right only.-->
    <?php require "$webroot/_cartTarget.php" ?>
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
    <!--End Quick Action PopUp-->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="/js/base.js"></script>
</body>

</html>