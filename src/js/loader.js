import { refs } from "./refs";

export function hideLoader() {
    refs.bouncer.classList.add('is-hidden')
}

export function showLoader() {
    refs.bouncer.classList.remove('is-hidden')
}