import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputCountry = document.querySelector('#search-box');
const infoCountry = document.querySelector('.country-info');
const listCountry = document.querySelector('.country-list');

inputCountry.addEventListener('input', debounce(inputSearch, DEBOUNCE_DELAY));
function inputSearch(evt) {
  evt.preventDefault();
  console.log(evt);
    const searchCountries = evt.target.value.trim();
    if (!searchCountries) {
        listCountry.innerHTML = '';
        infoCountry.innerHTML = '';
        return;
    }

  fetchCountries(searchCountries)
        .then(answer => {
            if (answer.length > 10) {
                Notiflix.Notify.info(
                    'Too many matches found. Please, enter a more specific name.'
                );
                return;
            }
            renderedCountries(answer);
        })
        .catch(error => {
      listCountry.innerHTML = '';
      infoCountry.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
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

function countriesListMarkup(answer) {
  const listMarkup = answer
    .reduce((acc, { name, flags }) => { 
    return acc + `<li>
                  <img src="${flags.svg}" alt="${name}" width="100" height="auto">
                  <span>${name.official}</span>
              </li>`;
    
    }, '');
  
  listCountry.innerHTML = listMarkup;
  return listMarkup;

}

function countryCardMarkup(answer) {
  const cardMarkup = answer.reduce((acc, { flags, name, capital, population, languages }) => {
    languages = Object.values(languages).join(', ');
    return `
            <img src="${flags.svg}" alt="${name}" width="520" height="auto">
            <p> ${name.official}</p>
            <p>Capital: <span> ${capital}</span></p>
            <p>Population: <span> ${population} </span></p>
            <p>Languages: <span> ${languages}</span></p>`;
  }, '');
  infoCountry.innerHTML = cardMarkup;
  return cardMarkup;
}
