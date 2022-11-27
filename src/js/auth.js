import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtpKsHrzjzgSonJI46WHF-o0DqXya7MXc",
  authDomain: "filmoteka-33c7f.firebaseapp.com",
  projectId: "filmoteka-33c7f",
  storageBucket: "filmoteka-33c7f.appspot.com",
  messagingSenderId: "353866619505",
  appId: "1:353866619505:web:2ad78541afaacda309d9d0"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const refs = {
    openAuthModal: document.querySelector("[data-auth-modal-open]"),
    closeAuthModal: document.querySelector("[data-auth-modal-close]"),
    modalAuth: document.querySelector("[data-auth-modal]"),
    body: document.querySelector("body"),
  };

refs.openAuthModal.addEventListener("click", openModalAuth);

function openModalAuth() {
    refs.modalAuth.classList.toggle("visually-hidden");
}

const googleBtn = document.querySelector("[sign-in-with-google]");
// googleBtn.addEventListener("click", signInWithPopup(auth, provider));

function onClickCloseAuth(event) {
  if (
    event.target.classList.contains('backdrop')) {
    closeModal();
  }
}

function onEscCloseAuth(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

document.addEventListener('keydown', onEscCloseAuth);
document.addEventListener('click', onClickCloseAuth);

function closeModal() {
  refs.modalAuth.classList.add("visually-hidden");
}