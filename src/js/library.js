// import "./fetch"
// const refs = {
//   queueBtn: document.querySelector('.queue-btn'),
//     watchedBtn: document.querySelector('.wached-btn'),

//     // === додати в модалку

//     // addToQueueBtn: document.querySelector('#QUEUE'),
//     // addToWatchedBtn: document.querySelector('#WATCHED'),
  
// }

// // === додати в модалку
// // let queueArr = [];

// refs.queueBtn.addEventListener('click', showQueue)

// function showQueue() {
//     refs.watchedBtn.classlist.remove('active')
//     refs.queueBtn.classlist.add('active')
//     renderQueue()
// }

// // === додати в модалку

// // refs.addToQueueBtn.addEventListener('click', addMovie)
// // refs.addToWatchedBtn.addEventListener('click', addMovie)


// function addMovie(movieId) {
//     if (queueArr.includes(movieId)) {
//         return
//     }
//     queueArr.push(movieId)
// }

// function renderQueue() {
//     result.map((movie) => {
//         if (queueArr.includes(movie.id)) {
//             return `
//  <a id=${movie.id} class="gallery__poster-card" href="">
//   <img class="poster-card__image" src="https://image.tmdb.org/t/p/w780${movie.poster_path
//                 }" alt="" loading="lazy" />
//   <div class="poster-card__info">
//     <p class="info-item title">
//       ${movie.original_title}
//     </p>
//     <p class="info-item">
//     ${genres} | ${movie.release_date.substring(0, 4)}
//     </p>
  
//   </div>
//   </a>
// `};
//       })
//       .join('');
//     refs.library.innerHTML = newMarkup;
//   };

        
    

