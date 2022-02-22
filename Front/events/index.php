<?php
//Required variables by _openHead.php
$webroot = $_SERVER['DOCUMENT_ROOT'];
$HEAD = parse_ini_file("$webroot/head.ini");
$title = "Events | LineSpeedAPT | Perth Speed Training";
$description = $HEAD["DESCRIPTION"];
$keywords = $HEAD["KEYWORDS"] . "Programs, Speed Training Programs";

$image = $HEAD["IMAGE"];
$SITE_NAME = $HEAD["SITE_NAME"];
require "$webroot/_openHead.php"
?>
<link rel="stylesheet" href="/css/quickAction.css">
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/training/css/style.css">
<link rel="stylesheet" href="/css/events.css">
<link rel="stylesheet" href="css/style_v1.0.0.css">
</head>

<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KQSKV8X" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- Populate Navbar -->
    <?php require "$webroot/_navBar.php" ?>
    <div class="container landing training-sessions">
        <div class="content-wrapper">
            <div class="landing-content">
                <h1 class="on-dark">
                    <span style="color: #ED0012">Events</span>
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
            <img src="/media/1.jpg" alt="" srcset="">
        </div>
    </div>
    <div class="short-gradient"></div>
    <div class="main about-page">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Events</li>
            </ol>
        </nav>
        <div id="events" class="events">
            <h2 class="events-title text-center"><span>COMING UP</span></h2>
            <div class="events-toggle-frame-container">
                <div class="events-toggle-frame">
                    <div data-collapsed="false" class="events-toggle-accordion active">
                        <label class="switch">
                            <input type="checkbox" id="switchBtn">
                            <span class="slider round"></span>
                        </label>
                        <h5 class="events-toggle-accordion-title align-middle">Speed Training | Holiday Program</h5>
                    </div><div class="events-toggle-content">
                        <div class="block">
                            <a href="/media/dec/1.jpg" target="_blank">
                                <img src="/media/dec/1.jpg" alt="" srcset="">
                            </a>
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
                        <h5 class="events-toggle-accordion-title align-middle">SAQ Training | Holiday Program</h5>
                    </div><div class="events-toggle-content">
                        <div class="block">
                            <a href="/media/dec/2.jpg" target="_blank">
                                <img src="/media/dec/2.jpg" alt="" srcset="">
                            </a>
                            <!--
                            <p>
                               We will be conducting a holiday programme during the school holidays in October (5th - 9th). The programme will be challenging but baalanced and will aim to keep the children active and motivated and provide team building skills and mentorship
                            </p>
                            -->
                        </div>
                    </div>
                </div>
                <div class="events-toggle-frame">
                    <div data-collapsed="true" class="events-toggle-accordion">
                        <label class="switch">
                            <input type="checkbox" id="switchBtn">
                            <span class="slider round"></span>
                        </label>
                        <h5 class="events-toggle-accordion-title align-middle">Agility Training | Holiday Program</h5>
                    </div><div class="events-toggle-content">
                        <div class="block">
                            <a href="/media/dec/3.jpg" target="_blank">
                                <img src="/media/dec/3.jpg" alt="" srcset="">
                            </a>
                            <!--
                            <p>
                               We will be conducting a holiday programme during the school holidays in October (5th - 9th). The programme will be challenging but baalanced and will aim to keep the children active and motivated and provide team building skills and mentorship
                            </p>
                            -->
                        </div>
                    </div>
                </div>
                <div class="events-toggle-frame">
                    <div data-collapsed="true" class="events-toggle-accordion">
                        <label class="switch">
                            <input type="checkbox" id="switchBtn">
                            <span class="slider round"></span>
                        </label>
                        <h5 class="events-toggle-accordion-title align-middle">Basketball SAQ | Holiday Program</h5>
                    </div><div class="events-toggle-content">
                        <div class="block">
                            <a href="/media/dec/4.jpg" target="_blank">
                                <img src="/media/dec/4.jpg" alt="" srcset="">
                            </a>
                            <!--
                            <p>
                               We will be conducting a holiday programme during the school holidays in October (5th - 9th). The programme will be challenging but baalanced and will aim to keep the children active and motivated and provide team building skills and mentorship
                            </p>
                            -->
                        </div>
                    </div>
                </div>
                <div class="events-toggle-frame">
                    <div data-collapsed="true" class="events-toggle-accordion">
                        <label class="switch">
                            <input type="checkbox" id="switchBtn">
                            <span class="slider round"></span>
                        </label>
                        <h5 class="events-toggle-accordion-title align-middle">Netball SAQ | Holiday Program</h5>
                    </div><div class="events-toggle-content">
                        <div class="block">
                            <a href="/media/dec/5.jpg" target="_blank">
                                <img src="/media/dec/5.jpg" alt="" srcset="">
                            </a>
                            <!--
                            <p>
                               We will be conducting a holiday programme during the school holidays in October (5th - 9th). The programme will be challenging but baalanced and will aim to keep the children active and motivated and provide team building skills and mentorship
                            </p>
                            -->
                        </div>
                    </div>
                </div>
                <div class="events-toggle-frame">
                    <div data-collapsed="true" class="events-toggle-accordion">
                        <label class="switch">
                            <input type="checkbox" id="switchBtn">
                            <span class="slider round"></span>
                        </label>
                        <h5 class="events-toggle-accordion-title align-middle">Field Agility | Holiday Program</h5>
                    </div><div class="events-toggle-content">
                        <div class="block">
                            <a href="/media/dec/6.jpg" target="_blank">
                                <img src="/media/dec/6.jpg" alt="" srcset="">
                            </a>
                            <!--
                            <p>
                               We will be conducting a holiday programme during the school holidays in October (5th - 9th). The programme will be challenging but baalanced and will aim to keep the children active and motivated and provide team building skills and mentorship
                            </p>
                            -->
                        </div>
                    </div>
                </div>
                <div class="events-toggle-frame">
                    <div data-collapsed="true" class="events-toggle-accordion">
                        <label class="switch">
                            <input type="checkbox" id="switchBtn">
                            <span class="slider round"></span>
                        </label>
                        <h5 class="events-toggle-accordion-title align-middle">Senior Speed Training | Holiday Program</h5>
                    </div><div class="events-toggle-content">
                        <div class="block">
                            <a href="/media/dec/7.jpg" target="_blank">
                                <img src="/media/dec/7.jpg" alt="" srcset="">
                            </a>
                            <!--
                            <p>
                               We will be conducting a holiday programme during the school holidays in October (5th - 9th). The programme will be challenging but baalanced and will aim to keep the children active and motivated and provide team building skills and mentorship
                            </p>
                            -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="short-horizontal-divider" style="display: block"></div>
        <div class="events-partners">
            <h2 class="events-title text-center" style="text-transform: none;">Partners</h5>
                <div class="events-partners-logo">
                    <img src="/media/butler_boomers.jpg" alt="Butler Boomers, Partner">
                    <img src="/media/alkimos_club.jpg" alt="Alkimos Surf Life Saving Club, Partner">
                    <img src="/media/alkimos_tigers.jpg" alt="Alkimos Tigers Rugby Club, Partner">
                    <img src="/media/alkimos_titans.jpg" alt="Alkimos Titans Baseball Club, Partner">
                    <img src="/media/north_coast_rufc.png" alt="North Coast RUFC, Partner">
                </div>
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
            <p>'Start FAST, Finish STRONG'</p>
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