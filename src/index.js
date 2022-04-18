import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;


const refs = {
  inputSearch:document.querySelector(`#search-box`),
  list:document.querySelector(`.country-list`),
  info:document.querySelector(`.country-info`)
};

refs.inputSearch.addEventListener(`input`, debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(event) {
  event.preventDefault();
  const nameOfCountry = event.target.value.trim()
}




