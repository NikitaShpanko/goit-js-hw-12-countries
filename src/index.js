import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import './sass/main.scss';

import DocIDs from './js/DocIDs';
import fetchCountries from './js/fetchCountries.js';
import pnotifySetup from './js/pnotifySetup';

import showCountry from './templates/country.hbs';
import showCountryList from './templates/countryList.hbs';

const MAX_COUNTRIES = 10;
const RETURN_LINK = '<p class="return"><a href="" data-index=-1>Return to the list</a></p>';

const html = new DocIDs('search', 'result');
pnotifySetup(html.result);

let curRes = [];
html.search.addEventListener(
  'input',
  debounce(() => {
    showCountries(html.search.value);
  }, 500),
);

function showCountries(text) {
  if (!text) {
    html.result.innerHTML = '';
    return;
  }
  fetchCountries(text).then(res => {
    if (res.length === 1) {
      html.result.innerHTML = showCountry(res[0]);
    } else if (res.length === 0) {
      error(`"${text}" not found.`);
    } else if (res.length > MAX_COUNTRIES) {
      error(
        `${res.length} countries were found, which is too much to show. Please enter more letters.`,
      );
    } else {
      html.result.innerHTML = showCountryList(res);
    }
    curRes = res;
  });
}

html.result.addEventListener('click', e => {
  if (e.target.tagName !== 'A') return;
  e.preventDefault();
  if (e.target.dataset.index == -1) html.result.innerHTML = showCountryList(curRes);
  else html.result.innerHTML = showCountry(curRes[e.target.dataset.index]) + RETURN_LINK;
});

const defaultName = new URL(window.location).searchParams.get('name');
if (defaultName) {
  html.search.value = defaultName;
  showCountries(defaultName);
}
