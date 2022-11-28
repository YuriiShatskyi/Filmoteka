 
 
export {
  checkMovieInQueue, checkMovieInWatched, checkStorageLibrary,
  movieIsInWatchedInModal, movieIsInQueueInModal, clickToWatchedInModal,
  clickToQueueInModal, clickToWatchedOnCard, clickToQueueOnCard
};
import { currentDataMovie, movieId } from './modal';
import { addToStorage, getFromStorage, removeFromStorage } from './storage';
 
let dataFilmsByWatched = [];
let dataFilmsByQueue = [];
 
 
const checkStorageLibrary = () => {
  if (getFromStorage('dataFilmsByWatched')) {
    dataFilmsByWatched = getFromStorage('dataFilmsByWatched');
  }
 
  if (getFromStorage('dataFilmsByQueue')) {
    dataFilmsByQueue = getFromStorage('dataFilmsByQueue');
  }
};
 
const movieIsInWatchedInModal = refBtnWatched => {
  if (getFromStorage('dataFilmsByWatched')) {
    dataFilmsByWatched = getFromStorage('dataFilmsByWatched');
    if (dataFilmsByWatched.includes(movieId )) {
      refBtnWatched.classList.add('movie-data__button_active');
    }
  }
};
 
const movieIsInQueueInModal = refBtnQueue => {
  if (getFromStorage('dataFilmsByQueue')) {
    dataFilmsByQueue = getFromStorage('dataFilmsByQueue');
    if (dataFilmsByQueue.includes(movieId )) {
      refBtnQueue.classList.add('movie-data__button_active');
    }
  }
};
 
const checkMovieInWatched = movieId => {
  if (getFromStorage('dataFilmsByWatched')){
    if (dataFilmsByWatched.includes(movieId )) {
      return 'movie-data__button movie-data__button_inactive cards__item-btn movie-data__button_active';
    }
   
  } else {
  }
  return 'movie-data__button movie-data__button_inactive cards__item-btn';
}
 
const checkMovieInQueue = movieId => {
  if (getFromStorage('dataFilmsByQueue')){
    if (dataFilmsByQueue.includes(movieId )) {
      return 'movie-data__button movie-data__button_inactive cards__item-btn movie-data__button_active';
    }
   
  } else {
  }
  return 'movie-data__button movie-data__button_inactive cards__item-btn';
}
 
const clickToWatchedInModal = event => {
  if (event.target.dataset.btn === 'watched') {
    const refBtnQueue = event.target.closest('li').nextElementSibling.firstElementChild;
    event.target.classList.toggle('movie-data__button_active');
    if (event.target.classList.contains('movie-data__button_active')) {
      if (dataFilmsByWatched.includes(movieId)) {
        return;
      }    
      dataFilmsByWatched.push(movieId);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);
      if (dataFilmsByQueue.includes(movieId)) {
        const currentIndex = dataFilmsByQueue.indexOf(movieId);
        dataFilmsByQueue.splice(currentIndex, 1);
        addToStorage('dataFilmsByQueue', dataFilmsByQueue);
        refBtnQueue.classList.toggle('movie-data__button_active');
      }
    }
    else {
      const currentIndex = dataFilmsByWatched.indexOf(movieId);
      dataFilmsByWatched.splice(currentIndex, 1);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);
    }
  }
};
 
const clickToQueueInModal = event => {
  if(event.target.dataset.btn === 'queue'){
    const refBtnWatched = event.target.closest('li').previousElementSibling.firstElementChild;
    event.target.classList.toggle('movie-data__button_active');
    if (event.target.classList.contains('movie-data__button_active')) {
      if (dataFilmsByQueue.includes(movieId)) {
        return;
      }    
      dataFilmsByQueue.push(movieId);
      addToStorage('dataFilmsByQueue', dataFilmsByQueue);
      if (dataFilmsByWatched.includes(movieId)) {
        const currentIndex = dataFilmsByWatched.indexOf(movieId);
        dataFilmsByWatched.splice(currentIndex, 1);
        addToStorage('dataFilmsByWatched', dataFilmsByWatched);
        refBtnWatched.classList.toggle('movie-data__button_active');
      }
    }
    else {
      const currentIndex = dataFilmsByQueue.indexOf(movieId);
      dataFilmsByQueue.splice(currentIndex, 1);
      addToStorage('dataFilmsByQueue', dataFilmsByQueue);
    }
  }
};
 
const clickToWatchedOnCard = async event => {
  if (event.target.dataset.btn === 'watched') {
    const refBtnQueue = event.target.closest('li').nextElementSibling.firstElementChild;    
    event.target.classList.toggle('movie-data__button_active');
    const cardsId = +event.target.closest('ul').closest('li').id;    
   
    if (event.target.classList.contains('movie-data__button_active')) {
      if (dataFilmsByWatched.includes(movieId)) {
        return;
      }  
      dataFilmsByWatched.push(cardsId);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);      
      if (dataFilmsByQueue.includes(cardsId)) {          
        const currentIndex = dataFilmsByQueue.indexOf(cardsId);
        dataFilmsByQueue.splice(currentIndex, 1);
        addToStorage('dataFilmsByQueue', dataFilmsByQueue);
        refBtnQueue.classList.toggle('movie-data__button_active');
              if (getFromStorage('mainState') === "Library") {
        choiceMainRender();
      }  
      }      
    } else {
      const currentIndex = dataFilmsByWatched.indexOf(cardsId);
      dataFilmsByWatched.splice(currentIndex, 1);
      addToStorage('dataFilmsByWatched', dataFilmsByWatched);
      if (getFromStorage('mainState') === "Library") {
        choiceMainRender();
      }  
    }
  }
}
 
const clickToQueueOnCard = async event => {
  if (event.target.dataset.btn === 'queue') {      
    const refBtnWatched = event.target.closest('li').previousElementSibling.firstElementChild;    
    event.target.classList.toggle('movie-data__button_active');
    const cardsId = +event.target.closest('ul').closest('li').id;    
    if (event.target.classList.contains('movie-data__button_active')) {
      if (dataFilmsByQueue.includes(cardsId)) {
        return;
      }
      dataFilmsByQueue.push(cardsId);
      addToStorage('dataFilmsByQueue', dataFilmsByQueue);        
      if (dataFilmsByWatched.includes(cardsId)) {          
        const currentIndex = dataFilmsByWatched.indexOf(cardsId);
        dataFilmsByWatched.splice(currentIndex, 1);
        addToStorage('dataFilmsByWatched', dataFilmsByWatched);
        refBtnWatched.classList.toggle('movie-data__button_active');
              if (getFromStorage('mainState') === "Library") {
        choiceMainRender();
      }  
      }          
    } else {
      const currentIndex = dataFilmsByQueue.indexOf(cardsId);
      dataFilmsByQueue.splice(currentIndex, 1);
      addToStorage('dataFilmsByQueue', dataFilmsByQueue);
      if (getFromStorage('mainState') === "Library") {
        choiceMainRender();
      }      
    }
  }
}
 

