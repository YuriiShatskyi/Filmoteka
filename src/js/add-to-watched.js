const listFilmToWatched = [];
const STORAGE_KEY = "watched-films";

export function addFilmToWatched(data) {
   
    document.querySelector('#watched').addEventListener('click', () => {
          
        const filmToAdd = data;              
             
        if (!listFilmToWatched.includes(filmToAdd)) {
            
                listFilmToWatched.push(filmToAdd)
        }
        console.log(listFilmToWatched)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(listFilmToWatched))
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
    if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}





