// ===================== 1. CREAR USUARIO =====================

function crearUsuario(evento) {
    evento.preventDefault(); // evita que la página se recargue

    // 1. Leer lo que escribió el usuario
    let nombre = document.getElementById("nombre").value.trim();
    let rut = document.getElementById("rut").value.trim();
    let telefono = document.getElementById("telefono").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let clave = document.getElementById("clave").value;

    // 2. Borrar los mensajes anteriores
    document.getElementById("errorNombre").innerHTML = "";
    document.getElementById("errorRut").innerHTML = "";
    document.getElementById("errorTelefono").innerHTML = "";
    document.getElementById("errorCorreo").innerHTML = "";
    document.getElementById("errorClave").innerHTML = "";
    document.getElementById("mensajeCrear").innerHTML = "";

    let valido = true;

    // 3. Validar el nombre
    if (nombre == "") {
        document.getElementById("errorNombre").innerHTML = "Ingresa tu nombre.";
        valido = false;
    } else if (nombre.length < 3) {
        document.getElementById("errorNombre").innerHTML = "El nombre debe tener al menos 3 letras.";
        valido = false;
    }

    // 4. Validar el RUT
    if (rut == "") {
        document.getElementById("errorRut").innerHTML = "Ingresa tu RUT.";
        valido = false;
    } else if (!rut.includes("-") || rut.includes(".") || rut.length < 9 || rut.length > 10) {
        document.getElementById("errorRut").innerHTML = "El RUT debe ir sin puntos y con guion. Ej: 12345678-9";
        valido = false;
    }

    // 5. Validar el teléfono
    if (telefono == "") {
        document.getElementById("errorTelefono").innerHTML = "Ingresa tu teléfono.";
        valido = false;
    } else if (telefono.length != 9 || isNaN(telefono)) {
        document.getElementById("errorTelefono").innerHTML = "El teléfono debe tener 9 números. Ej: 912345678";
        valido = false;
    }

    // 6. Validar el correo
    if (correo == "") {
        document.getElementById("errorCorreo").innerHTML = "Ingresa tu correo.";
        valido = false;
    } else if (!correo.includes("@") || !correo.includes(".")) {
        document.getElementById("errorCorreo").innerHTML = "El correo debe tener @ y un punto. Ej: juan@gmail.com";
        valido = false;
    }

    // 7. Validar la contraseña
    if (clave == "") {
        document.getElementById("errorClave").innerHTML = "Ingresa tu contraseña.";
        valido = false;
    } else if (clave.length < 6) {
        document.getElementById("errorClave").innerHTML = "La contraseña debe tener al menos 6 caracteres.";
        valido = false;
    }

    // 8. Si todo está bien, guardar el usuario en el navegador
    if (valido) {
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("correo", correo);
        localStorage.setItem("clave", clave);

        document.getElementById("mensajeCrear").innerHTML = "✅ Usuario creado. Ahora ingresa con tu correo y contraseña.";
        document.getElementById("formCrear").reset();
    }
}

// ===================== 2. INGRESAR USUARIO =====================

function ingresarUsuario(evento) {
    evento.preventDefault();

    // 1. Leer lo que escribió el usuario
    let correo = document.getElementById("correoIngreso").value.trim();
    let clave = document.getElementById("claveIngreso").value;

    // 2. Borrar los mensajes anteriores
    document.getElementById("errorCorreoIngreso").innerHTML = "";
    document.getElementById("errorClaveIngreso").innerHTML = "";
    document.getElementById("errorIngreso").innerHTML = "";
    document.getElementById("mensajeIngreso").innerHTML = "";

    // 3. Revisar que los campos no estén vacíos
    if (correo == "") {
        document.getElementById("errorCorreoIngreso").innerHTML = "Ingresa tu correo.";
        return;
    }
    if (clave == "") {
        document.getElementById("errorClaveIngreso").innerHTML = "Ingresa tu contraseña.";
        return;
    }

    // 4. Buscar el usuario guardado
    let correoGuardado = localStorage.getItem("correo");
    let claveGuardada = localStorage.getItem("clave");
    let nombreGuardado = localStorage.getItem("nombre");

    // 5. Comparar
    if (correoGuardado == null) {
        document.getElementById("errorIngreso").innerHTML = "No hay usuarios creados. Primero crea tu usuario.";
    } else if (correo == correoGuardado && clave == claveGuardada) {
        document.getElementById("mensajeIngreso").innerHTML = "🎉 Ingresaste a tu cuenta. ¡Hola, " + nombreGuardado + "!";
        document.getElementById("formIngresar").reset();
    } else {
        document.getElementById("errorIngreso").innerHTML = "Correo o contraseña incorrectos.";
    }
}

// Conectar cada formulario con su función
document.getElementById("formCrear").addEventListener("submit", crearUsuario);
document.getElementById("formIngresar").addEventListener("submit", ingresarUsuario);
