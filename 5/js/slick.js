$( document ).ready(function() {
    $('.slider-1').slick({
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        variableWidth: true,
        nextArrow: document.querySelector('.next-1'),
        prevArrow: document.querySelector('.prev-1')
    });

    $('.slider-2').slick({
        arrows: true,
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        variableWidth: true,
        nextArrow: document.querySelector('.next-2'),
        prevArrow: document.querySelector('.prev-2')
    });
  });