import { removeMovie } from './remove-movie';

const listFilmToQueue = [];
const STORAGE_KEY = "queue-films";

export function addFilmToQueue(data) {
    const filmToAdd = data;
    const addToQueueButton = document.querySelector('#queue');
   
    addToQueueButton.addEventListener('click', () => {
       const filmToAdd = data; 

       if (addToQueueButton.textContent === 'add to queue') {
           
           addToQueueButton.textContent = 'remove from queue';
                              
        if (!listFilmToQueue.includes(filmToAdd)) {
            listFilmToQueue.push(filmToAdd)
        }
            console.log(listFilmToQueue)
           localStorage.setItem(STORAGE_KEY, JSON.stringify(listFilmToQueue))
           return listFilmToQueue;
       }
       
       if (addToQueueButton.textContent === 'remove from queue') {
           
           removeMovie(listFilmToQueue, filmToAdd)
           addToQueueButton.textContent = 'add to queue';

            localStorage.setItem(STORAGE_KEY, JSON.stringify(listFilmToQueue))
           return listFilmToQueue;
       }      

    }
    )
}