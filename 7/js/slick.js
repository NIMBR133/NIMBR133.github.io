$(document).ready(function () {
    $('.slider__wrapper').slick({
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        nextArrow: document.querySelector('.arrow-right'),
        prevArrow: document.querySelector('.arrow-left')
    });
});