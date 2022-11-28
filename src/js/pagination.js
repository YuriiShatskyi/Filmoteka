// async function getData() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
//     const data = await response.json();
//     return data;
// }
// async function main() {
//     const postsData = await getData();
//     let currentPage = 1;
//     let rows = 10;

//     function displayList(arrData, rowPerPage, page) {
//         const gallery = document.querySelector('.gallery');
//     //         const newMarkup = movies.map(movie => {
//     //             let genres = movie.genre_ids.map(genre_id => { return (API_GENRES.find(genre => genre.id === genre_id)).name }).join(', ');
       
//     //             return `
//     //  <a class="gallery__poster-card" href="">
//     //   <img class="poster-card__image" src="https://image.tmdb.org/t/p/w780${movie.poster_path
//     //                 }" alt="" loading="lazy" />
//     //   <div class="poster-card__info">
//     //     <p class="info-item title">
//     //       ${movie.original_title}
//     //     </p>
//     //     <p class="info-item">
//     //     ${genres} | ${movie.release_date.substring(0, 4)}
//     //     </p>
  
//     //   </div>
//     //   </a>
//     // `;
//     // })
//     //             .join('');
//             gallery.innerHTML = newMarkup;
//         };
//     async function fetchTrendingFilms(page) {
//         try {
//             const response = await fetch(
//                 `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
//             );
//             const result = await response.json();
//             console.log(result.results);
//             return result.results;
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     function renderMarkup() {
//         fetchTrendingFilms(page).then(movies => {

//             // addPage()
    
//             const newMarkup = movies
//                 .map(movie => {
//                     let genres = movie.genre_ids.map(genre_id => { return (API_GENRES.find(genre => genre.id === genre_id)).name }).join(', ');
       
//                     return `
//  <a class="gallery__poster-card" href="">
//   <img class="poster-card__image" src="https://image.tmdb.org/t/p/w780${movie.poster_path
//                         }" alt="" loading="lazy" />
//   <div class="poster-card__info">
//     <p class="info-item title">
//       ${movie.original_title}
//     </p>
//     <p class="info-item">
//     ${genres} | ${movie.release_date.substring(0, 4)}
//     </p>
  
//   </div>
//   </a>
// `;
//                 })
//                 .join('');
//             refs.gallery.innerHTML = newMarkup;
//         });
//     }

//     renderMarkup();

//     newMarkup.innerHTML = "";
//     page--;
//     const start = rowPerPage * page;
//     const end = start + rowPerPage;
//     const paginatedData = arrData.slice(start, end);

//     paginatedData.forEach(element => {
//         const newMarkup = document.createElement("div");
//         newMarkup.classList.add("gallery");
//         newsMarkup.appendChild(newMarkup);
        
//     });

//     function displayPagination() {
//         const pagination = document.querySelector('.pagination');
//         const pageCount = Math.ceil(arrData.length / rowPerPage);
//         const ul = document.createElement("ul");
//         ul.classList.add('pagination__list');

//         for (let i = 0; i < pagesCount; i++) {
//             const li = displayPaginationBtn(i + 1);
//             ul.appendChild(li);
//         }
//         pagination.appendChild(ul);
//     }
//     function displayPaginationBtn(page) {
//         const li = document.createElement("li");
//         li.classList.add('pagination__item');
//         li.innerText = page;

//         li.addEventListener('click', () => {
//             currentPage = page;
//             displayList(postsData, rows, currentPage)
//         })
//         return li;
//     }

// }
//     displayList(postsData, rows, currentPage);
//     displayPagination(postsData, rows);
// main()


// import { fetchTrendingFilms } from './fetch';
// import { renderMarkup } from './fetch';


const pagination = document.querySelector(".pagination ul");
// const nextPage = document.querySelector(".btn next");
// const prevPage = document.querySelector(".btn prev");

let totalPages = 10;
let page = 2;
//виклик функції з передачею параметрів і додаванням внутрішнього елемента, який є тегом ul
pagination.innerHTML = createPagination(totalPages, page);
// nextPage.addEventListener('click', onLoadMore);
// function onLoadMore() {
//     addPage()
//     fetchTrendingFilms()
//         .then(renderMarkup)   
//     }
//     function addPage() {  
//         page += 1;       
//     }
// prevPage.addEventListener('click', backOnLoadMore);
// function backOnLoadMore() {
//     resetPage()
//     fetchTrendingFilms()
//         .then(renderMarkup)   
// }
//     function resetPage() { 
//         page = 1;
//     }
function createPagination(totalPages, page) {
        // fetchTrendingFilms()
        // .then(renderMarkup)
  let li = '';
  let activeLi;
  let beforePage = page - 1;
  let afterPage = page + 1;

  if(page > 1){ //показати наступну кнопку, якщо значення сторінки більше 1
    li += `<li class="btn prev"  ${page - 1})><span class="left">Prev</span></li>`;
  }
  if(page > 2){ //якщо значення сторінки менше 2, додаємо 1 після  кнопки
    li += `<li class="first number" ><span>1</span></li>`;
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
    li += `<li class="number ${activeLi}" ><span>${pageLength}</span></li>`;
  }
  if(page < totalPages - 1){ //значення totalPage на -1, тоді відображаю останню li або сторінку
    if(page < totalPages - 2){ //значення totalPage на -2, додаю (...)
      li += `<li class="dots"><span>...</span></li>`;
    }
    li += `<li class="last number" ><span>${totalPages}</span></li>`;
  }
  if (page < totalPages) { //кнопка, якщо значення сторінки менше totalPage(20)
    li += `<li class="btn next"  ${page + 1})><span class="right">Next</span></li>`;
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
  
