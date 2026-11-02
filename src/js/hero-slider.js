const $ = window.jQuery;

function updateCounter($slider, currentSlide) {
    const totalSlides = $slider.slick('getSlick').slideCount;
    const current = String(currentSlide + 1).padStart(2, '0');
    const total = String(totalSlides).padStart(2, '0');
    $('.hero-slider__current').text(current);
    $('.hero-slider__total').text(total);
}

function resetProgressBar($slide) {
    $slide.find('.hero-slider__progress-bar').css('width', '0%');
}

export function initHeroSlider() {
    const $slider = $('.hero-slider__track');
    if (!$slider.length) return;

    $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.hero-slider__arrow--prev'),
        nextArrow: $('.hero-slider__arrow--next'),
        dots: false,
        infinite: true,
        autoplay: false,
        fade: true,
        speed: 600,
        cssEase: 'linear'
    });

    updateCounter($slider, 0);

    $slider.on('beforeChange', function () {
        $('.hero-slider__video').each(function () {
            this.pause();
        });
    });

    $slider.on('afterChange', function (event, slick, currentSlide) {
        updateCounter($(this), currentSlide);

        const $currentSlide = $(slick.$slides[currentSlide]);
        const video = $currentSlide.find('.hero-slider__video')[0];

        if (video) {
            resetProgressBar($currentSlide);
            video.currentTime = 0;

            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    if (error.name === 'AbortError') return; // норма — слайд переключили
                    if (error.name === 'NotAllowedError') {
                        console.warn('Автовоспроизведение заблокировано:', error);
                    } else {
                        console.error('Ошибка видео:', error);
                    }
                });
            }
        }
    });

    $(document).on('timeupdate', '.hero-slider__video', function () {
        const video = this;
        const $slide = $(video).closest('.hero-slider__slide');
        const $bar = $slide.find('.hero-slider__progress-bar');

        if (video.duration > 0) {
            const percent = (video.currentTime / video.duration) * 100;
            $bar.css('width', percent + '%');
        }
    });

    $(document).on('ended', '.hero-slider__video', function () {
        const $activeSlide = $('.hero-slider__track').find('.slick-active');
        const videoInActiveSlide = $activeSlide.find('.hero-slider__video')[0];

        if (this === videoInActiveSlide) {
            $('.hero-slider__track').slick('slickNext');
        }
    });
}