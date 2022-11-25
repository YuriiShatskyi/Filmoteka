const API_KEY = 'ae41ac8beda98b2e2d51e160e21365e8';
const BASE_URL = 'https://api.themoviedb.org/3';

const refs = {
    gallery: document.querySelector('.gallery')
}

async function fetchTrendingFilms() {
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
        return ` <div class="photo-card">
 <a href="">
  <img class="movie" src="https://image.tmdb.org/t/p/w342${
    movie.poster_path
  }" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      ${movie.original_title}
    </p>
    <p class="info-item">
      ${movie.genre} | ${movie.release_date.substring(0, 4)}
    </p>
    <p class="info-item">
    
    </p>
    <p class="info-item">
    ${movie.vote_average}
    </p>
  </div>
  </a>
</div>`;
      })
      .join('');
    refs.gallery.insertAdjacentHTML('beforeend', newMarkup);
  });
}

renderMarkup();
