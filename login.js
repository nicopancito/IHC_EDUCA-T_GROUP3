// --- VARIABLES GLOBALES PARA MANEJO DE SESIÓN TEMPORAL ---
let pendingTwoFactorEmail = null; 

// --- LÓGICA VISUAL (CAMBIAR PESTAÑAS Y VER PASSWORD) ---

function showForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const twoFactorForm = document.getElementById('twoFactorForm'); 
    const toggleButtons = document.querySelector('.toggle-buttons'); 
    const description = document.querySelector('.description');

    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');

    // Resetear estados visuales
    twoFactorForm.style.display = 'none';
    toggleButtons.style.display = 'flex'; // Mostrar botones de pestaña
    description.style.display = 'block'; // Mostrar descripción
    pendingTwoFactorEmail = null;

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

// ----------------------------------------------------------------
// 🔑 LÓGICA DE SEGURIDAD (Hashing + Autenticación 2 Pasos)
// ----------------------------------------------------------------

// 1. Cifrado SHA-256 (Simulación de seguridad Backend)
function hashPassword(password) {
    if (typeof CryptoJS === 'undefined') {
        alert("Error: Librería de seguridad no cargada.");
        return password;
    }
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
}

// 2. Generador de Token (Simulación de 6 dígitos)
function generateTwoFactorToken() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// 3. Mostrar Formulario de 2 Pasos
function showTwoFactorForm(email) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const twoFactorForm = document.getElementById('twoFactorForm');
    const toggleButtons = document.querySelector('.toggle-buttons');
    const description = document.querySelector('.description');

    // Ocultar todo lo que no sea el formulario de 2FA
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    toggleButtons.style.display = 'none'; 
    description.style.display = 'none'; // Ocultamos la descripción para limpiar la vista

    // Configurar y mostrar 2FA
    document.getElementById('two-factor-email-display').textContent = email;
    twoFactorForm.style.display = 'block';
    
    // Guardar email en memoria temporal
    pendingTwoFactorEmail = email;
}

// --- MANEJADORES DE EVENTOS ---

// A. REGISTRO
function handleRegister(event) {
    event.preventDefault(); 

    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(u => u.email === email)) {
        alert('Este correo ya está registrado.');
        showForm('login'); 
        return;
    }

    // Crear usuario con contraseña cifrada y token inicial
    const newUser = {
        name: name,
        email: email,
        password: hashPassword(password),
        twoFactorToken: generateTwoFactorToken() // Generamos un token por defecto
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('¡Cuenta creada! Por seguridad, se te pedirá un código de verificación al ingresar.');
    
    document.getElementById('registerForm').reset();
    showForm('login');
}

// B. LOGIN - PASO 1 (Credenciales)
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const passwordHash = hashPassword(password);

    // Buscar usuario
    const validUser = users.find(user => user.email === email && user.password === passwordHash);

    if (validUser) {
        // --- ÉXITO PASO 1 ---
        // Generar NUEVO token para esta sesión
        const newToken = generateTwoFactorToken();
        
        // Guardar token en localStorage (Simulando envío al servidor)
        validUser.twoFactorToken = newToken;
        
        // Actualizar la lista de usuarios en localStorage
        const userIndex = users.findIndex(u => u.email === email);
        users[userIndex] = validUser;
        localStorage.setItem('users', JSON.stringify(users));

        // 🛑 SIMULACIÓN DE EMAIL 🛑
        alert(`PASO 1 CORRECTO.\n\nSimulación de SMS/Email:\nTu código de acceso es: ${newToken}`);
        
        // Ir al Paso 2
        showTwoFactorForm(email);
        
    } else {
        alert('Correo o contraseña incorrectos.');
    }
}

// C. LOGIN - PASO 2 (Código 2FA)
function handleTwoFactor(event) {
    event.preventDefault();

    const enteredToken = document.getElementById('two-factor-token').value;
    const email = pendingTwoFactorEmail;
    
    if (!email) { showForm('login'); return; }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);

    // Verificar si el token coincide
    if (user && user.twoFactorToken === enteredToken) {
        // --- ÉXITO TOTAL ---
        sessionStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
        
        alert(`¡Identidad verificada!\nBienvenido, ${user.name}.`);
        window.location.href = 'Inicio.html'; 
    } else {
        alert('Código incorrecto. Inténtalo de nuevo.');
        document.getElementById('two-factor-token').value = '';
    }
}

// D. REENVIAR CÓDIGO
function handleResendCode(event) {
    event.preventDefault();
    const email = pendingTwoFactorEmail;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);

    if (user) {
        const newToken = generateTwoFactorToken();
        user.twoFactorToken = newToken;
        
        // Actualizar localStorage
        const index = users.findIndex(u => u.email === email);
        users[index] = user;
        localStorage.setItem('users', JSON.stringify(users));

        alert(`Nuevo código generado (Simulación): ${newToken}`);
    }
}