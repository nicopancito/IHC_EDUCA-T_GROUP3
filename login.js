function handleLogin(event) {
    event.preventDefault(); // Evita que el formulario se envíe
    
    // Aquí puedes añadir tu lógica de validación de email y contraseña
    // Por ejemplo, recolectar los datos:
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("Email:", email);
    console.log("Password:", password);
    
    // Si la validación es exitosa, redirige al dashboard
    // (Cambié "ServiciosNeuraVault.html" por "dashboard.html" que es más apropiado)
    alert("¡Inicio de sesión exitoso! Redirigiendo...");
    window.location.href = "Inicio.html"; 
}