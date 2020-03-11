
function displayMenu() {
    document.querySelector(".option-menus").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.option-space')) {
        if (document.querySelector(".option-menus").classList.contains('show')) {
            document.querySelector(".option-menus").classList.remove('show');
        }
    }
}

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});