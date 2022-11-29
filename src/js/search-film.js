import { renderMarkup } from "./render-card-markup";
import {fetchSearchingFilms} from "./fetch";

const refs = {
    gallery: document.querySelector('.gallery'),
    // nextPage: document.querySelector('#next-button'),
    // prevPage: document.querySelector('#prev-button'),
  }
  

const inputForm = document.querySelector('.header__form');

inputForm.addEventListener('submit', onInput);

function onInput(evt) {
  evt.preventDefault();

  const searchQuery  = evt.currentTarget.elements.query.value;
  console.log(searchQuery);

 renderMarkup(fetchSearchingFilms(searchQuery), refs.gallery);
}