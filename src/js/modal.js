import "./fetch"

const API_KEY = 'ae41ac8beda98b2e2d51e160e21365e8';
const BASE_URL = 'https://api.themoviedb.org/3';

const refs = {
    openModalE: document.querySelector(".filmsModal"),
    modalFilmInfo: document.querySelector(".modal-movie"),
    backdropFilmModal: document.querySelector('.backdrop'),  
    closeModalBtn: document.querySelector("modal__close-button"),
  };


refs.openModalE.addEventListener('click', onMovieCLick);


function onMovieCLick(event) {
    refs.modalFilmInfo.innerHTML = '';
    
    const isCard = event.target.closest('.gallery__poster-card');

    event.preventDefault();

    if (!isCard) {
        return;
    }
    
    const movieId = isCard.getAttribute('id');
        
    openModal();

    moviesByID(movieId);
   

    document.addEventListener('keydown', onEscClose);
    document.addEventListener('click', onClickClose);
}

function openModal() {
  refs.backdropFilmModal.classList.remove('backdrop__is-hidden');  
  refs.modalFilmInfo.classList.remove('modal__is-hidden');
  //refs.body.classList.add('no-scroll');
}


async function getMoviesByID(movieID) {
  try {
        const response = await fetch(`${BASE_URL}/movie/${movieID}?api_key=${API_KEY}&language=en-US`);
        const result = await response.json();
        console.log(result);
        return result;
  } catch (error) {
        console.error(error);
  }
}


export function moviesByID(movieID) {
    getMoviesByID(movieID).then(data => {
    createModalFilmInfoMarkup(data);
  });
}




function createModalFilmInfoMarkup({
    title,
    popularity,
    original_title,
    vote_average,
    genres,
    poster_path,
    overview,
    vote_count,
}) {
    const base_url = 'https://image.tmdb.org/t/p/';
    const size = 'w500';
    const genresList = genres.map(genre => genre.name).join(', ');
    

    refs.modalFilmInfo.innerHTML = `<button type="button" class="modal__close-button">
                <svg class="modal_icon icon" width="14" height="14">
                    <use href="./images/icons.svg#icon-close"></use>
                </svg>
        </button>
    
        <div class="modal__card">
        <div>
            <img class="modal__img" src="${poster_path ? `${base_url}${size}${poster_path}` : imgPlaceholder}" alt="${title}">
        </div>
        
        <div>
            <h2 class="modal__title">${original_title}</h2>
        
            <table class="modal-movie-properties">
                <tr class="modal-movie-properties__info">
                    <td class="modal-movie-properties__name">Vote / Votes</td>
                    <td class="modal-movie-properties__value"><span id="vote" class="modal-movie-properties__vote">${vote_average.toFixed(1)}</span> /
                        <span id="votes">${vote_count}</span>
                    </td>
                </tr>
        
                <tr class="modal-movie-properties__info">
                    <td class="modal-movie-properties__name">Popularity</td>
                    <td class="modal-movie-properties__value" id="popularity">${popularity}</td>
                </tr>
        
                <tr class="modal-movie-properties__info">
                    <td class="modal-movie-properties__name">Original Title</td>
                    <td class="modal-movie-properties__value" id="original-title">${original_title}</td>
                </tr>
        
                <tr class="modal-movie-properties__info">
                    <td class="modal-movie-properties__name">Genre</td>
                    <td class="modal-movie-properties__value" id="genre"> ${genresList}</td>
                </tr>
        
            </table>
        
            <h3 class="modal__descr-title">About</h3>
            <p class="modal__descr" id="overview">${overview}</p>
        
            <div class="modal__button-container">
                <button type="button" id="WATCHED" class="modal__button">ADD TO WATCHED</button>
                <button type="button" id="QUEUE" class="modal__button">ADD TO QUEUE</button>
            </div>
        
        </div>
    </div>`;
}






function onClickClose(event) {
  if (
    event.target.classList.contains('backdrop') ||
    event.target.classList.contains('modal__close-button') |
    event.target.classList.contains('modal_icon')) {
    closeModal();
  }
}

function onEscClose(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function closeModal() {
    refs.backdropFilmModal.classList.add('backdrop__is-hidden');  
    refs.modalFilmInfo.classList.add('modal__is-hidden');
    //refs.body.classList.remove('no-scroll');
    document.removeEventListener('click', onClickClose);
    document.removeEventListener('keydown', onEscClose);
}
