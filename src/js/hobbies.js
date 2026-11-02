const $ = window.jQuery;

export function initHobbies() {
    const $slider = $('.hobbies__slider');
    if (!$slider.length) return;

    $slider.slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.hobbies__arrow--prev'),
        nextArrow: $('.hobbies__arrow--next'),
        dots: false,
        infinite: false,
        autoplay: false,
        speed: 600,
        cssEase: 'linear'
    });
}