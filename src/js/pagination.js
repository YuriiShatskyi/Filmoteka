
import { API_GENRES } from "./genres-list";
import { refs } from "./refs";

import { currentURL, fetchSearchingFilms, fetchTrendingFilms } from "./fetch";
import { renderMarkup } from "./render-card-markup";






export let page = 1;

const pagination = document.querySelector(".pagination ul");

let callback = '';
let totalPages = 30;

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
    li += `<li class="first number ${activeLi}" >1</li>`;
  }
  if (page > 4) {
    li += `<li class="dots">...</li>`;
  }
  if (page > 3) {
    li += `<li class="number ${activeLi}">${beforeToPage}</li>`;
  }
  if (page > 2) {
    li += `<li class="number ${activeLi}">${beforePage}</li>`;
  }
  li += `<li class="number ${activeLi}">${page}</li>`;
  if ( page < totalPages - 1) {
    li += `<li class="number ${activeLi}">${afterPage}</li>`;
  }
  if (totalPages - 2 > page) {
    li += `<li class="number ${activeLi}">${afterToPage}</li>`;
  }
  if ( page < totalPages - 1) {
    li += `<li class="dots">...</li>`;
  }
  if ( page < totalPages) {
    li += `<li class="last number ${activeLi}">${totalPages}</li>`; 
    
    li += `<li class="btn next">Next</li>`;
  } 


  pagination.innerHTML = li; //додаю  li в  pagination
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
    page ++ ;
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
   





