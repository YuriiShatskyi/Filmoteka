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







