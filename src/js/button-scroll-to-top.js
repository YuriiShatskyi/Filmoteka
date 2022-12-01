import { refs } from "./refs";

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