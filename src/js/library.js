// import "./fetch"
const refs = {
    watchedBtn: document.querySelector(".wached-btn"),
    queueBtn: document.querySelector(".queue-btn"),
    gallery: document.querySelector('.gallery'),
};
  
refs.watchedBtn.addEventListener('click', renderWatched);
refs.queueBtn.addEventListener('click', renderQueued);

renderWatched()

function renderWatched() {
    refs.watchedBtn.classList.add("active");
    refs.queueBtn.classList.remove("active");
    const watchedMovies = JSON.parse(localStorage.getItem('watched-films'))

    if (watchedMovies === null) {
        
        const placeholder = `<p>Your list is empty(</p>`
        refs.gallery.innerHTML = placeholder;
        return
    }
    const newMarkup = watchedMovies.map(movie => {
   
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
     | ${movie.release_date.substring(0, 4)}
    </p>
  
  </div>
  </a>
`;
      })
      .join('');
    refs.gallery.innerHTML = newMarkup;
 
}

function renderQueued() {
    refs.watchedBtn.classList.remove("active");
    refs.queueBtn.classList.add("active");
    const queuedMovies = JSON.parse(localStorage.getItem('queued-films'))
    if (queuedMovies === null) {
        
        const placeholder = `<p>Your list is empty(</p>`
        refs.gallery.innerHTML = placeholder;
        return
    }
    const newMarkup = queuedMovies.map(movie => {
   
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
     | ${movie.release_date.substring(0, 4)}
    </p>
  
  </div>
  </a>
`;
      })
      .join('');
    refs.gallery.innerHTML = newMarkup;
 
}

