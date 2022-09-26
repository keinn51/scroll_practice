function getAppearingOpacityByScroll(startScroll, scrollWidth) {
    if (scrollY > startScroll) return (scrollY - startScroll) / scrollWidth
    else return 0
}

function getPositionByScroll(startScroll, scrollWidth,) {

}

function scollShow() {
    const animationStartScrollY = 500;
    const animationEndScrollY = 2300;
    const sidebarStartScrollY = 1100;
    const imageStartScrollY = 1700;
    const animationIntervalHeight = imageStartScrollY - sidebarStartScrollY

    $(document).on('scroll touchmove mousewheel', function () {
        let leftSidebarWidth = document.getElementsByClassName('main-preview-sidebar-left')[0].getBoundingClientRect().width;
        let topSidebarHeight = document.getElementsByClassName('main-preview-sidebar-top')[0].getBoundingClientRect().height;
        let mainImageWidth = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().width;
        let mainImageHeight = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().height;
        let slideWidht = leftSidebarWidth;
        console.log(scrollY)
        $('.main-preview-sidebar-left').css({ 'left': -leftSidebarWidth, 'height': mainImageHeight });
        $('.main-preview-sidebar-top').css({ 'top': -topSidebarHeight, 'width': mainImageWidth + leftSidebarWidth });
        $('.main-preview-contents').css({ 'height': mainImageHeight });

        if (scrollY > animationStartScrollY && scrollY < animationEndScrollY) {
            $('.main-preview-contents').addClass('fixed-image');
        } else {
            $('.main-preview-contents').removeClass('fixed-image');
        }

        if (scrollY >= animationEndScrollY) {
            $('.main-preview-contents').addClass('abosulute-bottom-100');
        } else {
            $('.main-preview-contents').removeClass('abosulute-bottom-100');
        }

        $('.main-preview-sidebar-left').css({ 'opacity': getAppearingOpacityByScroll(sidebarStartScrollY, animationIntervalHeight) });
        $('.main-preview-sidebar-top').css({ 'opacity': getAppearingOpacityByScroll(sidebarStartScrollY, animationIntervalHeight) });
        $('.main-preview-popup-left').css({ 'opacity': getAppearingOpacityByScroll(imageStartScrollY, animationIntervalHeight) });
        $('.main-preview-popup-right').css({ 'opacity': getAppearingOpacityByScroll(imageStartScrollY, animationIntervalHeight) });

        $('.main-preview-sidebar-top').css({ 'left': scrollY > sidebarStartScrollY ? scrollY > imageStartScrollY ? -slideWidht : -((scrollY - sidebarStartScrollY) * (leftSidebarWidth / animationIntervalHeight)) : 0 });
        $('.main-preview-sidebar-left').css({ 'top': scrollY > sidebarStartScrollY ? scrollY > imageStartScrollY ? 0 : (animationIntervalHeight - (scrollY - sidebarStartScrollY)) * (topSidebarHeight / animationIntervalHeight) : slideWidht });
        $('.main-preview-popup-left').css({ 'bottom': scrollY > imageStartScrollY ? scrollY > animationEndScrollY ? -(25 + slideWidht) : (animationIntervalHeight - (scrollY - imageStartScrollY)) * (slideWidht / animationIntervalHeight) - (25 + slideWidht) : -25 });
        $('.main-preview-popup-right').css({ 'bottom': scrollY > imageStartScrollY ? scrollY > animationEndScrollY ? slideWidht : (scrollY - imageStartScrollY) * (slideWidht / animationIntervalHeight) : 0 });

    });
}

scollShow()
