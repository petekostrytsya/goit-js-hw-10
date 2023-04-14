import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const infoCountry = document.querySelector('.country-info');
const listCountry = document.querySelector('.country-list');

infoCountry.addEventListener('input', debounce(inputSearch, DEBOUNCE_DELAY));
function inputSearch(evt) {
    evt.prevendDefault();
    const searchCountries = evt.target.value.trim();
    if (!searchCountries) {
        listCountry.innerHTML = '';
        infoCountry.innerHTML = '';
        return;
    }
}
