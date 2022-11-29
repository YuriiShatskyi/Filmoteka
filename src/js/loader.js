const refs = {
    bouncer: document.querySelector('.js-bouncer')
}

console.log(refs.bouncer)

export function hideLoader() {
    refs.bouncer.classList.add('is-hidden')
}

export function showLoader() {
    refs.bouncer.classList.remove('is-hidden')
}