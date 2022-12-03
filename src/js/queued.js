import { refs } from "./refs";

refs.watchedBtn.addEventListener('click', renderWatched);
refs.queueBtn.addEventListener('click', renderQueued);

setTimeout(() => {
    renderWatched();
  }, 150);

function renderQueued() {
    refs.watchedBtn.classList.remove("active");
    refs.queueBtn.classList.add("active");
    const queuedMovies = JSON.parse(localStorage.getItem('queue-films'));
    if (queuedMovies.length === 0) {
        
        const placeholder = `<p>Your list is empty(</p>`
        refs.gallery.innerHTML = placeholder;
        return
    }
    let uniqueObjArray = [...new Map(queuedMovies.map((item) => [item["id"], item])).values()];
    
  const newMarkup = uniqueObjArray.map(movie => {
    const totalGenres = movie.genres;

    if (totalGenres.length > 3) {
        const other = 'Other';
        totalGenres[2].name = other;
        totalGenres.length = 3;
    };
    
const getGenres = totalGenres =>
  totalGenres.reduce((allGenres, genre) => {
    allGenres.push(genre.name);

    return allGenres;
  }, []);
 
   
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
    // ${getGenres(totalGenres).join(', ')} | ${movie.release_date.substring(0, 4)}
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
    if (watchedMovies.length === 0) {
        
        const placeholder = `<p>Your list is empty(</p>`
        refs.gallery.innerHTML = placeholder;
        return
    }
    let uniqueObjArray = [...new Map(watchedMovies.map((item) => [item["id"], item])).values()];    
    
  const newMarkup = uniqueObjArray.map(movie => {
    const totalGenres = movie.genres;
    

    if (totalGenres.length > 3) {
        const other = 'Other';
        totalGenres[2].name = other;
        totalGenres.length = 3;
    };
    
    
const getGenres = totalGenres =>
  totalGenres.reduce((allGenres, genre) => {
    allGenres.push(genre.name);
   
    return allGenres;
  }, []);
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
    // ${getGenres(totalGenres).join(', ')} | ${movie.release_date.substring(0, 4)}
    </p>
  
  </div>
  </a>
`;
      })
      .join('');
    refs.gallery.innerHTML = newMarkup;
}

