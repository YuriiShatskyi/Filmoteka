import { addToStorage, getFromStorage } from './storage';
 
const refs = {
    header: document.querySelector('#my-library'),
    btnWatched: document.querySelector('#watched'),
    btnQueue: document.querySelector('#queue'),
}
 
export function onLibrary() {
    const reference = {
        btnList: document.querySelector('.library__btn-list'),
    };
    refs.filterContainer.classList.add('is-hidden');
    reference.btnList.classList.remove('visually-hidden');
    refs.filterWrapper.classList.add('visually-hidden');
    reference.btnList.addEventListener('click', onClickBtn);
}
 
function onClickBtn(event) {
  if (event.target === refs.btnWatched) {
    event.target.classList.add('btn__library--active');
    refs.btnQueue.classList.remove('btn__library--active');
    smoothScroll();
    renderWatched();
  } else if (event.target === refs.btnQueue) {
    event.target.classList.add('btn__library--active');
    refs.btnWatched.classList.remove('btn__library--active');
    smoothScroll();
    renderQueue();
  }
}
 

 
export function onCheckButtonLibrary() {
  const refs = {
    btnWatched: document.querySelector('#watched'),
    btnQueue: document.querySelector('#queue'),
  };
 
  if (refs.btnWatched.classList.contains('btn__library--active')) {
    renderWatched();
  } else {
    renderQueue();
  }
}

