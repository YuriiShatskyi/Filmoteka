const API_KEY = 'ae41ac8beda98b2e2d51e160e21365e8';
const BASE_URL = 'https://api.themoviedb.org/3';

const modalTrailer = document.querySelector(".modal-movie");

async function getTrailerByID(movieID) {
  try {
      const response = await fetch(`${BASE_URL}/movie/${movieID}/videos?api_key=${API_KEY}&language=en-US`);
      const result = await response.json();
    let key = result.results[0].key;
    console.log(key);
        renderTrailer(key);
  } catch (error) {
        console.error(error);
  }
}

function renderTrailer(key) {
  
  const iframe = document.createElement("iframe");
  iframe.width = "640 px";
  iframe.height = "480 px";
  iframe.src = `https://www.youtube.com/embed/${key}?`
  iframe.frameborder="0" 
  iframe.allowfullscreen
  console.log(iframe);
  
  modalTrailer.append(iframe);
}

export function watchedTrailer(data) {
   
    document.querySelector('#trailer').addEventListener('click', () => {
        // console.log(data);
       const movieID = data.id
        
        console.log(movieID);
        // return movieID
      console.log(getTrailerByID(movieID));

    
    
    })
}






