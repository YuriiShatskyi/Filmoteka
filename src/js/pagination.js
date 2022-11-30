// import './fetch';
// import { renderMarkup } from './render-card-markup';
// import { refs } from './fetch';
import { API_GENRES } from "./genres-list";
import { refs } from "./refs";

const API_KEY = 'ae41ac8beda98b2e2d51e160e21365e8';
const BASE_URL = 'https://api.themoviedb.org/3';

// const refs = {
//   gallery: document.querySelector('.gallery'),
// }

let page = 2;


// import { page } from './fetch';
const pagination = document.querySelector(".pagination ul");
// const nextPage = document.querySelector(".btn next");
// const prevPage = document.querySelector(".btn prev");

let totalPages = 10;
// let page = 6;
// виклик функції з передачею параметрів і додаванням внутрішнього елемента, який є тегом ul
pagination.innerHTML = createPagination(totalPages, page);

    
function createPagination(totalPages, page) {
    
  let li = '';
  let activeLi;
  let beforePage = page - 1;
  let afterPage = page + 1;

  if(page > 1){ //показати наступну кнопку, якщо значення сторінки більше 1
    li += `<li class="btn prev" id = ${page - 1}><span><i class="fas fa-angle-left"></i>Prev</span></li>`;
  }
  if(page > 2){ //якщо значення сторінки менше 2, додаємо 1 після  кнопки
    li += `<li class="first number" id=1><span>1</span></li>`;
    if(page > 3){//якщо значення сторінки більше 3, додаю (...) після першої лі або сторінки
      li += `<li class="dots"><span>...</span></li>`;
    }
  }
  // скільки сторінок або li відображається перед li
  if (page === totalPages) {
    beforePage = beforePage - 2;
  } else if (page === totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // скільки сторінок або li відображається після  li
  if (page === 1) {
    afterPage = afterPage + 2;
  } else if (page === 2) {
    afterPage  = afterPage + 1;
  }
  for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
    if (pageLength > totalPages) { //якщо довжина більша за загальну довжину сторінки
      continue;
    }
    if (pageLength === 0) { //якщо довжина дорівнює 0, додайте +1 до значення довжини
      pageLength = pageLength + 1;
    }
    if(page === pageLength){ //якщо сторінка дорівнює довжині, тоді призначте
      activeLi = "active";
    }else{ //else leave empty to the active variable
      activeLi = "";
    }
    li += `<li class="number ${activeLi}" id=${pageLength}><span>${pageLength}</span></li>`;
  }
  if(page < totalPages - 1){ //значення totalPage на -1, тоді відображаю останню li або сторінку
    if(page < totalPages - 2){ //значення totalPage на -2, додаю (...)
      li += `<li class="dots"><span>...</span></li>`;
    }
    li += `<li class="last number" id=${totalPages}><span>${totalPages}</span></li>`;
  }
  if (page < totalPages) { //кнопка, якщо значення сторінки менше totalPage(20)
    li += `<li class="btn next"  id=${page + 1}><span>Next<i class="fas fa-angle-right"></i></span></li>`;
    }

  createPagination.innerHTML = li; //додаю  li в  pagination
  return li; //повертаю li
}
pagination.addEventListener('click', handlerPagination);

export function handlerPagination(evt) {
  fetchTrendingFilms(fetchSearchingFilms(), refs.gallery)
  page ++
  
  if (evt.target.nodeName !== 'LI') {
    return
  }
  if (evt.target.textContent === "Prev") {
   
    return;
  }
  if (evt.target.textContent === "Next") {
   
    return;
  }
  if (evt.target.textContent === "...") {
    return
  }
  page = evt.target.textContent;

}
export async function fetchTrendingFilms() {
  try {    
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
    );
    const result = await response.json();
    console.log(result.results);
    return result.results;
  } catch (error) {
    console.error(error);
  }
  pagination.innerHTML = createPagination(totalPages, page);
  pagination.addEventListener('click', handlerPagination);
};

export async function fetchSearchingFilms(searchQuery) {
  try {
    const response = await fetch(
           `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`
    );
    const result = await response.json();
    console.log(result.results);
    return result.results;
  } catch (error) {
    console.error(error);
  }
  pagination.innerHTML = createPagination(totalPages, page);

   pagination.addEventListener('click', handlerPagination);
}


export function renderMarkup(callback, destination) {
 
    callback.then(movies => {
  
      // addPage()
      
      const newMarkup = movies
        .map(movie => {
  let genres = movie.genre_ids.map(genre_id => { return (API_GENRES.find(genre => genre.id === genre_id)).name}).join(', ');
         
          return `
   <a id=${movie.id} class="gallery__poster-card" href="">
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
      destination.innerHTML = newMarkup;
      pagination.innerHTML = createPagination(totalPages, page);
      pagination.addEventListener('click', handlerPagination);

    });
};
// pagination.addEventListener('click', onPageBtnClick);
   
  
// function onPageBtnClick(e) {
//   const page = e.target.closest('li.number');
//   if (!page) return;
//   // if (e.target.nodeName === 'UL') return console.log(e.target.nodeName);
//   window.scrollTo({
//     top: 0,
//   });
        
// }
 
        // fetchTrendingFilms(BASE_URL).then(response => {
        //   renderMarkup(response);
          
        // });

        // pagination.innerHTML = createPagination(totalPages,Number(page));
      // }




// pagination.addEventListener('click', onLoadMore);
// function onLoadMore() {
//   renderMarkup(fetchTrendingFilms(), refs.gallery)
//     addPage()
//     }
//     function addPage() {
//         page += 1;
//     }
// pagination.addEventListener('click', backOnLoadMore);
// function backOnLoadMore() {
//   renderMarkup(fetchTrendingFilms(), refs.gallery)
//     resetPage()
// }
//     function resetPage() {
//         page = 1;
// }
// pagination.addEventListener('click', () => {
//   page++;
  
//   fetchTrendingFilms().then(data => {
//     if (data.pageLength === 0) {
//       pageLength = pageLength + 1;
//     }
//     //  createPagination()
    
//   })
// });






