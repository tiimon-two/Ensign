const $ = window.jQuery;

export function initPartners() {
    const $slider = $('.partners__slider');
    if (!$slider.length) return;

    $slider.slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.partners__arrow--prev'),
        nextArrow: $('.partners__arrow--next'),
        dots: false,
        infinite: false,
        autoplay: false,
        speed: 600,
        cssEase: 'linear',
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 760,  settings: { slidesToShow: 2 } }
        ]
    });
}