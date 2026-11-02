const $ = window.jQuery;

export function initArticles() {
    const $slider = $('.articles__slider');
    if (!$slider.length) return;

    $slider.slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.articles__arrow--prev'),
        nextArrow: $('.articles__arrow--next'),
        dots: false,
        infinite: false,
        autoplay: false,
        fade: false,
        speed: 600,
        cssEase: 'linear'
    });
}