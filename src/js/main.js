import { initHeroSlider } from './hero-slider.js';
import { initHobbies } from './hobbies.js';
import { initArticles } from './articles.js';
import { initPartners } from './partners.js';
import { initAfisha } from './afisha.js';
import { initParks } from './parks.js';
import { initModal } from './modal.js';
import { initSubscribeForm } from './subscribe-form.js';
import '../styles/styles.scss';

const $ = window.jQuery;

$(function () {
    initHeroSlider();
    initHobbies();
    initArticles();
    initPartners();
    initAfisha();
    initModal();
    initSubscribeForm();
    initParks();
});