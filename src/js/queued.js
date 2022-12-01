import { refs } from "./refs";

refs.watchedBtn.addEventListener('click', renderWatched);
refs.queueBtn.addEventListener('click', renderQueued);
renderWatched();
function renderQueued() {
    refs.watchedBtn.classList.remove("active");
    refs.queueBtn.classList.add("active");
    const queuedMovies = JSON.parse(localStorage.getItem('queue-films'));
    if (queuedMovies === null) {
        
        const placeholder = `<p>Your list is empty(</p>`
        refs.gallery.innerHTML = placeholder;
        return
    }
    let uniqueObjArray = [...new Map(queuedMovies.map((item) => [item["id"], item])).values()];
    
    const newMarkup = uniqueObjArray.map(movie => {
   
        return `
 <a id=${movie.id} class="gallery__poster-card" href="">
  <img class="poster-card__image" src="https://image.tmdb.org/t/p/w780${
    movie.poster_path
  }" alt="" loading="lazy" />
  <div class="poster-card__info">
    <p class="info-item title">
      ${movie.original_title}
    </p>

  
  </div>
  </a>
`;
      })
      .join('');
    refs.gallery.innerHTML = newMarkup;
}

function renderWatched() {
    refs.queueBtn.classList.remove("active");
    refs.watchedBtn.classList.add("active");
    const watchedMovies = JSON.parse(localStorage.getItem('watched-films'))
    if (watchedMovies === null) {
        
        const placeholder = `<p>Your list is empty(</p>`
        refs.gallery.innerHTML = placeholder;
        return
    }
    let uniqueObjArray = [...new Map(watchedMovies.map((item) => [item["id"], item])).values()];    
    
  const newMarkup = uniqueObjArray.map(movie => {
   
        return `
 <a id=${movie.id} class="gallery__poster-card" href="">
  <img class="poster-card__image" src="https://image.tmdb.org/t/p/w780${
    movie.poster_path
  }" alt="" loading="lazy" />
  <div class="poster-card__info">
    <p class="info-item title">
      ${movie.original_title}
    </p>
  
  </div>
  </a>
`;
      })
      .join('');
    refs.gallery.innerHTML = newMarkup;
}

