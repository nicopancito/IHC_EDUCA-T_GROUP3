// script.js

// --- LÓGICA VISUAL (CAMBIAR PESTAÑAS Y VER PASSWORD) ---

function showForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');

    if (formType === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        tabLogin.classList.remove('active');
        tabRegister.classList.add('active');
    }
}

function togglePass(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
}

// --- TU LÓGICA DE BACKEND (LOCALSTORAGE) ---

// 1. Función para manejar el REGISTRO
function handleRegister(event) {
    event.preventDefault(); 

    // Obtener valores de los inputs del formulario de registro
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si existe
    const userExists = users.find(u => u.email === email);

    if (userExists) {
        alert('Este correo ya está registrado. Por favor, inicia sesión.');
        showForm('login'); // Cambiar visualmente a la pestaña login
        return;
    }

    // Crear usuario
    const newUser = {
        name: name,
        email: email,
        password: password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    
    // Limpiar campos y mandar al login
    document.getElementById('registerForm').reset();
    showForm('login');
}

// 2. Función para manejar el LOGIN
function handleLogin(event) {
    event.preventDefault();

    // Obtener valores de los inputs del formulario de login
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        // --- LOGIN EXITOSO ---
        // Guardamos el usuario actual en sesión (opcional, útil para mostrar el nombre luego)
        localStorage.setItem('currentUser', JSON.stringify(validUser));
        
        alert(`¡Bienvenido de nuevo, ${validUser.name}!`);
        
        // CONEXIÓN A INICIO.HTML
        window.location.href = 'Inicio.html'; 
        
    } else {
        // --- LOGIN FALLIDO ---
        const emailExists = users.find(user => user.email === email);
        
        if (emailExists) {
            alert('Contraseña incorrecta.');
        } else {
            alert('No existe una cuenta con este correo. Debes registrarte primero.');
            showForm('register'); // Mandar a registrarse si no existe
        }
    }
}