import "./fetch";
import "./render-card-markup";
import "./search-film";

import { hideLoader, showLoader } from "./loader";

import { addFilmToWatched } from './add-to-watched'
import { addFilmToQueue } from './add-to-queue'

import { watchedTrailer } from "./you-tube";
import { refs } from "./refs";

const API_KEY = 'ae41ac8beda98b2e2d51e160e21365e8';
const BASE_URL = 'https://api.themoviedb.org/3';


refs.openModalE.addEventListener('click', onMovieCLick);


function onMovieCLick(event) {
  
  refs.modalFilmInfo.innerHTML = '';
  
  event.preventDefault();  
    
    
    const isCard = event.target.closest('.gallery__poster-card');

    

    if (!isCard) {
        return;
    }
    
    const movieId = isCard.getAttribute('id');
    
    showLoader();      
    
    openModal();
  

    moviesByID(movieId);    

    document.addEventListener('keydown', onEscClose);
    document.addEventListener('click', onClickClose);
}

function openModal() {
  refs.backdropFilmModal.classList.remove('backdrop__is-hidden');  
  refs.modalFilmInfo.classList.remove('modal__is-hidden');
  refs.body.classList.add('no-scroll');
}


async function getMoviesByID(movieID) {
  try {
        const response = await fetch(`${BASE_URL}/movie/${movieID}?api_key=${API_KEY}&language=en-US`);
        const result = await response.json();
        return result;
  } catch (error) {
        console.error(error);
  }
}


export function moviesByID(movieID) {
    
    getMoviesByID(movieID).then(data => {

      createModalFilmInfoMarkup(data);

      addFilmToWatched(data);
      watchedTrailer(data)
      addFilmToQueue(data);


        hideLoader();  
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
     <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="currentColor"
        class="modal__icon"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
        />
      </svg>
    </button>

    
        <div class="modal__card">
        <div class="modal__wrapper">
            <img class="modal__img" src="${poster_path ? `${base_url}${size}${poster_path}` : imgPlaceholder}" alt="${title}">
        </div>
        
        <div class="modal__filminfo">
            <h2 class="modal__title">${original_title}</h2>
        
            <table class="modal-movie-properties">
                <tr class="modal-movie-properties__info">
                    <td class="modal-movie-properties__name">Vote / Votes</td>
                    <td class="modal-movie-properties__value"><span id="vote" class="modal-movie-properties__vote">${vote_average.toFixed(1)}</span>  / 
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

            <button type="button" id="trailer" class="modal__button">watch trailer</button>
        
            <div class="modal__button-container">
                <button type="button" id="watched" class="modal__button">add to watched</button>
                <button type="button" id="queue" class="modal__button">add to queue</button>
            </div>
        
        </div>
    </div>`;
}


function onClickClose(event) {
  if (
    event.target.classList.contains('backdrop') ||
    event.target.classList.contains('modal__close-button') |
    event.target.classList.contains('modal__icon')) {
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
  refs.body.classList.remove('no-scroll');
  refs.iframe.classList.add('backdrop__is-hidden'); 
  refs.iframe.removeAttribute('src');
    document.removeEventListener('click', onClickClose);
    document.removeEventListener('keydown', onEscClose);
}


