import { API_GENRES } from "./genres-list";

const API_KEY = 'ae41ac8beda98b2e2d51e160e21365e8';
const BASE_URL = 'https://api.themoviedb.org/3';

const refs = {
    gallery: document.querySelector('.gallery')
}

export async function fetchTrendingFilms() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    const result = await response.json();
    console.log(result.results);
    return result.results;
  } catch (error) {
    console.error(error);
  }
}

function renderMarkup() {
  fetchTrendingFilms().then(movies => {
    const newMarkup = movies
      .map(movie => {
let genres = movie.genre_ids.map(genre_id => { return (API_GENRES.find(genre => genre.id === genre_id)).name}).join(', ');
       
        return `
 <a id=${movie.id} class="gallery__poster-card" href="">
  <img class="poster-card__image" src="https://image.tmdb.org/t/p/w780${
    movie.poster_path
  }" alt="" loading="lazy" />
  <div class="poster-card__info">
    <p class="info-item title">
      ${movie.original_title}
    </p>
    <p class="info-item">
    ${genres} | ${movie.release_date.substring(0, 4)}
    </p>
  
  </div>
  </a>
`;
      })
      .join('');
    refs.gallery.insertAdjacentHTML('beforeend', newMarkup);
  });
}

renderMarkup();