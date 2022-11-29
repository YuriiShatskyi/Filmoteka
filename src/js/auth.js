import { initializeApp } from "firebase/app";
import {  getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAtpKsHrzjzgSonJI46WHF-o0DqXya7MXc",
  authDomain: "filmoteka-33c7f.firebaseapp.com",
  projectId: "filmoteka-33c7f",
  storageBucket: "filmoteka-33c7f.appspot.com",
  messagingSenderId: "353866619505",
  appId: "1:353866619505:web:2ad78541afaacda309d9d0"
};
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
const auth = getAuth();
const googleBtn = document.querySelector('.auth__google-btn');
const signInBtn = document.querySelector('.auth__btn-sign-in');
const signUpBtn = document.querySelector('.auth__btn-sign-up');
const openModalBtn = {}
var isSignIn = false;
const refs = {
    openAuthModal: document.getElementById("sign-in"),
    closeAuthModal: document.querySelector("[data-auth-modal-close]"),
    modalAuth: document.querySelector("[data-auth-modal]"),
    body: document.querySelector("body"),
  };
refs.openAuthModal.addEventListener("click", openModalAuth);

function openModalAuth() {
    refs.modalAuth.classList.toggle("visually-hidden");
}

// google sign in
googleBtn.addEventListener("click", (e) =>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    isSignIn = true;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})

//Sign Up
signUpBtn.addEventListener("click", (e) =>{
  var email = document.getElementById('auth__email').value;
  var password = document.getElementById('auth__password').value;
  var username = document.getElementById('auth__username').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     // Signed in 
      const user = userCredential.user;

      set(ref(database, 'users/' + user.uid),{
          username: username,
          email: email
      })

      alert('user created!');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    // ..


})
});
// Sign in with email and password
signInBtn.addEventListener("click", (e) =>{
  var email = document.getElementById('auth__email').value;
  var password = document.getElementById('auth__password').value;


  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        const dt = new Date();
         update(ref(database, 'users/' + user.uid),{
          last_login: dt,
        })

        alert('User loged in!');
        isSignIn = true;
        updateAuth();
        closeModal();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
  });
});
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
function updateAuth() {
  if (isSignIn === true){
    
  } else {
    
  }
}