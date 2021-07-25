import './sass/main.scss';

import fetchCountries from './js/fetchCountries.js';
import debounce from 'lodash.debounce';

import showCountry from './templates/country.hbs';

const body = document.querySelector('body');

fetchCountries('ukraine').then(res => {
  body.insertAdjacentHTML('beforeend', showCountry(res[0]));
});
