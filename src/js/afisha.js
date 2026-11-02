import afisha1 from '../assets/afisha-1.jpg';
import afisha2 from '../assets/afisha-2.jpg';
import afisha3 from '../assets/afisha-3.jpg';
import afisha4 from '../assets/afisha-4.jpg';
import afisha5 from '../assets/afisha-5.jpg';
import afisha6 from '../assets/afisha-6.jpg';
import afisha7 from '../assets/afisha-7.jpg';
import afisha8 from '../assets/afisha-8.jpg';

const $ = window.jQuery;

export function initAfisha() {
    const eventsList = document.getElementById('afisha-events');
    if (!eventsList) return;

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
            image: afisha1
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
            image: afisha2
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
            image: afisha3
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
            image: afisha4
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
            image: afisha5
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
            image: afisha6
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
            image: afisha7
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
            image: afisha8
        }
    ];

    const allTags = [
        'Кинопоказы', 'Ярмарка', 'Спорт', 'Мастер-классы', 'Лекции',
        'Фестивали', 'Концерты', 'Шоу', 'Театр', 'Квизы', 'Детям',
        'Анимация', 'Благотворительная акция', 'Выставки', 'Экскурсии',
        'Диджей-сеты', 'Вечеринки', 'Квест'
    ];

    const INITIAL_TAGS_COUNT = 17;

    const state = {
        park: '',
        date: '',
        tags: new Set(),
        visibleCount: 8
    };
    let visibleTagsCount = INITIAL_TAGS_COUNT;

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

    function render() {
        const filtered = filterEvents();
        const visible = filtered.slice(0, state.visibleCount);

        eventsList.innerHTML = visible.length
            ? visible.map(renderEvent).join('')
            : '<li class="afisha__empty">По выбранным фильтрам событий нет</li>';
    }

    const tagsList = document.querySelector('.afisha__tags-list');
    const tagsMore = document.querySelector('.afisha__tags-more');

    function renderTags() {
        if (!tagsList) return;

        const visible = allTags.slice(0, visibleTagsCount);
        tagsList.innerHTML = visible.map(tag => `
            <li>
                <button class="afisha__tag" type="button"
                        data-tag="${tag}"
                        aria-pressed="${state.tags.has(tag)}">${tag}</button>
            </li>
        `).join('');

        if (tagsMore) tagsMore.hidden = visibleTagsCount >= allTags.length;
    }

    $('.js-select2-single').select2({
        containerCssClass: 'afisha__select-container'
    });

    $('#afisha-park-filter').on('select2:select select2:clear', function () {
        state.park = $(this).val() || '';
        state.visibleCount = 8;
        render();
    });

    document.querySelectorAll('.afisha__date[data-date]').forEach(btn => {
        btn.addEventListener('click', () => {
            const date = btn.dataset.date;
            const isActive = btn.getAttribute('aria-pressed') === 'true';

            document.querySelectorAll('.afisha__date[data-date]').forEach(b =>
                b.setAttribute('aria-pressed', 'false')
            );

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

    const moreBtn = document.querySelector('.afisha__more');
    if (moreBtn) {
        moreBtn.addEventListener('click', () => {
            state.visibleCount += 8;
            render();
        });
    }

    if (tagsList) {
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
    }

    if (tagsMore) {
        tagsMore.addEventListener('click', () => {
            visibleTagsCount = allTags.length;
            renderTags();
        });
    }

    renderTags();
    render();
}