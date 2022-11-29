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
const refs = {
    openAuthModalBtn: document.querySelector("[data-auth-modal-open]"),
    closeAuthModal: document.querySelector("[data-auth-modal-close]"),
    modalAuth: document.querySelector("[data-auth-modal]"),
    body: document.querySelector("body"),
  };
  console.log(refs.openAuthModalBtn);
  renderAuthModal();
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
const auth = getAuth();
const googleBtn = document.querySelector('#google-sign-in');
const signInBtn = document.querySelector('.auth__btn-sign-in');
const signUpBtn = document.querySelector('.auth__btn-sign-up');
var isSignIn = false;


refs.openAuthModalBtn.addEventListener("click", openModalAuth);
function openModalAuth() {
    refs.modalAuth.classList.toggle("visually-hidden");
    refs.body.classList.toggle("no-scroll");
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
});




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
function renderAuthModal(){
  refs.modalAuth.innerHTML = `
  <div class ="auth__modal">
  <div class="auth__modal-wrapper" content-auth-modal>
  <p class="auth__paragraph">You can use Google Account for authorization:</p>
  <div>
      <button class="auth__btn auth__google-btn" id="google-sign-in" sign-in-with-google>Sign in with Google</button>
  </div>
  <p class="auth__paragraph">Or login to the app using your e-mail and password:</p>
  <form class="auth__form">
      <label class="auth__label">Your username <input type="text" class="auth__input auth__input-username" id="auth__username"></label>
      <label class="auth__label">Your email <input type="email" class="auth__input auth__input-email" id="auth__email"></label>
      <label class="auth__label">Your password <input type="password" class="auth__input auth__input-password" id="auth__password"></label>
      </form>
      <div class="auth__container">
          <button class="auth__btn-sign-in auth__btn" id="sign-in" >Sign In</button>
          <button class="auth__btn-sign-up auth__btn" sign-up>Sign Up</button>
      </div>
  
  </div>
</div>`
}