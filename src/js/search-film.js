import { renderMarkup } from './render-card-markup';
import { fetchSearchingFilms } from './fetch';
import { showLoader } from './loader';
import { hideLoader } from './loader';
import { refs } from "./refs";
import { page } from './pagination';




export let searchQuery = '';

refs.inputForm.addEventListener('submit', onInput);

function onInput(evt) {
  evt.preventDefault();
  searchQuery = evt.currentTarget.elements.query.value.trim();

  if (!searchQuery) {
    alert(
      'You have not entered a movie title'
    );
    hideLoader();
    return;
  }

  fetchSearchingFilms()
   
    .then(data => {
    
      if (data.length === 0) {
        alert(
          'Search result not successful. Enter the correct movie name and try again'
        );
        return;
      }

      renderMarkup(fetchSearchingFilms(), refs.gallery);
    })
    .catch(error => alert(`${error}`));
  
  evt.target.reset();

}
