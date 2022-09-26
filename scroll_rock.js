

function scollShow() {
    const animationStartScrollY = 500;
    const animationEndScrollY = 2300;
    const sidebarStartScrollY = 1100;
    const imageStartScrollY = 1700;
    const animationIntervalHeight = imageStartScrollY - sidebarStartScrollY
    const slideWidht = 50;

    $(document).on('scroll touchmove mousewheel', function () {
        console.log(scrollY)
        if (scrollY > animationStartScrollY && scrollY < animationEndScrollY) {
            $('.position-box').addClass('fixed-image');
        } else {
            $('.position-box').removeClass('fixed-image');
        }

        if (scrollY >= 2300) {
            $('.position-box').addClass('abosulute-bottom-100');
        } else {
            $('.position-box').removeClass('abosulute-bottom-100');
        }

        $('.sidebar-left').css({ 'opacity': scrollY > sidebarStartScrollY ? (scrollY - sidebarStartScrollY) / animationIntervalHeight : 0 });
        $('.sidebar-top').css({ 'opacity': scrollY > sidebarStartScrollY ? (scrollY - sidebarStartScrollY) / animationIntervalHeight : 0 });
        $('.left-image').css({ 'opacity': scrollY > imageStartScrollY ? (scrollY - imageStartScrollY) / animationIntervalHeight : 0 });
        $('.right-image').css({ 'opacity': scrollY > imageStartScrollY ? (scrollY - imageStartScrollY) / animationIntervalHeight : 0 });

        $('.sidebar-top').css({ 'left': scrollY > sidebarStartScrollY ? scrollY > imageStartScrollY ? -slideWidht : -((scrollY - sidebarStartScrollY) / 12) : 0 });
        $('.sidebar-left').css({ 'top': scrollY > sidebarStartScrollY ? scrollY > imageStartScrollY ? 0 : (animationIntervalHeight - (scrollY - sidebarStartScrollY)) / 12 : slideWidht });
        $('.left-image').css({ 'bottom': scrollY > imageStartScrollY ? scrollY > animationEndScrollY ? -20 : (animationIntervalHeight - (scrollY - imageStartScrollY)) / 12 - 20 : 30 });
        $('.right-image').css({ 'bottom': scrollY > imageStartScrollY ? scrollY > animationEndScrollY ? slideWidht : (scrollY - imageStartScrollY) / 12 : 0 });

    });
}

scollShow()
