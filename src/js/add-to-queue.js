const listFilmToQueue = [];
const STORAGE_KEY = "queue-films";

export function addFilmToQueue(data) {
   
    document.querySelector('#queue').addEventListener('click', () => {
          
        const filmToAdd = data;              
             
        if (!listFilmToQueue.includes(filmToAdd)) {
            
                listFilmToQueue.push(filmToAdd)
        }
        console.log(listFilmToQueue)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(listFilmToQueue))
    })
}
