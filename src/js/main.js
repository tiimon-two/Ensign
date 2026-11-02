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
        parks: ['pokrovsky'],
        parkName: 'Зона отдыха «Покровский берег»',
        title: 'Золотая осень: выходные в парках Москвы',
        description: 'Здесь встречаются с друзьями, занимаются спортом, проводят время с семьёй и открывают новое. Мы помогаем найти парк, событие и занятие по душе.',
        date: '2024-10-12',
        dateEnd: '2024-10-13',
        time: '12:00',
        dateLabel: '12-13 октября, 12:00',
        free: true,
        tags: ['Экскурсии', 'Выставки', 'Мастер-классы'],
        image: '/src/assets/afisha-1.jpg'
    },
    {
        id: 2,
        parks: ['gorky'],
        parkName: 'Парк Горького',
        title: 'Экскурсия по осенним аллеям',
        description: 'Здесь встречаются с друзьями, занимаются спортом, проводят время с семьёй и открывают новое. Мы помогаем найти парк, событие и занятие по душе.',
        date: '2024-10-17',
        time: '12:00',
        dateLabel: '17 октября, 12:00',
        free: false,
        tags: ['Экскурсии', 'Выставки', 'Мастер-классы'],
        image: '/src/assets/afisha-2.jpg'
    },
    {
        id: 3,
        parks: ['pokrovsky', 'lianozovo', 'luzhniki', 'korobkovsky', 'gorky'],
        parkName: '5 парков',
        title: 'Йога под осенним небом',
        description: 'Здесь встречаются с друзьями, занимаются спортом, проводят время с семьёй и открывают новое. Мы помогаем найти парк, событие и занятие по душе.',
        date: '2024-10-18',
        time: '10:00',
        dateLabel: '18 октября, 10:00',
        free: false,
        tags: ['Спорт'],
        image: '/src/assets/afisha-3.jpg'
    },
    {
        id: 4,
        parks: ['korobkovsky'],
        parkName: 'Коробковский сад',
        title: 'Фестиваль «Осень в парках Москвы»',
        description: 'Здесь встречаются с друзьями, занимаются спортом, проводят время с семьёй и открывают новое. Мы помогаем найти парк, событие и занятие по душе.',
        date: '2024-9-19',
        time: '12:00',
        dateLabel: '19 сентября, 12:00',
        free: false,
        tags: ['Фестивали', 'Концерты', 'Детям'],
        image: '/src/assets/afisha-4.jpg'
    },
    {
        id: 5,
        parks: ['tushino'],
        parkName: 'Парк «Северное Тушино»',
        title: 'Джаз в осеннем парке',
        description: 'Здесь встречаются с друзьями, занимаются спортом, проводят время с семьёй и открывают новое. Мы помогаем найти парк, событие и занятие по душе.',
        date: '2024-10-23',
        time: '17:00',
        dateLabel: '23 октября, 17:00',
        free: true,
        tags: ['Концерты', 'Вечеринки'],
        image: '/src/assets/afisha-5.jpg'
    },
    {
        id: 6,
        parks: ['pokrovsky', 'lianozovo', 'luzhniki', 'korobkovsky', 'gorky'],
        parkName: '5 парков',
        title: 'Мастерская осеннего гербария',
        description: 'Здесь встречаются с друзьями, занимаются спортом, проводят время с семьёй и открывают новое. Мы помогаем найти парк, событие и занятие по душе.',
        date: '2024-10-23',
        time: '12:00',
        dateLabel: '23 октября, 12:00',
        free: false,
        tags: ['Мастер-классы'],
        image: '/src/assets/afisha-6.jpg'
    },
    {
        id: 7,
        parks: ['lianozovo'],
        parkName: 'Лианозовский парк',
        title: 'Семейный квест «Тайны осени»',
        description: 'Здесь встречаются с друзьями, занимаются спортом, проводят время с семьёй и открывают новое. Мы помогаем найти парк, событие и занятие по душе.',
        date: '2024-10-24',
        time: '11:00',
        dateLabel: '24 октября, 11:00',
        free: true,
        tags: ['Квест', 'Детям'],
        image: '/src/assets/afisha-7.jpg'
    },
    {
        id: 8,
        parks: ['luzhniki'],
        parkName: 'Парк им. Юрия Лужкова',
        title: 'Осенний забег по парку',
        description: 'Здесь встречаются с друзьями, занимаются спортом, проводят время с семьёй и открывают новое. Мы помогаем найти парк, событие и занятие по душе.',
        date: '2024-10-24',
        time: '12:00',
        dateLabel: '24 октября, 12:00',
        free: false,
        tags: ['Спорт', 'Благотворительная акция'],
        image: '/src/assets/afisha-8.jpg'
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
                <h3 class="afisha__event-title"><a href="#" class="afisha__link">${event.title}</a></h3>
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
        if (state.park && !event.parks.includes(state.park)) return false;
        if (state.date && event.date !== state.date && event.dateEnd !== state.date) return false;
        if (state.tags.size > 0 && ![...state.tags].some(t => event.tags.includes(t))) return false;
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

document.querySelector('.afisha__more').addEventListener('click', () => {
    state.visibleCount += 8;
    render();
});

render();

const allTags = [
    'Кинопоказы',
    'Ярмарка',
    'Спорт',
    'Мастер-классы',
    'Лекции',
    'Фестивали',
    'Концерты',
    'Шоу',
    'Театр',
    'Квизы',
    'Детям',
    'Анимация',
    'Благотворительная акция',
    'Выставки',
    'Экскурсии',
    'Диджей-сеты',
    'Вечеринки',
    'Квест'
];

const INITIAL_TAGS_COUNT = 17;
let visibleTagsCount = INITIAL_TAGS_COUNT;

const tagsList = document.querySelector('.afisha__tags-list');
const tagsMore = document.querySelector('.afisha__tags-more');

function renderTags() {
    const visible = allTags.slice(0, visibleTagsCount);

    tagsList.innerHTML = visible.map(tag => `
        <li>
            <button
                class="afisha__tag"
                type="button"
                data-tag="${tag}"
                aria-pressed="${state.tags.has(tag)}"
            >${tag}</button>
        </li>
    `).join('');

    tagsMore.hidden = visibleTagsCount >= allTags.length;
}

tagsList.addEventListener('click', (e) => {
    const btn = e.target.closest('.afisha__tag');
    if (!btn) return;

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

tagsMore.addEventListener('click', () => {
    visibleTagsCount = allTags.length;
    renderTags();
});

renderTags();

// ---------- Данные парков ----------
const parks = [
    {
        id: 'gorky',
        name: 'Парк Горького',
        district: 'Центральный',
        interests: ['Культура', 'Семейный отдых', 'Спорт и активный отдых'],
        coords: [55.7300, 37.6010]
    },
    {
        id: 'pokrovsky',
        name: 'Зона отдыха «Покровский берег»',
        district: 'Северо-Западный',
        interests: ['Природно-исторический парк', 'Семейный отдых'],
        coords: [55.8100, 37.4300]
    },
    {
        id: 'tushino',
        name: 'Парк «Северное Тушино»',
        district: 'Северо-Западный',
        interests: ['Спорт и активный отдых', 'Детский отдых'],
        coords: [55.8600, 37.4300]
    },
    {
        id: 'lianozovo',
        name: 'Лианозовский парк',
        district: 'Северо-Восточный',
        interests: ['Семейный отдых', 'Детский отдых'],
        coords: [55.9000, 37.5700]
    },
    {
        id: 'luzhniki',
        name: 'Парк им. Юрия Лужкова',
        district: 'Юго-Западный',
        interests: ['Спорт и активный отдых', 'Культура'],
        coords: [55.7150, 37.5530]
    },
    {
        id: 'korobkovsky',
        name: 'Коробковский сад',
        district: 'Центральный',
        interests: ['Природно-исторический парк', 'Культура'],
        coords: [55.7400, 37.5900]
    },
    {
        id: 'sokolniki',
        name: 'Парк «Сокольники»',
        district: 'Восточный',
        interests: ['Природно-исторический парк', 'Спорт и активный отдых', 'Семейный отдых'],
        coords: [55.7930, 37.6750]
    },
    {
        id: 'kolomenskoye',
        name: 'Музей-заповедник «Коломенское»',
        district: 'Южный',
        interests: ['Природно-исторический парк', 'Культура', 'Семейный отдых'],
        coords: [55.6670, 37.6670]
    },
    {
        id: 'tsaritsyno',
        name: 'Музей-заповедник «Царицыно»',
        district: 'Южный',
        interests: ['Природно-исторический парк', 'Культура'],
        coords: [55.6150, 37.6820]
    },
    {
        id: 'kuzminki',
        name: 'Парк «Кузьминки»',
        district: 'Юго-Восточный',
        interests: ['Семейный отдых', 'Спорт и активный отдых', 'Детский отдых'],
        coords: [55.6950, 37.7900]
    }
];

const districts = [
    'Центральный', 'Северный', 'Северо-Восточный', 'Восточный',
    'Юго-Восточный', 'Южный', 'Юго-Западный', 'Западный',
    'Северо-Западный', 'Зеленоградский', 'Троицкий', 'Новомосковский'
];

const interests = [
    'Культура', 'Семейный отдых', 'Спорт и активный отдых',
    'Детский отдых', 'Природно-исторический парк'
];

const parksState = {
    district: new Set(),
    interest: new Set(),
    parkIds: new Set()
};

let map = null;

function initMap() {
    if (map) return;

    map = new ymaps.Map('parks__map', {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['zoomControl']
    });

    map.geoObjects.removeAll();
    updateMap();
}

function updateMap() {
    if (!map) return;

    // Удаляем старые метки
    map.geoObjects.removeAll();

    const filtered = filterParks();

    filtered.forEach(park => {
        const placemark = new ymaps.Placemark(
            park.coords,
            {
                hintContent: park.name,
                balloonContentHeader: park.name,
                balloonContentBody: `
                    <p><strong>Округ:</strong> ${park.district}</p>
                    <p><strong>Интересы:</strong> ${park.interests.join(', ')}</p>
                `
            },
            {
                iconLayout: 'default#image',
                iconImageHref: '../src/assets/pin.svg', // путь к вашему SVG
                iconImageSize: [48, 48], // подставьте нужный размер
                iconImageOffset: [-24, -24] // чтобы "острие" метки было в координате
            }
        );

        map.geoObjects.add(placemark);
    });

    if (filtered.length === 0) {
        map.setCenter([55.76, 37.64], 10);
    }
}

function filterParks() {
    return parks.filter(park => {
        if (parksState.parkIds.size > 0 && !parksState.parkIds.has(park.id)) {
            return false;
        }

        if (parksState.district.size > 0 && !parksState.district.has(park.district)) {
            return false;
        }

        if (parksState.interest.size > 0) {
            const hasInterest = [...parksState.interest].some(tag =>
                park.interests.includes(tag)
            );
            if (!hasInterest) return false;
        }

        return true;
    });
}

function renderFilterButtons(container, values, stateSet, stateKey) {
    container.innerHTML = values.map(value => `
        <li>
            <button
                class="parks__option"
                type="button"
                data-value="${value}"
                aria-pressed="${stateSet.has(value)}"
            >${value}</button>
        </li>
    `).join('');

    // делегирование
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.parks__option');
        if (!btn) return;

        const val = btn.dataset.value;
        const isActive = btn.getAttribute('aria-pressed') === 'true';

        if (isActive) {
            stateSet.delete(val);
            btn.setAttribute('aria-pressed', 'false');
        } else {
            stateSet.add(val);
            btn.setAttribute('aria-pressed', 'true');
        }

        updateMap();
    });
}

function initParkSelect() {
    const select = $('#parks-filter');

    // Заполняем опции из массива парков
    parks.forEach(park => {
        select.append(new Option(park.name, park.id));
    });

    select.select2({
        placeholder: 'Все парки Москвы',
        allowClear: true,
        multiple: true,
        closeOnSelect: false,
        containerCssClass: 'parks__select-container',
        dropdownCssClass: 'parks__select-dropdown',
        minimumResultsForSearch: Infinity
    });

    select.on('change', function () {
        const selected = $(this).val() || [];
        parksState.parkIds = new Set(selected);
        updateMap();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderFilterButtons(
        document.getElementById('parks-districts'),
        districts,
        parksState.district
    );

    renderFilterButtons(
        document.getElementById('parks-interests'),
        interests,
        parksState.interest
    );

    initParkSelect();
});

function waitForYmaps() {
    if (window.ymaps) {
        ymaps.ready(initMap);
    } else {
        setTimeout(waitForYmaps, 100);
    }
}
waitForYmaps();

$('.articles__slider').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('.articles__arrow--prev'),
    nextArrow: $('.articles__arrow--next'),
    dots: false,
    infinite: false,
    autoplay: false,
    speed: 600,
    cssEase: 'linear',
    fade: false
});

// ---------- Модальное окно «Задать вопрос» ----------
(function initAskQuestionModal() {
    const dialog = document.getElementById('ask-question');
    if (!dialog) return;

    const openBtn = document.querySelector('[data-modal-open="ask-question"]');
    const closeBtn = dialog.querySelector('.modal__close');
    const form = dialog.querySelector('#ask-question-form');

    // Открытие
    if (openBtn) {
        openBtn.addEventListener('click', () => {
            dialog.showModal();   // нативный метод: backdrop, focus-trap, Esc
        });
    }

    // Закрытие кнопкой
    closeBtn?.addEventListener('click', () => dialog.close());

    // Закрытие кликом по backdrop.
    // При клике вне контента target === dialog (сам <dialog>),
    // т.к. контент лежит внутри формы, а не прямо в dialog.
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    // Отправка формы
    form?.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = new FormData(form);
        const payload = Object.fromEntries(data.entries());

        // TODO: заменить на реальную отправку (fetch)
        console.log('Заявка:', payload);

        form.reset();
        dialog.close();
    });
})();

// ---------- Форма подписки ----------
(function initSubscribeForm() {
    const form = document.getElementById('about-subscribe');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const input = form.querySelector('input[type="email"]');
        if (!input || !input.checkValidity()) {
            input?.focus();
            return;
        }

        const email = input.value.trim();

        // TODO: заменить на реальную отправку (fetch)
        console.log('Подписка:', email);

        form.reset();
    });
})();