function setElemSizeWhileScroll(leftSidebarWidth, topSidebarHeight) {
    let mainImageWidth = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().width;
    let mainImageHeight = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().height;

    $('.main-preview-sidebar-left').css({ 'left': -leftSidebarWidth, 'height': mainImageHeight });
    $('.main-preview-sidebar-top').css({ 'top': -topSidebarHeight, 'width': mainImageWidth + leftSidebarWidth });
    $('.main-preview-contents').css({ 'height': mainImageHeight });
}

function setClassWhileScroll(animationStartScrollY, animationEndScrollY) {
    if (scrollY > animationStartScrollY && scrollY < animationEndScrollY)
        $('.main-preview-contents').addClass('fixed-image');
    else
        $('.main-preview-contents').removeClass('fixed-image');

    if (scrollY >= animationEndScrollY)
        $('.main-preview-contents').addClass('abosulute-bottom-100');
    else
        $('.main-preview-contents').removeClass('abosulute-bottom-100');
}

function getAppearingOpacityForScroll(startScroll, scrollWidth) {
    if (scrollY > startScroll) return (scrollY - startScroll) / scrollWidth
    else return 0
}

function setOpacityForElem(sidebarStartScrollY, imageStartScrollY) {
    const animationIntervalHeight = imageStartScrollY - sidebarStartScrollY;
    $('.main-preview-sidebar-left').css({ 'opacity': getAppearingOpacityForScroll(sidebarStartScrollY, animationIntervalHeight) });
    $('.main-preview-sidebar-top').css({ 'opacity': getAppearingOpacityForScroll(sidebarStartScrollY, animationIntervalHeight) });
    $('.main-preview-popup-left').css({ 'opacity': getAppearingOpacityForScroll(imageStartScrollY, animationIntervalHeight) });
    $('.main-preview-popup-right').css({ 'opacity': getAppearingOpacityForScroll(imageStartScrollY, animationIntervalHeight) });
}


function getPositionForScroll(mode, startScroll, endScroll, scrollSize, startPosition) {
    const leftSidebarWidth = document.getElementsByClassName('main-preview-sidebar-left')[0].getBoundingClientRect().width;
    const slideWidth = leftSidebarWidth;
    const processRatio = slideWidth / scrollSize, leaveMode = 1, comeMode = 2;
    const processLength = scrollY - startScroll;

    if (scrollY > endScroll) return startPosition - slideWidth;
    else if (scrollY > startScroll) {
        switch (mode) {
            case leaveMode:
                return startPosition + ((processLength) * processRatio);
            case comeMode:
                return startPosition - ((processLength) * processRatio);
        }
    } else startPosition
}

function setPositionForScroll(sidebarStartScrollY, imageStartScrollY, animationEndScrollY, animationIntervalHeight) {
    const leftSidebarWidth = document.getElementsByClassName('main-preview-sidebar-left')[0].getBoundingClientRect().width;
    const mainImageHeight = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().height;
    const topSidebarHeight = document.getElementsByClassName('main-preview-sidebar-top')[0].getBoundingClientRect().height;
    const slideWidth = leftSidebarWidth;
    $('.main-preview-sidebar-top').css({ 'left': getPositionForScroll(2, sidebarStartScrollY, imageStartScrollY, animationIntervalHeight, 0) });
    $('.main-preview-sidebar-left').css({ 'top': getPositionForScroll(2, sidebarStartScrollY, imageStartScrollY, animationIntervalHeight, slideWidth) });
    $('.main-preview-popup-left').css({ 'top': getPositionForScroll(1, imageStartScrollY, animationEndScrollY, animationIntervalHeight, mainImageHeight + topSidebarHeight - 270) });
    $('.main-preview-popup-right').css({ 'top': getPositionForScroll(2, imageStartScrollY, animationEndScrollY, animationIntervalHeight, 100) });
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

        setElemSizeWhileScroll(leftSidebarWidth, topSidebarHeight);
        setClassWhileScroll(animationStartScrollY, animationEndScrollY);
        setOpacityForElem(sidebarStartScrollY, imageStartScrollY);
        setPositionForScroll(sidebarStartScrollY, imageStartScrollY, animationEndScrollY, animationIntervalHeight)
    });
}

scollShow()
