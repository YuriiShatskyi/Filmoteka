import { renderMarkup } from './render-card-markup';
import { fetchSearchingFilms } from './fetch';
import { showLoader } from './loader';
import { hideLoader } from './loader';
import { refs } from "./refs";

export let searchQuery = '';

refs.inputForm.addEventListener('submit', onInput);

function onInput(evt) {
  evt.preventDefault();
   
  showLoader();

  const searchQuery = evt.currentTarget.elements.query.value;

  if (searchQuery.trim() === '') {
    alert(
      'Search result not successful. Enter the correct movie name and try again'
    );
    hideLoader();
    return;
  }

  fetchSearchingFilms(searchQuery)
   
    .then(data => {
    
      if (data.length === 0) {
        alert(
          'Search result not successful. Enter the correct movie name and try again'
        );
        return;
      }

      renderMarkup(fetchSearchingFilms(searchQuery), refs.gallery);
    })
    .catch(error => alert(`${error}`));

  hideLoader();

  evt.target.reset();

}
