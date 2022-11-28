const inputForm = document.querySelector('.header__input');

inputForm.addEventListener('submit', onInput);

function onInput(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const searchQuery = form.elements.query.value;
  // console.log(searchQuery);

  fetchSearchingFilms(searchQuery)
    .then(renderMarkupY)
    .catch(error => console.log(error));
}

async function fetchSearchingFilms(query) {
  refs.gallery.innerHTML = '';
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`
    );
    const result = await response.json();
    console.log(result.results);
    return result.results;
  } catch (error) {
    console.error(error);
  }
}

function renderMarkupY() {
  inputForm.innerHTML = '';
  fetchSearchingFilms().then(movies => {
    const newMarkup = movies
      .map(movie => {
        let genres = movie.genre_ids
          .map(genre_id => {
            return API_GENRES.find(genre => genre.id === genre_id).name;
          })
          .join(', ');

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
    refs.gallery.innerHTML = newMarkup;
  });
}

// renderMarkupY();
