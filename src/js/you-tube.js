import { refs } from "./refs";

 
refs.iframe.classList.add('backdrop__is-hidden')

const API_KEY = 'ae41ac8beda98b2e2d51e160e21365e8';
const BASE_URL = 'https://api.themoviedb.org/3';

async function getTrailerByID(movieID) {
  try {
      const response = await fetch(`${BASE_URL}/movie/${movieID}/videos?api_key=${API_KEY}&language=en-US`);
      const result = await response.json();
    let key = result.results[0].key;
 
        renderTrailer(key);
  } catch (error) {
       alert('Your movie dont have any trailer');
  }
}

function renderTrailer(key) {
  
    refs.iframe.classList.remove('backdrop__is-hidden')
  refs.iframe.setAttribute('src', `https://www.youtube.com/embed/${key}?`);

}

export function watchedTrailer(data) {
   
    document.querySelector('#trailer').addEventListener('click', () => {
    
       const movieID = data.id
    
      getTrailerByID(movieID);

    })
}


