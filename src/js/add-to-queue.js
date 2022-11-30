import { removeMovie } from './remove-movie';

const STORAGE_KEY = "queue-films";

let listFilmToQueue;
const filmListFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
listFilmToQueue = filmListFromStorage || [];


export function addFilmToQueue(data) {
    
    const filmToAdd = data;
    const addToQueueButton = document.querySelector('#queue');
    
if (listFilmToQueue.some(film=> film.id==data.id)) {
            addToQueueButton.textContent = 'remove from queue';  
        }  

   
    addToQueueButton.addEventListener('click', () => {
        const filmToAdd = data; 
             
        addToQueueButton.textContent = 'remove from queue';

        if (!listFilmToQueue.some(film => film.id===data.id)) {
            listFilmToQueue.push(filmToAdd);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(listFilmToQueue));
            return listFilmToQueue;              
        }   else  {
            
            const filmToRemove = listFilmToQueue.find(el=> el.id===data.id)

            removeMovie(listFilmToQueue, filmToRemove)
               
            addToQueueButton.textContent = 'add to queue';

            localStorage.setItem(STORAGE_KEY, JSON.stringify(listFilmToQueue))
            return listFilmToQueue;
       }   
                     
    })         
    
}
