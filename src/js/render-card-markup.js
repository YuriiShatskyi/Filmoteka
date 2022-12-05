import { API_GENRES } from "./genres-list";
import { hideLoader } from "./loader";

export function renderMarkup(callback, destination) {

 
    callback.then(movies => {

      const newMarkup = movies
        .map(movie => {
  let genres = movie.genre_ids.map(genre_id => { return (API_GENRES.find(genre => genre.id === genre_id)).name})

  if (genres.length > 3) {
        genres[2] = 'Other';
    genres.length = 3;
}
let allGenres = genres.join(', ');
        
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
       ${allGenres} | ${movie.release_date.substring(0, 4)}      
      </p>

    </div>
    </a>
  `;
        })
        .join('')
        
      destination.innerHTML = newMarkup;
      
      let imgs = document.querySelectorAll('.poster-card__image')
      imgs.forEach(img => {
        if (img.src === "https://image.tmdb.org/t/p/w780null") {
          img.setAttribute('src', "https://rat.in.ua/wp-content/uploads/2014/06/2640-Bender-Futurama.png")
        }
      })
     
    });
   
    
  }