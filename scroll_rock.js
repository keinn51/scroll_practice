// 스크롤 제한 ON
function scroll_on() {
    $('.pc-content').on('scroll touchmove mousewheel', function (e) {
        e.preventDefault();
        e.stopPropagation();
        alert('stop scroll!');
        return false;
    });
}
// 스크롤 제한 OFF
function scroll_off() {
    $('.pc-content').off('scroll touchmove mousewheel');
}

// 스크롤 이벤트를 막기 위한 연구

// 1. 스크롤 방식 (실패)
function scollShow() {
    $(document).on('scroll touchmove mousewheel', function (e) {
        console.log(scrollY)
        if (scrollY > 500) {
            $('.position-box').addClass('fixed-image');
        } else {
            $('.position-box').removeClass('fixed-image');
        }
    });
}

scollShow()


// 2. mouseover 방식 (실패)
// $('body').on('mouseover', function (e) {
//     console.log(scrollY);
//     if (scrollY > 200) alert('200!')
// });

// 3. scrollTop document

// function scrollBanner() {
//     $(document).on('scroll', function () {
//         console.log($(this).scrollTop())
//         var scrollPos = $(this).scrollTop();
//         $('.fade-top').css({
//             'opacity': 1 - (scrollPos / 100)
//         });
//     });
// }

// scrollBanner()