const $ = window.jQuery;

export function initParks() {
    const mapEl = document.getElementById('parks__map');
    if (!mapEl) return;

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

    const state = {
        district: new Set(),
        interest: new Set(),
        parkIds: new Set()
    };

    let map = null;

    function filterParks() {
        return parks.filter(park => {
            if (state.parkIds.size > 0 && !state.parkIds.has(park.id)) return false;
            if (state.district.size > 0 && !state.district.has(park.district)) return false;
            if (state.interest.size > 0) {
                const hasInterest = [...state.interest].some(tag => park.interests.includes(tag));
                if (!hasInterest) return false;
            }
            return true;
        });
    }

    function updateMap() {
        if (!map) return;

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
                    iconImageHref: '/src/assets/pin.svg',
                    iconImageSize: [48, 48],
                    iconImageOffset: [-24, -48]
                }
            );

            map.geoObjects.add(placemark);
        });

        if (filtered.length === 0) {
            map.setCenter([55.76, 37.64], 10);
        }
    }

    function initMap() {
        if (map) return;

        map = new ymaps.Map('parks__map', {
            center: [55.76, 37.64],
            zoom: 10,
            controls: ['zoomControl']
        });

        updateMap();
    }

    function renderFilterButtons(container, values, stateSet) {
        if (!container) return;

        container.innerHTML = values.map(value => `
            <li>
                <button class="parks__option" type="button"
                        data-value="${value}"
                        aria-pressed="${stateSet.has(value)}">${value}</button>
            </li>
        `).join('');

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
        if (!select.length) return;

        select.empty().append(new Option('', ''));
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
            state.parkIds = new Set(selected);
            updateMap();
        });
    }

    renderFilterButtons(document.getElementById('parks-districts'), districts, state.district);
    renderFilterButtons(document.getElementById('parks-interests'), interests, state.interest);
    initParkSelect();

    (function waitForYmaps() {
        if (window.ymaps) {
            ymaps.ready(initMap);
        } else {
            setTimeout(waitForYmaps, 100);
        }
    })();
}