// script.js
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const icon = document.querySelector('.toggle-password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}

function switchTab(tab) {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const submitBtn = document.querySelector('.submit-btn');

    if (tab === 'login') {
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
        submitBtn.textContent = 'Ingresar';
    } else {
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');
        submitBtn.textContent = 'Registrarse';
    }
}