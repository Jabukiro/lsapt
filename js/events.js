function getHeight (element) {
    element.style.maxHeight="none";
    height = element.getBoundingClientRect().height;
    element.style.maxHeight="0px";
    return height;
}
document.querySelectorAll(".events-toggle-accordion").forEach(toggle => {
    toggle.addEventListener("click", (e) => {
        console.log("Events toggle fired on element: .", e.currentTarget)
        if (e.currentTarget.dataset.collapsed == "true"){
            console.log("Events toggle click on collapsed element.")
            currentlyActive = document.getElementsByClassName("events-toggle-accordion active")[0];
            currentlyActiveContent = currentlyActive.nextSibling;
            currentTargetContent = e.currentTarget.nextSibling;
            height = getHeight(currentTargetContent);
            //currentTargetContent.style.maxHeight="0px";
            e.currentTarget.classList.add("active");
            setTimeout(function() {
                currentTargetContent.style.maxHeight=String(height)+"px";
            }, 1);
            currentlyActive.classList.remove("active");
            currentlyActiveContent.style.maxHeight="0px";
            e.currentTarget.setAttribute("data-collapsed", "false");
            currentlyActive.setAttribute("data-collapsed", "true");
        } else {
            console.log("Events toggle click on non-collapsed element.")
            // Do nothing
        }
    })
});
toDisplay = document.getElementsByClassName("events-toggle-accordion active")[0].nextSibling;
height = getHeight(toDisplay);
toDisplay.style.maxHeight=String(height)+"px";
    /*
(function ($) {
    /*
        jquery.slide-transition plug-in

        Requirements:
        -------------
        You'll need to define these two styles to make this work:

        .height-transition {
            -webkit-transition: max-height 0.5s ease-in-out;
            -moz-transition: max-height 0.5s ease-in-out;
            -o-transition: max-height 0.5s ease-in-out;
            transition: max-height 0.5s ease-in-out;
            overflow-y: hidden;            
        }
        .height-transition-hidden {            
            max-height: 0;            
        }

        You need to wrap your actual content that you
        plan to slide up and down into a container. This
        container has to have a class of height-transition
        and optionally height-transition-hidden to initially
        hide the container (collapsed).
        <div id="SlideContainer" 
                class="height-transition height-transition-hidden">
            <div id="Actual">
                Your actual content to slide up or down goes here
            </div>
        </div>

        To call it:
        -----------
        var $sw = $("#SlideWrapper");

        if (!$sw.hasClass("height-transition-hidden"))
            $sw.slideUpTransition();                      
        else 
            $sw.slideDownTransition();
    $.fn.slideUpTransition = function() {
        return this.each(function() {
            var $el = $(this);
            $el.css("max-height", "0");
            $el.addClass("height-transition-hidden");
                    
        });
    };

    $.fn.slideDownTransition = function() {
        return this.each(function() {
            var $el = $(this);
            $el.removeClass("height-transition-hidden");

            // temporarily make visible to get the size
            $el.css("max-height", "none");
            var height = $el.outerHeight();

            // reset to 0 then animate with small delay
            $el.css("max-height", "0");

            setTimeout(function() {
                $el.css({
                    "max-height": height
                });
            }, 1);
        });
    };
})(jQuery);
*/