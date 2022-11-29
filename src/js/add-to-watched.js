import {removeMovie} from './remove-movie'

const listFilmToWatched = [];
const STORAGE_KEY = "watched-films";

export function addFilmToWatched(data) {
    const filmToAdd = data;
    const addToWatchedButton = document.querySelector('#watched');
   
    addToWatchedButton.addEventListener('click', () => {
       const filmToAdd = data; 

       if (addToWatchedButton.textContent === 'add to watched') {
           
           addToWatchedButton.textContent = 'remove from watched';
                              
        if (!listFilmToWatched.includes(filmToAdd)) {
            listFilmToWatched.push(filmToAdd)
        }
                console.log(listFilmToWatched)
           localStorage.setItem(STORAGE_KEY, JSON.stringify(listFilmToWatched))
           return listFilmToWatched;
       }
       
       if (addToWatchedButton.textContent === 'remove from watched') {
           
           removeMovie(listFilmToWatched, filmToAdd)
           addToWatchedButton.textContent = 'add to watched';

            localStorage.setItem(STORAGE_KEY, JSON.stringify(listFilmToWatched))
           return listFilmToWatched;
       }      

    }
    )
}




