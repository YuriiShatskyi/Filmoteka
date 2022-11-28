const listFilmToWatched = [];
const STORAGE_KEY = "watched-films";
const listFilmToQueued = [];
const QUEUE_KEY = "queued-films";

export function addFilmToWatched(data) {
   
    document.querySelector('#WATCHED').addEventListener('click', () => {
          
        const filmToAdd = data;              
             
        if (!listFilmToWatched.includes(filmToAdd)) {
            
            listFilmToWatched.push(filmToAdd)
            removeMovie(listFilmToQueued, filmToAdd)
        }
       
        
        console.log('WATCHED -', listFilmToWatched)
        console.log('QUEUE -', listFilmToQueued)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(listFilmToWatched))
        localStorage.setItem(QUEUE_KEY, JSON.stringify(listFilmToQueued))
    })
}

export function addFilmToQueue(data) {
   
    document.querySelector('#QUEUE').addEventListener('click', () => {
          
        const filmToAdd = data;              
             
        if (!listFilmToQueued.includes(filmToAdd)) {
            
            listFilmToQueued.push(filmToAdd)
            removeMovie(listFilmToWatched, filmToAdd)
        }
        
        console.log('QUEUE -', listFilmToQueued)
        console.log('WATCHED -', listFilmToWatched)
        localStorage.setItem(QUEUE_KEY, JSON.stringify(listFilmToQueued))
        localStorage.setItem(STORAGE_KEY, JSON.stringify(listFilmToWatched))
    })
}


function removeMovie(arr, value) {
  const index = arr.indexOf(value);
    arr.splice(index, 1);
  return arr;
}






