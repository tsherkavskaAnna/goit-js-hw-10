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
  .catch(newError)

}

  function renderSearch(countries) {

    if(countries.length === 1) {
      clearList()
      const markup = countries.map(country => {
        return `<img src="${country.flags.svg}" width="30"><span>${country.name}</span>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages </b>: ${country.languages.map(data => data.name).join(`, `)}</p>`
      })
    .join(``);
    refs.info.innerHTML = markup;
    }

    if(countries.length >= 2  && countries.length <= 10) {
      clearInfo();
      const markup = countries.map(country => {
        return `<li>
        <img src="${country.flags.svg}" width="30"> <span>${country.name}</span></li>`
      })
      .join(``);
  refs.list.innerHTML = markup;
    }

    if(countries.length > 10) {
      clearInfo();
      clearList();
      Notify.info(`Too many matches found. Please enter a more specific name.`)
    }
  }

//Creare markup per 1 paese

function makeCountryCard(countries) {
  
}

 


// creare markup per 2-10 paese

function makeCountriesList (countries) {
  
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
