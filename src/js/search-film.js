import { renderMarkup } from './render-card-markup';
import { fetchSearchingFilms } from './fetch';
import { showLoader } from './loader';

const refs = {
  gallery: document.querySelector('.gallery'),
  inputForm: document.querySelector('.header__form'),
};

refs.inputForm.addEventListener('submit', onInput);

function onInput(evt) {
  evt.preventDefault();

  const searchQuery = evt.currentTarget.elements.query.value;

  if (searchQuery.trim() === '') {
    alert(
      'Search result not successful. Enter the correct movie name and try again'
    );
    return;
  }

  renderMarkup(fetchSearchingFilms(searchQuery), refs.gallery);
  evt.target.reset();

  refs.gallery.innerHTML = '';


  showLoader();
}

