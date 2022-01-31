<?php
//Required variables by _openHead.php
$webroot = $_SERVER['DOCUMENT_ROOT'];
$HEAD = parse_ini_file("$webroot/head.ini");
$title = "About LineSpeedAPT | Perth Speed Training";
$url = "https://linespeedapt.com";
$description = $HEAD["DESCRIPTION"];
$keywords = $HEAD["KEYWORDS"] . "Information";
$image = $HEAD["IMAGE"];
$SITE_NAME = $HEAD["SITE_NAME"];
require "$webroot/_openHead.php"
?>
<link rel="stylesheet" href="/css/quickAction.css">
<link rel="stylesheet" href="/css/style_v1.0.1.css">
<link rel="stylesheet" href="/training/css/style_v1.0.1.css">
<link rel="stylesheet" href="../css/style_v1.0.1.css">
</head>

<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KQSKV8X" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <!-- Populate Navbar -->
    <?php require "$webroot/_navBar.php" ?>
    <div class="container landing training-list">
        <div class="content-wrapper">
            <div class="landing-content">
                <h1 class="on-dark">
                    Line<span style="color: #ED0012">Speed</span>
                    <!--Improve Linear Speed and Athletic Performance-->
                </h1>
                <p class="on-dark p-large">
                    Better <span style="color: #ED0012">PEOPLE</span> make better <span style="color: #ED0012">ATHLETES</span>
                </p>
            </div>
        </div>
        <div class="container background-video">
            <img src="/media/vision.jpg" alt="" srcset="">
        </div>
    </div>
    <div class="short-gradient"></div>
    <div class="main about-page">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item"><a href="/">About</a></li>
                <li class="breadcrumb-item active" aria-current="page">LineSpeedAPT</li>
            </ol>
        </nav>
        <div class="d-flex values intro mx-auto">
            <p class="text-center mb-1">Linespeed strives to build strong <strong>VALUES</strong> based athletes who
                perform sports well.</p>
            <p class="text-center mb-1">Our Linespeed <strong>AFFIRMATIONS</strong> and <strong>ATTRIBUTES</strong> are
                a key component to our Sport Psychology practice that assists our athletes to achieve their full
                potential.</p>
            <p class="text-center mb-1"> Linespeed endeavors to embed these practices into everything we do. This is our
                <strong>IDENTITY</strong>
            </p>
        </div>
        <div class="short-horizontal-divider"></div>
        <h3 class="text-center heading">Mission</h3>
        <p class="text-center mb-1">Develop a CULTURE that encourages athletes to strive for EXCELLENCE in sport, and in
            life.</p>
        <div class="short-horizontal-divider"></div>
        <!--
        <h3 class="text-center heading">Attributes</h3>
        <div class="d-flex values mx-auto">
            <ul class="list-inline justify-content-center">
                <li><h5 class="text-center">Determination</h5><p class="text-center">Believing in yourself to continue to do the best you can even if things are difficult. Making or arriving at a decision with purpose.</p></li>
                <li><h5 class="text-center">Respect</h5><p class="text-center">Being fair, knowing your limits whilst taking care of yourself and others around you. Respect denotes both a positive feeling of esteem for another person and also specific actions and conduct representative of that esteem.</p></li>
                <li><h5 class="text-center">Courage</h5><p class="text-center">Being brave and confident enough to do what you believe is right. Courage is the ability to confront fear, pain, risk/danger, uncertainty or intimidation. “Moral courage” is the ability to act rightly in the face of popular opposition, shame, scandal, or discouragement.</p></li>
                <li><h5 class="text-center">Friendship</h5><p class="text-center">Understanding each other although there may be differences. Values that are found in friendships are often a result of a friend demonstrating the following on a consistent basis: sympathy, empath, honesty, mutual understanding, compassion, trust.</p></li>
            </ul>
        </div>
        <div class="short-horizontal-divider"></div>-->
        <h3 class="text-center heading">LAPT Affirmations</h3>
        <div class="d-flex values mx-auto">
            <ul class="list-inline justify-content-center">
                <li>
                    <h5 class="text-center">I am GRATEFUL</h5>
                    <p class="text-center">Appreciating and being thankful for NOW. Being grateful for the opportunity
                        to train, to be able to improve your skill, for being amongst like minded athletes who strive to
                        be better.</p>
                </li>
                <li>
                    <h5 class="text-center">SELF BELIEF is my power</h5>
                    <p class="text-center">To believe in nothing else, except that you will get BETTER. With every
                        training you partake, focus on improving one thing at a time. No matter how slow or small you
                        improve, progress is progress. Which leads to success.</p>
                </li>
                <li>
                    <h5 class="text-center">I INSPIRE others</h5>
                    <p class="text-center">Find your why. Someone that inspires you to be better, to be great.
                        <br>Then in chasing that greatness, while your striving towards your goals, someone is watching
                        you, at games, at training, then in turn, you INSPIRE them.
                        <br>You have power to EMPOWER others through your actions.
                    </p>
                </li>
                <li>
                    <h5 class="text-center">I live EXCELLENCE</h5>
                    <p class="text-center">Accept nothing but your BEST. In everything you do, warm up, Cool down,
                        prepping for training the day before, making your bed. It all matters. Put your best to
                        everything you do, and you will be successful, win or LEARN, the journey</p>
                </li>
            </ul>
        </div>
        <div class="short-horizontal-divider"></div>
        <h3 class="text-center heading">Linespeed Attributes</h3>
        <div class="d-flex values mx-auto">
            <ul class="list-inline justify-content-center">
                <li>
                    <h5 class="text-center">Attitude</h5>
                    <p class="text-center">Your attitude determines your direction. A positive attitude is your edge.
                    </p>
                </li>
                <li>
                    <h5 class="text-center">Work Ethic</h5>
                    <p class="text-center">Hard work beats talent when talent does not work hard.
                        <br>Successful athletes are always working hard to be their best...everyday.
                    </p>
                </li>
                <li>
                    <h5 class="text-center">Compete</h5>
                    <p class="text-center">Challenging yourself to always achieve.
                        <br>'Winning isnt everything, but wanting to is'.
                    </p>
                </li>
                <li>
                    <h5 class="text-center">Sacrifice</h5>
                    <p class="text-center">All elite athletes have succeeded through their CHOICES.
                        <br>Nutrition, sleep, training, research... skin in the game.
                        <br>Staying up late watching TV or getting that sleep in.
                        <br>Eating takeout or consuming proper nutrition for performance.
                        <br>Your CHOICE, your FUTURE.
                    </p>
                </li>
                <li>
                    <h5 class="text-center">Embrace</h5>
                    <p class="text-center">learn to love the process.
                        Success is in the practise, not the outcome.
                        Appreciate the environment of pushing yourself to grow everyday.</p>
                </li>
            </ul>
        </div>
        <div class="short-horizontal-divider"></div>
        <div class="d-flex values intro mx-auto">
            <p class="text-center mb-1">
                <span style="color: #ED0012">'Proper Preparation Prevents Poor Performance'</span><br>
                <a href="/contact" class="mx-auto btn btn-success" role="button" aria-pressed="true">Contact Us</a> to
                begin your journey towards your full potential.
            </p>
        </div>
        <div class="short-horizontal-divider"></div>
        <!--
        <div class="short-horizontal-divider"></div>
        <h3 class="text-center heading">Long Term Athletic Development (LTAD)</h3>
        <div class="ltad-wrap">
            <div class="ltad">
                <p>LAPT strives to work within the LTAD model to enable the athlete the best chance of athletic success. 
                    <img class="alignleft" src="img/LTAD.png" alt="Long Term Athletic Development Infographic" srcset="">
                </p>
                <p>Progressive development framework on what’s best for the participant through their athletic life, systematic approach to reach their full potential, increase physical longevity in their sporting career.</p>
                <p>LAPT endeavours to focus session planning according to 3 groups: <br>-<span class="small-list" style="color:#ED0012">Foundation</span> <br>-<span class="small-list" style="color:#ED0012">Development</span> <br>-<span class="small-list" style="color:#ED0012">Performance</span> <br></p>
                <p>As LAPT grows, sessions will become split specifically for the 3 groups, to engage lifelong, health-enhancing physical activity.</p>
            </div>
        </div>
                -->
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
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="/js/base.js"></script>

</body>

</html>