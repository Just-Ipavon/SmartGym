
$(window).load(function () {
// Animate loader off screen
    $("#loader-wrapper").fadeOut("slow");
    ;
});

//$(document).ready(function () {
//    $('.ripple-effect').ripples({
//        resolution: 512,
//        dropRadius: 20,
//        perturbance: 0.04
//    });
//
//// Automatic drops
//    setInterval(function () {
//        var $el = $('.ripple-effect');
//        var x = Math.random() * $el.outerWidth();
//        var y = Math.random() * $el.outerHeight();
//        var dropRadius = 20;
//        var strength = 0.04 + Math.random() * 0.04;
//
//        $el.ripples('drop', x, y, dropRadius, strength);
//    }, 400);
//});

$(document).ready(function () {
    jQuery(".hover").mouseleave(
            function () {
                jQuery(this).removeClass("hover");
            }
    );
});

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
    $('#back-to-top').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });
});

