<?php
//Required variables by _openHead.php
$webroot = $_SERVER['DOCUMENT_ROOT'];
$HEAD = parse_ini_file("$webroot/head.ini");
$title = "About Us | LineSpeedAPT | Perth Speed Training";
$url = "https://linespeedapt.com/about";
$description = $HEAD["DESCRIPTION"];
$keywords = $HEAD["KEYWORDS"];
$image = $HEAD["IMAGE"];
$SITE_NAME = $HEAD["SITE_NAME"];
require "$webroot/_openHead.php"
?>
<link rel="stylesheet" href="/css/quickAction.css">
<link rel="stylesheet" href="/css/style_v1.0.1.css">
<link rel="stylesheet" href="/training/css/style_v1.0.1.css">
<link rel="stylesheet" href="css/style_v1.0.1.css">
</head>

<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KQSKV8X" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <!-- Populate Navbar -->
    <?php require "$webroot/_navBar.php" ?>
    <div class="container landing training-sessions">
        <div class="content-wrapper">
            <div class="landing-content long-text">
                <h1 class="on-dark">
                    Jacob Wentholt<br><span style="color: #ED0012">Founder</span>
                </h1>
            </div>
        </div>
        <div class="container background-video">
            <img src="/media/my_story_1.jpg" alt="" srcset="">
        </div>
    </div>
    <div class="short-gradient"></div>
    <div class="main about-page">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">My Story</li>
            </ol>
        </nav>
        <h3 class="text-center heading">Family - Faith - Culture - Community</h3>
        <div class="center">
            <p class="text-center mb-1">I am the father of 5 highly active children, Keenan (19yrs), Lennox (12yrs),
                Peytton (10yrs), Bryson (9yrs) and Zoe (7yrs) and husband to a trophy wife Finah</p>
            <div class="short-horizontal-divider"></div>
            <p class="text-center mb-1">I have been passionately coaching youth in various sporting codes such as Rugby
                League, Basketball & Athletics in Perth WA for over 10 years and I am still an active Coach for Butler
                Athletics Club.</p>
            <p class="text-center mb-1">Born and raised in South Auckland NZ amongst my Samoan Catholic family, I was
                heavily involved in various sporting codes throughout my youth. This, combined with an extensive
                employment history serving in leadership roles, led me to Perth WA in 2007 where I was able to evolve
                into a youth coaching machine founded on a values-based approach and building a community culture of
                hard-working athletes.</p>
            <div class="short-horizontal-divider"></div>
            <p class="text-center mb-1">Through observing common differences in youth sports performance across codes, I
                quickly recognised speed and agility to be the most impactful factor affecting success in youth.</p>
            <p class="text-center mb-1">My journey commenced with my fab 5 in 2018 where I stepped down from a
                management role and committed myself to spending more time with family and coaching my kids in strength,
                power and SPEED.</p>
            <p class="text-center mb-1">As we progressed, and successful outcomes were evident as a result of our
                training, I opened up our sessions to our community where Linespeed was created in 2019.</p>
            <p class="text-center mb-1">If I’m training my kids, I might as well bring more on the journey. As they say:
                <span style="color: #ED0012">it takes a village to raise a child</span>.
            </p>
            <p class="text-center mb-1">Being an active sports coach, and continuously growing in knowledge with SAQ and
                applications to sports, Linespeed Athletic Performance Training is my vehicle to engage and educate
                youth athletes in components of speed, longterm athletic development and building a community of sports
                leaders.</p>
            <p class="text-center mb-1">I am blessed to be able to positively impact youth in sports, and in life.</p>
        </div>
        <div class="short-horizontal-divider"></div>
        <h3 class="text-center heading">Coach Credentials/History</h3>
        <div class="d-flex values mx-auto">
            <ul class="list-inline justify-content-center">
                <li>
                    <h5>Little Athletics (2016 - 2020)</h5>
                    <p>Level 1 Community Athletics Coach
                        <br>Ridgewood Centre Coach of the Year 2019/20
                        <br>Butler LAC President 2016 - 2020
                        <br>Butler Head Coach 2016 - 2020
                    </p>
                </li>
                <li>
                    <h5>Basketball Coach</h5>
                    <p>Basketball WA Community Coach
                        <br>Padbury Pumas 2008 - 2012
                        <br><span class="listParent">Phoenix 2016
                            <br><span class="listChild">Joondalup Junior Summer Championship x 2 (2017/18)</span>
                        </span>
                    </p>
                </li>
                <li>
                    <h5>Rugby League Coach</h5>
                    <p>NRLWA IGC Accredited Coach
                        <br><span class="listParent">Joondalup Giants
                            <br><span class="listChild">Juniors - 2008 - 2012</span>
                            <br><span class="listChild">U18s - 2012 (GF Championship)</span>
                        </span>
                        <br><span class="listParent">Alkimos Tigers
                            <br><span class="listChild">Juniors 2016 - 2020</span>
                            <br><span class="listChild">3rd Grade Senior Mens 2019(Grand Finalists)</span>
                            <br><span class="listChild">Harmony 9s Samoa Open Mens WA (RLSWA) - 2018/19</span>
                        </span>
                    </p>
                </li>
                <li>
                    <h5>Supplementary Certificates</h5>
                    <p>IYCA (International Youth Conditioning Association) - Certified Speed and Agility Coach
                        <br>EXOS - XPS Speed Development Certificates
                        <br>Academy of Fitness Australia - Cert 3 in Fitness (Active)
                    </p>
                </li>
        </div>
        <h3 class="text-center heading">Linespeed APT Vision</h3>
        <span class="d-flex"><a href="/about/linespeed/" class="mx-auto btn btn-success" role="button" aria-pressed="true">Learn&nbsp;More</a></span>
        <div class="short-horizontal-divider"></div>
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