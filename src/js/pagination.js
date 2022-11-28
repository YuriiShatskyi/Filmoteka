import { fetchTrendingFilms } from './fetch';
import { renderMarkup } from './fetch';


const pagination = document.querySelector(".pagination ul");
const nextPage = document.querySelector(".btn next");
const prevPage = document.querySelector(".btn prev");

let totalPages = 10;
let page = 2;
//виклик функції з передачею параметрів і додаванням внутрішнього елемента, який є тегом ul
pagination.innerHTML = createPagination(totalPages, page);
// nextPage.addEventListener('click', onLoadMore);
// function onLoadMore() {
//     addPage()
//     fetchTrendingFilms()
//         .then(renderMarkup(callback, destination))   
//     }
//     function addPage() {  
//         page += 1;       
//     }
// prevPage.addEventListener('click', backOnLoadMore);
// function backOnLoadMore() {
//     resetPage()
//     fetchTrendingFilms()
//         .then(renderMarkup(callback, destination))   
// }
//     function resetPage() { 
//         page = 1;
// }
    
function createPagination(totalPages, page) {
        // fetchTrendingFilms()
        // .then(renderMarkup(callback, destination))
    
  let li = '';
  let activeLi;
  let beforePage = page - 1;
  let afterPage = page + 1;

  if(page > 1){ //показати наступну кнопку, якщо значення сторінки більше 1
    li += `<li class="btn prev"  "createPagination(totalPages, ${page - 1})"><span class="left">Prev</span></li>`;
  }
  if(page > 2){ //якщо значення сторінки менше 2, додаємо 1 після  кнопки
    li += `<li class="first number" "createPagination(totalPages, 1)"><span>1</span></li>`;
    if(page > 3){//якщо значення сторінки більше 3, додаю (...) після першої лі або сторінки
      li += `<li class="dots"><span>...</span></li>`;
    }
  }
  // скільки сторінок або li відображається перед li
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // скільки сторінок або li відображається після  li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage  = afterPage + 1;
  }
  for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
    if (pageLength > totalPages) { //якщо довжина більша за загальну довжину сторінки
      continue;
    }
    if (pageLength == 0) { //якщо довжина дорівнює 0, додайте +1 до значення довжини
      pageLength = pageLength + 1;
    }
    if(page == pageLength){ //якщо сторінка дорівнює довжині, тоді призначте 
      activeLi = "active";
    }else{ //else leave empty to the active variable
      activeLi = "";
    }
    li += `<li class="number ${activeLi}" "createPagination(totalPages, ${pageLength})"><span>${pageLength}</span></li>`;
  }
  if(page < totalPages - 1){ //значення totalPage на -1, тоді відображаю останню li або сторінку
    if(page < totalPages - 2){ //значення totalPage на -2, додаю (...)
      li += `<li class="dots"><span>...</span></li>`;
    }
    li += `<li class="last number" "createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }
  if (page < totalPages) { //кнопка, якщо значення сторінки менше totalPage(20)
    li += `<li class="btn next"  "createPagination(totalPages, ${page + 1})")><span class="right">Next</span></li>`;
    }

  pagination.innerHTML = li; //додаю  li в  pagination
  return li; //повертаю li
}
    // page.addEventListener('click', () => {
    // page++;  
  
//   fetchTrendingFilms().then(data => {
//     if (data.length === 0) {
//       length = length + 1;
//    }
//     //  createPagination() 
    
//   });