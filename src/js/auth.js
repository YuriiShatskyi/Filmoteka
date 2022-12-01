import { initializeApp } from "firebase/app";
import {  getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref, update } from "firebase/database";
import { refs } from "./refs";


const firebaseConfig = {
  apiKey: "AIzaSyAtpKsHrzjzgSonJI46WHF-o0DqXya7MXc",
  authDomain: "filmoteka-33c7f.firebaseapp.com",
  databaseURL: "https://filmoteka-33c7f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "filmoteka-33c7f",
  storageBucket: "filmoteka-33c7f.appspot.com",
  messagingSenderId: "353866619505",
  appId: "1:353866619505:web:2ad78541afaacda309d9d0"
};

  renderAuthModal();
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
const auth = getAuth();
const googleBtn = document.querySelector('#google-sign-in');
const signInBtn = document.querySelector('.auth__btn-sign-in');
const signUpBtn = document.querySelector('.auth__btn-sign-up');
const signInBox = document.querySelector('.header__auth-box');
const myAccount = document.querySelector('.auth__my-account');
var isSignIn = false;


refs.openAuthModalBtn.addEventListener("click", openModalAuth);
function openModalAuth() {
    refs.modalAuth.classList.toggle("visually-hidden");
    refs.body.classList.toggle("no-scroll");
}

googleBtn.addEventListener("click", (e) =>{
  signInWithPopup(auth, provider)
  .then((result) => {
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    const user = result.user;
    closeModal();
    renderAuthModal();
    renderMyAccount();
    isSignIn = true;
    
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    
    
    const credential = GoogleAuthProvider.credentialFromError(error);
    
  });
});

signUpBtn.addEventListener("click", (e) =>{
  var email = document.getElementById('auth__email').value;
  var password = document.getElementById('auth__password').value;
  var username = document.getElementById('auth__username').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     
      const user = userCredential.user;

      set(ref(database, 'users/' + user.uid),{
          username: username,
          email: email
      })

      alert('user created!');
      closeModal();
      renderAuthModal();
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    


})
});


signInBtn.addEventListener("click", (e) =>{
  var email = document.getElementById('auth__email').value;
  var password = document.getElementById('auth__password').value;


  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user;

        const dt = new Date();
         update(ref(database, 'users/' + user.uid),{
          last_login: dt,
        })

        alert('User loged in!');
        isSignIn = true;
        closeModal();
        renderAuthModal();

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
  refs.body.classList.toggle("no-scroll");
  renderAuthModal();
  renderMyAccount();
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
  <label class="auth__label"><p class="auth__input-text">Your username</p> <input type="text" class="auth__input auth__input-username" id="auth__username"></label>
  <label class="auth__label"><p class="auth__input-text">Your email</p> <input type="email" class="auth__input auth__input-email" id="auth__email"></label>
  <label class="auth__label"><p class="auth__input-text">Your password</p> <input type="password" class="auth__input auth__input-password" id="auth__password"></label>
      </form>
      <div class="auth__container">
          <button class="auth__btn-sign-in auth__btn" id="sign-in" >Sign In</button>
          <button class="auth__btn-sign-up auth__btn" sign-up>Sign Up</button>
      </div>
  
  </div>
</div>`
}
function renderMyAccount(){

  // if (isSignIn === false){
  //   signInBox.innerHTML = `
  //   <button class="header__auth-btn" data-auth-modal-open>My Account</button>
  // `
  // }
  // if(isSignIn === true){
  //   signInBox.innerHTML = `
  //   <button class="header__auth-btn" data-auth-modal-open>Log Out</button>
  // `
  // }
  
}