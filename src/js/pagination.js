
import { API_GENRES } from "./genres-list";
import { refs } from "./refs";

import { currentURL, fetchSearchingFilms, fetchTrendingFilms } from "./fetch";
import { renderMarkup } from "./render-card-markup";
import { searchQuery } from "./search-film";

const API_KEY = 'ae41ac8beda98b2e2d51e160e21365e8';
const BASE_URL = 'https://api.themoviedb.org/3';



export let page = 1;

const pagination = document.querySelector(".pagination ul");

let callback = '';
let totalPages = 10;

// виклик функції з передачею параметрів і додаванням внутрішнього елемента, який є тегом ul
pagination.innerHTML = createPagination(totalPages, page);

    
export default function createPagination(totalPages, page) {
    
  let li = '';
  let activeLi;
  let beforePage = page - 1;
  let afterPage = page + 1;
  let beforeToPage = page - 2;
  let afterToPage = page + 2;
  

  if (page > 1) {
    li += `<li class="btn prev">Prev</li>`;
  }
  if (page > 1) {
    li += `<li class="first number">1</li>`;
  }
  if (page > 4) {
    li += `<li class="dots">...</li>`;
  }
  // if (page > 3) {
  //   li += `<li class="number">${beforeToPage}</li>`;
  // }
  if (page > 2) {
    li += `<li class="number">${beforePage}</li>`;
  }
  li += `<li class="number">${page}</li>`;
  if (totalPages - 1 > page) {
    li += `<li class="number">${afterPage}</li>`;
  }
  // if (totalPages - 2 > page) {
  //   li += `<li class="number">${afterToPage}</li>`;
  // }
  if (totalPages - 3 > page) {
    li += `<li class="dots">...</li>`;
  }
  if (totalPages > page) {
    li += `<li class="last number">${totalPages}</li>`; 
    
    li += `<li class="btn next" ${page + 1}>Next</li>`;
  } 
 
  createPagination.innerHTML = li; //додаю  li в  pagination
  return li; //повертаю li
}
pagination.addEventListener('click', handlerPagination);

function getCurrentURL() { 
  if (currentURL == "trendingFilmsURL" ){
  callback = fetchTrendingFilms();
  return callback
}
if (currentURL == "searchingFilmsURL" ){
  callback = fetchSearchingFilms();
  return callback
}

}
export function handlerPagination(evt) {
  if (evt.target.nodeName !== 'LI') {
    return
  }
  if (evt.target.textContent === "Prev") {
    page -= 1;
    getCurrentURL();
    renderMarkup(callback, refs.gallery);
    pagination.innerHTML = createPagination(totalPages, page);
    console.log(page);
   
    return;
  }
  if (evt.target.textContent === "Next") {
    page += 1;
    getCurrentURL();
    renderMarkup(callback, refs.gallery);
    pagination.innerHTML = createPagination(totalPages, page);
    console.log(page);
    return;
  }
  if (evt.target.textContent === "...") {
    return
  }
  page = evt.target.textContent;
  getCurrentURL();
    renderMarkup(callback, refs.gallery);
  console.log(page);
   window.scrollTo({
    top: 0,
  });
}
   





