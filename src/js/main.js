$(function() {
    const $slider = $('.hero-slider__track');

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
});


function updateCounter($slider, currentSlide) {
    const totalSlides = $slider.slick('getSlick').slideCount;
    const current = String(currentSlide + 1).padStart(2, '0');
    const total = String(totalSlides).padStart(2, '0');
    $('.hero-slider__current').text(current);
    $('.hero-slider__total').text(total);
}

$('.hero-slider__track').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    $('.hero-slider__video').each(function() {
        this.pause();
    });
});

$('.hero-slider__track').on('afterChange', function(event, slick, currentSlide) {
    updateCounter($(this), currentSlide);

    const $currentSlide = $(slick.$slides[currentSlide]);
    const video = $currentSlide.find('.hero-slider__video')[0];

    if (video) {
        resetProgressBar($currentSlide);

        video.currentTime = 0;
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Автовоспроизведение было заблокировано браузером:", error);
            });
        }
    }
});

function resetProgressBar($slide) {
    const $bar = $slide.find('.hero-slider__progress-bar');
    $bar.css('width', '0%');
}

$(document).on('timeupdate', '.hero-slider__video', function() {
    const video = this;
    const $slide = $(video).closest('.hero-slider__slide');
    const $bar = $slide.find('.hero-slider__progress-bar');

    if (video.duration > 0) {
        const percent = (video.currentTime / video.duration) * 100;
        $bar.css('width', percent + '%');
    }
});

$(document).on('ended', '.hero-slider__video', function() {
    const $activeSlide = $('.hero-slider__track').find('.slick-active');
    const videoInActiveSlide = $activeSlide.find('.hero-slider__video')[0];

    if (this === videoInActiveSlide) {
        $('.hero-slider__track').slick('slickNext');
    }
});

$('.hobbies__slider').slick({
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

$(document).ready(function() {
  $('.js-select2-single').select2({
    containerCssClass: 'afisha__select-container',
  });
});

const events = [
    {
        id: 1,
        park: 'pokrovsky',
        parkName: 'Зона отдыха «Покровский берег»',
        title: 'Золотая осень: выходные в парках Москвы',
        description: 'Здесь встречаются с друзьями, занимаются спортом…',
        date: '2024-10-12',
        dateEnd: '2024-10-13',
        time: '12:00',
        dateLabel: '12-13 октября, 12:00',
        free: true,
        tags: ['ekskursii', 'vystavki', 'master-klassy'],
        image: '/src/assets/event-autumn.jpg'
    },
    {
        id: 2,
        park: 'gorky',
        parkName: 'Парк Горького',
        title: 'Экскурсия по осенним аллеям',
        description: '…',
        date: '2024-10-17',
        time: '12:00',
        dateLabel: '17 октября, 12:00',
        free: false,
        tags: ['ekskursii', 'vystavki'],
        image: '/src/assets/event-park.jpg'
    },
];

const state = {
    park: '',
    date: '',
    tags: new Set(),
    visibleCount: 8
};

function renderEvent(event) {
    return `
        <li class="afisha__event-item">
            <article class="afisha__event">
                <div class="afisha__event-media">
                    <img class="afisha__event-image"
                         src="${event.image}"
                         alt="${event.title}"
                         loading="lazy"
                         width="400" height="300">
                    ${event.free ? '<span class="afisha__event-badge">Бесплатно</span>' : ''}
                </div>
                <p class="afisha__event-park">${event.parkName}</p>
                <h3 class="afisha__event-title">${event.title}</h3>
                <p class="afisha__event-description">${event.description}</p>
                <time class="afisha__event-time"
                      datetime="${event.date}${event.dateEnd ? '/' + event.dateEnd : ''}T${event.time}">
                    ${event.dateLabel}
                </time>
                <ul class="afisha__event-tags">
                    ${event.tags.map(tag => `<li><span class="afisha__event-tag">${tag}</span></li>`).join('')}
                </ul>
            </article>
        </li>
    `;
}

function filterEvents() {
    return events.filter(event => {
        if (state.park && event.park !== state.park) return false;
        if (state.date && event.date !== state.date && event.dateEnd !== state.date) return false;
        if (state.tags.size > 0 && ![...state.tags].every(t => event.tags.includes(t))) return false;
        return true;
    });
}

const eventsList = document.getElementById('afisha-events');

function render() {
    const filtered = filterEvents();
    const visible = filtered.slice(0, state.visibleCount);

    eventsList.innerHTML = visible.map(renderEvent).join('');

    if (filtered.length === 0) {
        eventsList.innerHTML = '<li class="afisha__empty">По выбранным фильтрам событий нет</li>';
    }
}

$('#afisha-park-filter').on('select2:select select2:clear', function () {
    state.park = $(this).val() || '';
    state.visibleCount = 8;
    render();
});

document.querySelectorAll('.afisha__date[data-date]').forEach(btn => {
    btn.addEventListener('click', () => {
        const date = btn.dataset.date;
        const isActive = btn.getAttribute('aria-pressed') === 'true';

        // Сброс всех
        document.querySelectorAll('.afisha__date[data-date]').forEach(b => {
            b.setAttribute('aria-pressed', 'false');
        });

        if (!isActive) {
            btn.setAttribute('aria-pressed', 'true');
            state.date = date;
        } else {
            state.date = '';
        }

        state.visibleCount = 8;
        render();
    });
});

document.querySelectorAll('.afisha__tag').forEach(btn => {
    btn.addEventListener('click', () => {
        const tag = btn.dataset.tag;
        const isActive = btn.getAttribute('aria-pressed') === 'true';

        if (isActive) {
            state.tags.delete(tag);
            btn.setAttribute('aria-pressed', 'false');
        } else {
            state.tags.add(tag);
            btn.setAttribute('aria-pressed', 'true');
        }

        state.visibleCount = 8;
        render();
    });
});

document.querySelector('.afisha__more').addEventListener('click', () => {
    state.visibleCount += 8;
    render();
});

render();