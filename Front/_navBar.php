<?php $NO_NAV_BAR = array("/checkout/index.php");
if (in_array($_SERVER["SCRIPT_NAME"], $NO_NAV_BAR)) {
    //nothing
} else { ?>
    <div id="topNavBar" class="container top-nav-wrapper top-nav-collapse">
        <nav class="navbar navbar-expand-sm navbar-dark">
            <a class="navbar-brand mr-auto" href="/"><img id="logo" src="/media/logo.svg" alt="Linespeed Logo" srcset=""></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExample03">
                <ul class="navbar-nav ml-auto">
                    <li id="cartIcon" class="nav-item" aria-label="Open Cart">
                        <img src="/media/shopping-cart.svg" alt="" srcset="">
                    </li>
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
                    <li id="training-link" class="nav-item">
                        <a class="nav-link" href="/training">Sessions</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
<?php } ?>