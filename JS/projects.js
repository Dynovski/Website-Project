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


// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up');
        }
    }
    
    lastScrollTop = st;
}