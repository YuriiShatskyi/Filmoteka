import { initializeApp } from "firebase/app";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
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
const database = getDatabase(app);
const auth = getAuth();
const signInBtn = document.querySelector('.auth__btn-sign-in');
const signUpBtn = document.querySelector('.auth__btn-sign-up');


refs.openAuthModalBtn.addEventListener("click", openModalAuth);
function openModalAuth() {
    refs.modalAuth.classList.toggle("visually-hidden");
    refs.body.classList.toggle("no-scroll");
    document.addEventListener('keydown', onEscCloseAuth);
}


signUpBtn.addEventListener("click", (e) =>{
  let email = document.getElementById('auth__email').value;
  let password = document.getElementById('auth__password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid),{
          email: email
      })
      alert('user created!');
      console.log(user);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    


})
});


signInBtn.addEventListener("click", (e) =>{
  let email = document.getElementById('auth__email').value;
  let password = document.getElementById('auth__password').value;


  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user;

        const dt = new Date();
         update(ref(database, 'users/' + user.uid),{
          last_login: dt,
        })

        alert('User loged in!');
        closeModal();
        renderMyAccount();
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


document.addEventListener('click', onClickCloseAuth);

function closeModal() {
  refs.modalAuth.classList.add("visually-hidden");
  refs.body.classList.toggle("no-scroll");
}

function renderAuthModal(){
    refs.modalAuth.innerHTML = `
  <div class ="auth__modal">
  <div class="auth__modal-wrapper" content-auth-modal>
  <p class="auth__paragraph">Login to the app using your e-mail and password:</p>
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
    const user = auth.currentUser;
    const email = user.email;

    refs.modalAuth.innerHTML = `
    <div class ="auth__modal auth__account-modal">
      <div class="auth__account-box">
        <label for=""><p class="auth__account-paragraph">Email: ${email}</p></label>
        <div class="auth__account-wrapper">
        <button class="auth__btn auth__reset-btn">Reset password</button>
        <button class="auth__btn auth__logout-btn">Log Out</button>
        </div>
      </div>
    </div>
    `
    const logOut = document.querySelector('.auth__logout-btn');
    const resetPassword = document.querySelector('.auth__reset-btn');

    logOut.addEventListener('click',(e)=>{

      signOut(auth).then(() => {
        alert('User loged out');
        closeModal();
        renderAuthModal();
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    
           alert(errorMessage);
      });
    
    });

    resetPassword.addEventListener('click', (e)=>{
      sendPasswordResetEmail(auth, email)
        .then(() => {
            alert(`Password reset email was sent to ${email}!`);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
    );
};