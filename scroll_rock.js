function getSidebarPosition() {
    $(window).resize(
        function () {
            let leftSidebarWidth = document.getElementsByClassName('sidebar-left')[0];
            console.log(leftSidebarWidth.width)
        }
    )
}

getSidebarPosition()

function scollShow() {
    const animationStartScrollY = 500;
    const animationEndScrollY = 2300;
    const sidebarStartScrollY = 1100;
    const imageStartScrollY = 1700;
    const animationIntervalHeight = imageStartScrollY - sidebarStartScrollY
    const slideWidht = 50;

    $(document).on('scroll touchmove mousewheel', function () {
        let leftSidebarWidth = document.getElementsByClassName('sidebar-left')[0].getBoundingClientRect().width;
        let topSidebarHeight = document.getElementsByClassName('sidebar-top')[0].getBoundingClientRect().height;
        let mainImageWidth = document.getElementsByClassName('main-image')[0].getBoundingClientRect().width;
        let mainImageHeight = document.getElementsByClassName('main-image')[0].getBoundingClientRect().height;
        console.log(scrollY)

        $('.sidebar-left').css({ 'left': -leftSidebarWidth, 'height': mainImageHeight });
        $('.sidebar-top').css({ 'top': -topSidebarHeight, 'width': mainImageWidth + leftSidebarWidth });

        if (scrollY > animationStartScrollY && scrollY < animationEndScrollY) {
            $('.position-box').addClass('fixed-image');
        } else {
            $('.position-box').removeClass('fixed-image');
        }

        if (scrollY >= animationEndScrollY) {
            $('.position-box').addClass('abosulute-bottom-100');
        } else {
            $('.position-box').removeClass('abosulute-bottom-100');
        }

        $('.sidebar-left').css({ 'opacity': scrollY > sidebarStartScrollY ? (scrollY - sidebarStartScrollY) / animationIntervalHeight : 0 });
        $('.sidebar-top').css({ 'opacity': scrollY > sidebarStartScrollY ? (scrollY - sidebarStartScrollY) / animationIntervalHeight : 0 });
        $('.left-image').css({ 'opacity': scrollY > imageStartScrollY ? (scrollY - imageStartScrollY) / animationIntervalHeight : 0 });
        $('.right-image').css({ 'opacity': scrollY > imageStartScrollY ? (scrollY - imageStartScrollY) / animationIntervalHeight : 0 });

        $('.sidebar-top').css({ 'left': scrollY > sidebarStartScrollY ? scrollY > imageStartScrollY ? -leftSidebarWidth : -((scrollY - sidebarStartScrollY) * (leftSidebarWidth / animationIntervalHeight)) : 0 });
        $('.sidebar-left').css({ 'top': scrollY > sidebarStartScrollY ? scrollY > imageStartScrollY ? 0 : (animationIntervalHeight - (scrollY - sidebarStartScrollY)) * (topSidebarHeight / animationIntervalHeight) : slideWidht });
        $('.left-image').css({ 'bottom': scrollY > imageStartScrollY ? scrollY > animationEndScrollY ? -75 : (animationIntervalHeight - (scrollY - imageStartScrollY)) * (slideWidht / animationIntervalHeight) - 75 : -25 });
        $('.right-image').css({ 'bottom': scrollY > imageStartScrollY ? scrollY > animationEndScrollY ? slideWidht : (scrollY - imageStartScrollY) * (slideWidht / animationIntervalHeight) : 0 });

    });
}

scollShow()
