import { hideLoader, showLoader} from "./loader";
import { renderMarkup } from "./render-card-markup";

const API_KEY = 'ae41ac8beda98b2e2d51e160e21365e8';
const BASE_URL = 'https://api.themoviedb.org/3';

const refs = {
  gallery: document.querySelector('.gallery'),
  // nextPage: document.querySelector('#next-button'),
  // prevPage: document.querySelector('#prev-button'),
}

let page = 1;

// Слухачі

// refs.nextPage.addEventListener('click', onLoadMore)
// refs.prevPage.addEventListener('click', backOnLoadMore)


export async function fetchTrendingFilms() {
  try {    
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
    );
    const result = await response.json();
    console.log(result.results);
    return result.results;
  } catch (error) {
    console.error(error);
  }
  finally {
    hideLoader();
  }

}

export async function fetchSearchingFilms(searchQuery) {
  try {
    const response = await fetch(
           `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`
    );
    const result = await response.json();
    console.log(result.results);
    return result.results;
  } catch (error) {
    console.error(error);
  }
  finally {
    hideLoader();
  }


}

showLoader();
renderMarkup(fetchTrendingFilms(), refs.gallery);



