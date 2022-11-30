import { renderMarkup } from './render-card-markup';
import { fetchSearchingFilms } from './fetch';
import { showLoader, hideLoader } from './loader';
import { refs } from "./refs";

// const refs = {
//   gallery: document.querySelector('.gallery'),
//   inputForm: document.querySelector('.header__form'),
// };


export let searchQuery = '';

refs.inputForm.addEventListener('submit', onInput);

function onInput(evt) {
  evt.preventDefault();
  page = 1;
 
  showLoader();

  searchQuery = evt.currentTarget.elements.query.value;

  if (searchQuery.trim() === '') {
    alert(
      'Search result not successful. Enter the correct movie name and try again'
    );
    hideLoader();
    return;
  }

  renderMarkup(fetchSearchingFilms(), refs.gallery);
  evt.target.reset();

  




}


