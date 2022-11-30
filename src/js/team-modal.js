const refs = {
        body: document.querySelector('body'),
        openModalBtn: document.querySelector('[data-modal-open]'),
        closeModalBtn: document.querySelector('[data-modal-close]'),
        modal: document.querySelector('[data-modal]'),
        
        backdrop: document.querySelector('.backdrop__team'),
    };


    refs.openModalBtn.addEventListener('click', onTeamLinkCLick);
	

function onTeamLinkCLick(event) {

    event.preventDefault(); 
    refs.backdrop.classList.remove('backdrop-team__is-hidden'); 
    refs.modal.classList.remove('modal-team__is-hidden');
            console.log('убрался бєк модалки')
    refs.body.classList.add('no-scroll');

    document.addEventListener('keydown', onEscClose);
    document.addEventListener('click', onClickClose);
}





function onClickClose(event) {
  if (
    event.target.classList.contains('backdrop__team') ||
    event.target.classList.contains('modal-team__close-button') |
    event.target.classList.contains('modal__icon')) {
    closeModal();
  }
}


function onEscClose(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}


function closeModal() {
    refs.backdrop.classList.add('backdrop-team__is-hidden');
    refs.modal.classList.add('modal__is-hidden');
    refs.body.classList.remove('no-scroll');
    document.removeEventListener('click', onClickClose);
    document.removeEventListener('keydown', onEscClose);
}
