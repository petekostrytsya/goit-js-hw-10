import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const infoCountry = document.querySelector('.country-info');
const listCountry = document.querySelector('.country-list');

infoCountry.addEventListener('input', debounce(inputSearch, DEBOUNCE_DELAY));
function inputSearch(evt) {
    evt.prevendDefault();
    const name = evt.target.value.trim();
    if (!name) {
        listCountry.innerHTML = '';
        infoCountry.innerHTML = '';
        return;
    }
    fetchCountries(name)
        .then(answer => {
            if (answer.length > 10) {
                Notify.info(
                    'Too many matches found. Please, enter a more specific name.'
                );
                return;
            }
            renderedCountries(answer);
        })
        .catch(error => {
      listCountry.innerHTML = '';
      infoCountry.innerHTML = '';
      Notify.failure('Oops, there is no country with that name');
    });
    
}

function renderedCountries(answer) {
  const inputLetters = answer.length;

  if (inputLetters === 1) {
    listCountry.innerHTML = '';

    countryCardMarkup(answer);
  }

  if (inputLetters > 1 && inputLetters <= 10) {
    infoCountry.innerHTML = '';
    countriesListMarkup(answer);
  }
}
