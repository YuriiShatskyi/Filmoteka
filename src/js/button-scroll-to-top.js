/*
scroll-top-button
*/
import { refs } from "./refs";

// const refs = {
//   btnScrollTop: document.querySelector('.js-button-scroll-top'),
// }

refs.btnScrollTop.addEventListener('click', onScrollBtnClick)

  window.onscroll = () => {
  if (window.scrollY > 700) {
    refs.btnScrollTop.classList.add('is-show')
  } else if (window.scrollY < 700) {
    refs.btnScrollTop.classList.remove('is-show')
  }
}

function onScrollBtnClick() {
    window.scrollTo(0,0)
}