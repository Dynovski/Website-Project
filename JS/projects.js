// show alert after page load
window.onload = () => {
    window.alert("Onload event: Page has been successfully loaded!");
};

// Make card bigger when mouse enters card
document.getElementById("first-project").onmouseover = () => {
    document.getElementById("first-project").style.width = "70rem";
}

// Make card smaller when mouse leaves card
document.getElementById("first-project").onmouseout = () => {
    document.getElementById("first-project").style.width = "28rem";
}


// Hide Header on on scroll down using jQuery
var didScroll;
var previousDistanceFromTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event) {
    didScroll = true;
});

setInterval(function() {
    if(didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    /* The vertical scroll position is the same as the number of pixels that are hidden from view 
    above the scrollable area */
    var distanceFromTop = $(this).scrollTop();
    
    // Scroll must be more than delta to be noticed
    if(Math.abs(previousDistanceFromTop - distanceFromTop) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    if (distanceFromTop > previousDistanceFromTop && distanceFromTop > navbarHeight){
        // Scroll Down
        $('header').addClass('nav-up');
    } else {
        // Scroll Up
        // If did not scroll past the document (possible on mac)
        if(distanceFromTop + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up');
        }
    }
    
    previousDistanceFromTop = distanceFromTop;
}