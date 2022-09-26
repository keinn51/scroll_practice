

function scollShow() {
    const animationStartScrollY = 500;
    const animationEndScrollY = 2300;
    const sidebarStartScrollY = 1300;
    const imageStartScrollY = 1800;
    const animationIntervalHeight = imageStartScrollY - sidebarStartScrollY

    $(document).on('scroll touchmove mousewheel', function (e) {
        console.log(scrollY)
        if (scrollY > 500 && scrollY < 2300) {
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

        $('.sidebar-top').css({ 'left': scrollY > sidebarStartScrollY ? scrollY > imageStartScrollY ? -50 : -((scrollY - sidebarStartScrollY) / 10) : 0 });
        $('.sidebar-left').css({ 'top': scrollY > sidebarStartScrollY ? scrollY > imageStartScrollY ? 0 : (500 - (scrollY - sidebarStartScrollY)) / 10 : 50 });
        $('.left-image').css({ 'opacity': scrollY > imageStartScrollY ? (scrollY - imageStartScrollY) / animationIntervalHeight : 0 });
        $('.right-image').css({ 'opacity': scrollY > imageStartScrollY ? (scrollY - imageStartScrollY) / animationIntervalHeight : 0 });

    });
}

scollShow()
