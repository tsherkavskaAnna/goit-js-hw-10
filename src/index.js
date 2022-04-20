import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;


const refs = {
  inputSearch:document.querySelector(`input#search-box`),
  list:document.querySelector(`.country-list`),
  info:document.querySelector(`.country-info`)
};

refs.inputSearch.addEventListener(`input`, debounce(onSearchInput, DEBOUNCE_DELAY));


function onSearchInput() {
  const nameOfCountry = refs.inputSearch.value.trim()

  if(!nameOfCountry) {
     clearInfo();
     clearList();
     return;
    
  }

  fetchCountries(nameOfCountry)
  .then(renderSearch)
  .catch(newError);

}

  function renderSearch(data) {

    if(data.length === 1) {
      clearInfo()
      refs.info.insertAdjacentHTML(`beforeend`, makeCountryCard)
    }

    if(data.length >= 2  && data.length <= 10) {
      clearInfo();
      refs.list.insertAdjacentHTML(`beforeend`, makeCountriesList)
    }

    if(data.length > 10) {
      clearInfo();
      clearList();
      Notify.info(`Too many matches found. Please enter a more specific name.`)
    }
  }

//Creare markup per 1 paese

function makeCountryCard(data) {
  const countryInfo = data
  .map(({ flags, name, languages, population, capital }) => {
    return `<div class="country__container">
            <p class="img__container">
              <img class="country__img" width='280' height='186' src='${flags.svg}'/>
            </p>
        <p class="country__name">${name}</p>
        <p class="country__property">Capital: <span class="property__value">${capital}</span></p>
        <p class="country__property">Population: <span class="property__value">${population}</span></p>
        <p class="country__property">Languages: <span class="property__value">${languages
          .map(element => element.name)
          .join(', ')}</span></p>
        </div>`;
  })
  .join('');

}

 


// creare markup per 2-10 paese

function makeCountriesList (data) {
  const countriesList = data
    .map(({ flags, name }) => {
      return `<li class="list__item">
                <p class="item__container"><img class="list__img" width='60' height='40' src='${flags.svg}'/></p>
                <p class="list__text">${name}</p>
          </li>`;
    })
    .join('');
}

// Errore

function newError () {
  clearList();
  clearInfo();
  Notify.failure("Oops, there is no country with that name");
}

//Pulire spazio

function clearList() {
  refs.list.innerHTML = ``;
}
function clearInfo() {
  refs.info.innerHTML = ``;
}
