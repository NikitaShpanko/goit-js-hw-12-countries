import './sass/main.scss';

import DocIDs from './js/DocIDs';
import fetchCountries from './js/fetchCountries.js';
import debounce from 'lodash.debounce';

import showCountry from './templates/country.hbs';
import showCountryList from './templates/countryList.hbs';

const html = new DocIDs('search', 'result');
html.search.addEventListener(
  'input',
  debounce(() => {
    showCountries(html.search.value);
  }, 500),
);

const defaultName = new URL(window.location).searchParams.get('name');
if (defaultName) {
  html.search.value = defaultName;
  showCountries(defaultName);
}

function showCountries(text) {
  if (!text) {
    html.result.innerHTML = '';
    return;
  }
  fetchCountries(text).then(res => {
    if (res.length === 1) {
      html.result.innerHTML = showCountry(res[0]);
    } else if (res.length === 0) {
      html.result.innerHTML = '<p>Not found!</p>';
    } else if (res.length > 10) {
      html.result.innerHTML = '<p>Too much!</p>';
    } else {
      html.result.innerHTML = showCountryList(res);
    }
  });
}
