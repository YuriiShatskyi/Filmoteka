import { API_GENRES } from "./genres-list";

const API_KEY = 'ae41ac8beda98b2e2d51e160e21365e8';
const BASE_URL = 'https://api.themoviedb.org/3';

const refs = {
  gallery: document.querySelector('.gallery'),
  nextPage: document.querySelector('#next-button'),
  prevPage: document.querySelector('#prev-button'),
}

let page = 1;

// Слухачі

refs.nextPage.addEventListener('click', onLoadMore)
refs.prevPage.addEventListener('click', backOnLoadMore)


export async function fetchTrendingFilms() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

function renderMarkup() {
  fetchTrendingFilms().then(movies => {

    // addPage()
    
    const newMarkup = movies.results
      .map(movie => {
let genres = movie.genre_ids.map(genre_id => { return (API_GENRES.find(genre => genre.id === genre_id)).name}).join(', ');
       
        return `
 <a class="gallery__poster-card" href="">
  <img class="poster-card__image" src="https://image.tmdb.org/t/p/w780${
    movie.poster_path
  }" alt="" loading="lazy" />
  <div class="poster-card__info">
    <p class="info-item title">
      ${movie.original_title}
    </p>
    <p class="info-item">
    ${genres} | ${movie.release_date.substring(0, 4)}
    </p>
  
  </div>
  </a>
`;
      })
      .join('');
    refs.gallery.innerHTML = newMarkup;
  });
}

renderMarkup();


// =============================================


// Функція для кнопки "next and back"
function onLoadMore() {
 
    addPage()
    
    fetchTrendingFilms()
        .then(renderMarkup)
       
    
}


function backOnLoadMore() {
    if (page === 1) {
      return
    }
    resetPage()
    fetchTrendingFilms()
        .then(renderMarkup)
       
    
}

//  функція , що б переходити на наступну сторінку
    function addPage() { 
      
      page += 1;
      
            
    }

    // функція що б повернути на одну сторінку назад
    function resetPage() { 
      page -= 1;
     
    }

// Створення цифр пагінації

// function calculateNumbersOfPage() {
//   fetchTrendingFilms().then(pages => {
  
//     const countNumderofPage = Math.ceil(pages.total_results / 20);
    
//     return countNumderofPage
//     })
      
// }

// const numberOfPage = calculateNumbersOfPage();



// function pageNumbers(numberOfPage, page) {
  
//     var shownPages = 3;
//     var result = [];
//     if (page > numberOfPage - shownPages) {
//         result.push(numberOfPage - 2, numberOfPage - 1, numberOfPage);
//     } else {
//         result.push(page, page + 1, page + 2, '...', numberOfPage);
//     }
//     return result;
// }


// console.log(pageNumbers(1000 , 50));
