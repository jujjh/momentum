const loginForm = document.querySelector('#login-form')
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#greeting');
const greetingText = greeting.querySelector('.text');
const logout = greeting.querySelector('.btn')

const HIDDEN_CLASSNAME ='hidden';
const USERNAME_KEY ='username';


function onLoginSubmit(event){
    event.preventDefault();

    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username)
    loginInput.value = '';

    paintGreeting(username);
}

function paintGreeting(username){
    greetingText.innerText =`Hello ${username} :)`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY)
if(savedUsername === null){
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener('submit', onLoginSubmit)
} else{
    paintGreeting(savedUsername);
}

function onLogout() {
    localStorage.removeItem(USERNAME_KEY)
    greeting.classList.add(HIDDEN_CLASSNAME)
    loginForm.classList.remove(HIDDEN_CLASSNAME)

}
logout.addEventListener('click', onLogout)