function mainImageScroll(animationStartScrollY, animationInterval) {
    const $mainPreview = $('.main-preview')
    const $mainContent = $('.main-preview-contents')
    const $sideBarLeft = $('.main-preview-sidebar-left')
    const $sideBarTop = $('.main-preview-sidebar-top')
    const $popupLeft = $('.main-preview-popup-left')
    const $popupRight = $('.main-preview-popup-right')
    const $target = $('.main-preview-target')

    function setElemSizeForMainImage() {
        let leftSidebarWidth, topSidebarHeight;
        const mainImageWidth = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().width;
        const mainImageHeight = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().height;

        $mainContent.css({ 'height': mainImageHeight });
        $mainPreview.css({ 'height': 2.5 * mainImageWidth })
        $sideBarLeft.css({ 'height': mainImageHeight });
        leftSidebarWidth = document.getElementsByClassName('main-preview-sidebar-left')[0].getBoundingClientRect().width;
        $sideBarLeft.css({ 'left': -leftSidebarWidth });
        $sideBarTop.css({ 'width': mainImageWidth + leftSidebarWidth });
        topSidebarHeight = document.getElementsByClassName('main-preview-sidebar-top')[0].getBoundingClientRect().height;
        $sideBarTop.css({ 'top': -topSidebarHeight });
        $popupLeft.css({ 'width': mainImageWidth * (200 / 1000), 'left': -(mainImageWidth * (175 / 1000)) })
        $popupRight.css({ 'width': mainImageWidth * (200 / 1000), 'right': -(mainImageWidth * (140 / 1000)) })
        $target.css({ 'width': mainImageWidth * (380 / 1000), 'top': mainImageWidth * (172 / 1000), 'right': mainImageWidth * (100 / 1000) })
    }

    function setMainImagePosition() {
        const mainImageHeight = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().height;
        const topSidebarHeight = document.getElementsByClassName('main-preview-sidebar-top')[0].getBoundingClientRect().height;

        $mainContent.css({ 'top': (window.innerHeight - (mainImageHeight + topSidebarHeight)) / 2 })
    }

    function getAppearingOpacityForScroll(startScroll, scrollWidth) {
        if (scrollY > startScroll) return (scrollY - startScroll) / scrollWidth
        else return 0;
    }

    function setOpacityForElem(animationStartScrollY, animationInterval) {
        const sidebarShowScrollY = animationStartScrollY + animationInterval;
        const imageShowScrollY = animationStartScrollY + (2 * animationInterval);
        $sideBarLeft.css({ 'opacity': getAppearingOpacityForScroll(sidebarShowScrollY, animationInterval) });
        $sideBarTop.css({ 'opacity': getAppearingOpacityForScroll(sidebarShowScrollY, animationInterval) });
        $popupLeft.css({ 'opacity': getAppearingOpacityForScroll(imageShowScrollY, animationInterval) });
        $popupRight.css({ 'opacity': getAppearingOpacityForScroll(imageShowScrollY, animationInterval) });
        $target.css({ 'opacity': getAppearingOpacityForScroll(imageShowScrollY, animationInterval) });
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
        } else return startPosition;
    }

    function setPositionForScroll(animationStartScrollY, animationInterval) {
        const leftSidebarWidth = document.getElementsByClassName('main-preview-sidebar-left')[0].getBoundingClientRect().width;
        const mainImageHeight = document.getElementsByClassName('main-preview-image')[0].getBoundingClientRect().height;
        const topSidebarHeight = document.getElementsByClassName('main-preview-sidebar-top')[0].getBoundingClientRect().height;
        const sidebarShowScrollY = animationStartScrollY + animationInterval;
        const imageShowScrollY = animationStartScrollY + (2 * animationInterval);
        const animationEndScrollY = animationStartScrollY + (3 * animationInterval);
        const slideWidth = leftSidebarWidth;
        $sideBarTop.css({ 'left': getPositionForScroll(2, sidebarShowScrollY, imageShowScrollY, animationInterval, 0) });
        $sideBarLeft.css({ 'top': getPositionForScroll(2, sidebarShowScrollY, imageShowScrollY, animationInterval, slideWidth) });
        $popupLeft.css({ 'top': getPositionForScroll(1, imageShowScrollY, animationEndScrollY, animationInterval, mainImageHeight + topSidebarHeight - 270) });
        $popupRight.css({ 'top': getPositionForScroll(2, imageShowScrollY, animationEndScrollY, animationInterval, 100) });
    }


    function mainImageScrollShow(animationStartScrollY, animationInterval) {
        $(setElemSizeForMainImage);
        $(setMainImagePosition);
        $(window).resize(function () {
            setElemSizeForMainImage();
            setMainImagePosition();
        });
        $(document).on('scroll touchmove mousewheel', function () {
            setOpacityForElem(animationStartScrollY, animationInterval);
            setPositionForScroll(animationStartScrollY, animationInterval);
        });
    }
    mainImageScrollShow(animationStartScrollY, animationInterval)
}

mainImageScroll(300, 600)