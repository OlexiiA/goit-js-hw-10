import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;



const refs = {
    input: document.querySelector(`#search-box`),
    list: document.querySelector(`.country-list`),
    info: document.querySelector(`.country-info`),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

fetchCountries(`name`)

function onInput(e) {
  const countryName = e.target.value.trim();
  if (!countryName) {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
    return;
  };
 fetchCountries(countryName)
 .then(addMarcup)
 .catch(() => 
 Notiflix.Notify.failure('Oops, there is no country with that name'))
};

function addMarcup(data) {
  if (data.length > 10) {
    return Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.')
  };

  if (data.length >= 2 && data.length <= 10) {
    refs.info.innerHTML = "";
    refs.list.innerHTML = data.map(item => `<li><img src=${item.flags.svg}
    width = 40px, height = 25px></img><span>${item.name.official}</span></li>`).join("")
  }
  refs.list.innerHTML = '';
  const country = data[0];
  refs.info.innerHTML = `<div class = 'wrapper'><img src=${country.flags.svg}
  width = 40px, height = 25px></img><span class = 'name'>${country.name.official}
  </span></div><p>Capital: <span class = 'capital'>${country.capital}</span></p>
  <p>Population: <span class = 'population'>${country.population}</span></p>
  <p>Languages: <span class = 'languages'>${Object.values(country.languages)}</span></p>`;
}