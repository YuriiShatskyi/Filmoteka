import {removeMovie} from './remove-movie'

const STORAGE_KEY = "watched-films";
let listFilmToWatched;
const filmListFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
listFilmToWatched = filmListFromStorage || [];


export function addFilmToWatched(data) {
    
    const filmToAdd = data;
    const addToWatchedButton = document.querySelector('#watched');
        
if (listFilmToWatched.some(film=> film.id==data.id)) {
            addToWatchedButton.textContent = 'remove from watched';  
        }  

   
    addToWatchedButton.addEventListener('click', () => {
        const filmToAdd = data; 
             
        addToWatchedButton.textContent = 'remove from watched';

        if (!listFilmToWatched.some(film => film.id===data.id)) {
            listFilmToWatched.push(filmToAdd);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(listFilmToWatched));
            return listFilmToWatched;              
        }   else {
            
            const filmToRemove = listFilmToWatched.find(el=> el.id===data.id)

            removeMovie(listFilmToWatched, filmToRemove)
               
            addToWatchedButton.textContent = 'add to watched';

            localStorage.setItem(STORAGE_KEY, JSON.stringify(listFilmToWatched))
            return listFilmToWatched;
       }   
                     
    })         
    
}

    






