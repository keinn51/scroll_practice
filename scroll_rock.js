function setElemSizeWhileScroll() {
    const leftSidebarWidth = document.getElementsByClassName('main-preview-sidebar-left')[0].getBoundingClientRect().width;
    const topSidebarHeight = document.getElementsByClassName('main-preview-sidebar-top')[0].getBoundingClientRect().height;
    const mainImageWidth = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().width;
    const mainImageHeight = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().height;

    $('.main-preview-sidebar-left').css({ 'left': -leftSidebarWidth, 'height': mainImageHeight });
    $('.main-preview-sidebar-top').css({ 'top': -topSidebarHeight, 'width': mainImageWidth + leftSidebarWidth });
    $('.main-preview-contents').css({ 'height': mainImageHeight });
}

function getAppearingOpacityForScroll(startScroll, scrollWidth) {
    if (scrollY > startScroll) return (scrollY - startScroll) / scrollWidth
    else return 0;
}

function setOpacityForElem(animationStartScrollY, animationInterval) {
    const sidebarShowScrollY = animationStartScrollY + animationInterval;
    const imageShowScrollY = animationStartScrollY + (2 * animationInterval);
    $('.main-preview-sidebar-left').css({ 'opacity': getAppearingOpacityForScroll(sidebarShowScrollY, animationInterval) });
    $('.main-preview-sidebar-top').css({ 'opacity': getAppearingOpacityForScroll(sidebarShowScrollY, animationInterval) });
    $('.main-preview-popup-left').css({ 'opacity': getAppearingOpacityForScroll(imageShowScrollY, animationInterval) });
    $('.main-preview-popup-right').css({ 'opacity': getAppearingOpacityForScroll(imageShowScrollY, animationInterval) });
}

function getPositionForScroll(mode, startScroll, endScroll, scrollSize, startPosition) {
    const leftSidebarWidth = document.getElementsByClassName('main-preview-sidebar-left')[0].getBoundingClientRect().width;
    const slideWidth = leftSidebarWidth;
    const processRatio = slideWidth / scrollSize, leaveMode = 1, comeMode = 2;
    const processLength = scrollY - startScroll;

    if (scrollY > endScroll) {
        switch (mode) {
            case leaveMode:
                return startPosition + slideWidth;
            case comeMode:
                return startPosition - slideWidth;;
        }
    }
    else if (scrollY > startScroll) {
        switch (mode) {
            case leaveMode:
                return startPosition + ((processLength) * processRatio);
            case comeMode:
                return startPosition - ((processLength) * processRatio);
        }
    } else startPosition;
}

function setPositionForScroll(animationStartScrollY, animationInterval) {
    const leftSidebarWidth = document.getElementsByClassName('main-preview-sidebar-left')[0].getBoundingClientRect().width;
    const mainImageHeight = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().height;
    const topSidebarHeight = document.getElementsByClassName('main-preview-sidebar-top')[0].getBoundingClientRect().height;
    const sidebarShowScrollY = animationStartScrollY + animationInterval;
    const imageShowScrollY = animationStartScrollY + (2 * animationInterval);
    const animationEndScrollY = animationStartScrollY + (3 * animationInterval);
    const slideWidth = leftSidebarWidth;
    $('.main-preview-sidebar-top').css({ 'left': getPositionForScroll(2, sidebarShowScrollY, imageShowScrollY, animationInterval, 0) });
    $('.main-preview-sidebar-left').css({ 'top': getPositionForScroll(2, sidebarShowScrollY, imageShowScrollY, animationInterval, slideWidth) });
    $('.main-preview-popup-left').css({ 'top': getPositionForScroll(1, imageShowScrollY, animationEndScrollY, animationInterval, mainImageHeight + topSidebarHeight - 270) });
    $('.main-preview-popup-right').css({ 'top': getPositionForScroll(2, imageShowScrollY, animationEndScrollY, animationInterval, 100) });
}


function mainImageScrollShow(animationStartScrollY, animationInterval) {
    $(document).on('scroll touchmove mousewheel', function () {
        setElemSizeWhileScroll()
        setOpacityForElem(animationStartScrollY, animationInterval);
        setPositionForScroll(animationStartScrollY, animationInterval);
    });
}

mainImageScrollShow(300, 600)
