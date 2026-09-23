function mostrarError(campo, mensaje) {
    campo.classList.remove("is-valid");
    campo.classList.add("is-invalid");
    let contenedorError = document.getElementById(campo.dataset.error);
    if (contenedorError) {
        contenedorError.innerHTML = mensaje;
    }
}


function marcarValido(campo) {
    campo.classList.remove("is-invalid");
    
    if (!campo.required && campo.value.trim() == "") {
        campo.classList.remove("is-valid");
    } else {
        campo.classList.add("is-valid");
    }
    let contenedorError = document.getElementById(campo.dataset.error);
    if (contenedorError) {
        contenedorError.innerHTML = "";
    }
}


function limpiarValidacion(formulario) {
    let campos = formulario.querySelectorAll(".is-valid, .is-invalid");
    for (let i = 0; i < campos.length; i++) {
        campos[i].classList.remove("is-valid", "is-invalid");
    }
}



function validarNombre(valor) {
    valor = valor.trim();
    if (valor == "") return "Ingresa tu nombre completo.";
    if (valor.length < 3) return "El nombre debe tener al menos 3 caracteres.";
    if (valor.length > 50) return "El nombre no puede superar los 50 caracteres.";
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü' ]+$/.test(valor)) return "El nombre solo puede contener letras y espacios.";
    if (valor.split(" ").filter(p => p != "").length < 2) return "Ingresa tu nombre y apellido (ej: Juan Pérez).";
    return "";
}

function validarCorreo(valor) {
    valor = valor.trim();
    if (valor == "") return "Ingresa tu correo electrónico.";
    let formato = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!formato.test(valor)) return "El correo no es válido. Ejemplo: usuario@gmail.com";
    return "";
}


function validarRut(valor) {
    let rut = valor.replace(/\./g, "").replace(/-/g, "").trim().toUpperCase();
    if (rut == "") return "Ingresa tu RUT.";
    if (!/^[0-9]{7,8}[0-9K]$/.test(rut)) return "Formato de RUT inválido. Ejemplo: 12.345.678-5";

    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1);
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma = suma + Number(cuerpo[i]) * multiplo;
        multiplo = multiplo == 7 ? 2 : multiplo + 1;
    }

    let resto = 11 - (suma % 11);
    let dvEsperado = resto == 11 ? "0" : resto == 10 ? "K" : String(resto);

    if (dv != dvEsperado) return "El RUT ingresado no es válido (dígito verificador incorrecto).";
    return "";
}


function formatearRut(valor) {
    let rut = valor.replace(/[^0-9kK]/g, "").toUpperCase();
    if (rut.length <= 1) return rut;
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1);
    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return cuerpo + "-" + dv;
}

function validarTelefono(valor) {
    valor = valor.replace(/\s/g, "");
    if (valor == "") return ""; // es opcional
    if (!/^(\+?56)?9[0-9]{8}$/.test(valor)) return "El teléfono debe ser un celular chileno. Ejemplo: +56 9 1234 5678";
    return "";
}

function validarPassword(valor) {
    if (valor == "") return "Ingresa una contraseña.";
    if (valor.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
    if (valor.length > 20) return "La contraseña no puede superar los 20 caracteres.";
    if (!/[A-Z]/.test(valor)) return "La contraseña debe incluir al menos una letra mayúscula.";
    if (!/[a-z]/.test(valor)) return "La contraseña debe incluir al menos una letra minúscula.";
    if (!/[0-9]/.test(valor)) return "La contraseña debe incluir al menos un número.";
    return "";
}


function fortalezaPassword(valor) {
    let puntos = 0;
    if (valor.length >= 8) puntos++;
    if (/[A-Z]/.test(valor) && /[a-z]/.test(valor)) puntos++;
    if (/[0-9]/.test(valor)) puntos++;
    if (/[^A-Za-z0-9]/.test(valor) || valor.length >= 12) puntos++;
    return puntos;
}

function validarEdad(valor) {
    if (valor == "") return "Ingresa tu fecha de nacimiento.";
    let nacimiento = new Date(valor);
    let hoy = new Date();
    if (nacimiento > hoy) return "La fecha de nacimiento no puede ser futura.";
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    let mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes == 0 && hoy.getDate() < nacimiento.getDate())) edad--;
    if (edad < 18) return "Debes ser mayor de 18 años para registrarte.";
    if (edad > 110) return "Revisa la fecha de nacimiento ingresada.";
    return "";
}



function obtenerUsuarios() {
    try {
        return JSON.parse(localStorage.getItem("usuariosLevelUp")) || [];
    } catch (e) {
        return [];
    }
}

function guardarUsuarios(usuarios) {
    try {
        localStorage.setItem("usuariosLevelUp", JSON.stringify(usuarios));
    } catch (e) {
        
    }
}


const ADMIN_DEMO = { nombre: "Administrador LevelUp", correo: "admin@levelupgaming.cl", password: "Admin1234", rol: "Administrador" };


function sugerirDominios(campoCorreo, datalist) {
    let dominios = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "duocuc.cl", "icloud.com"];
    let valor = campoCorreo.value;
    datalist.innerHTML = "";
    if (valor.includes("@")) {
        let usuario = valor.split("@")[0];
        let escrito = valor.split("@")[1];
        for (let i = 0; i < dominios.length; i++) {
            if (dominios[i].startsWith(escrito)) {
                datalist.innerHTML += '<option value="' + usuario + "@" + dominios[i] + '">';
            }
        }
    }
}


function validarEnVivo(campo, regla) {
    campo.addEventListener("blur", function () {
        let error = regla(campo.value);
        error ? mostrarError(campo, error) : marcarValido(campo);
    });
    campo.addEventListener("input", function () {
        if (campo.classList.contains("is-invalid") || campo.classList.contains("is-valid")) {
            let error = regla(campo.value);
            error ? mostrarError(campo, error) : marcarValido(campo);
        }
    });
}


let formRegistro = document.getElementById("formRegistro");

if (formRegistro) {
    let nombre = document.getElementById("regNombre");
    let rut = document.getElementById("regRut");
    let correo = document.getElementById("regCorreo");
    let telefono = document.getElementById("regTelefono");
    let fecha = document.getElementById("regFecha");
    let interes = document.getElementById("regInteres");
    let password = document.getElementById("regPassword");
    let confirmar = document.getElementById("regConfirmar");
    let terminos = document.getElementById("regTerminos");

    
    fecha.max = new Date().toISOString().split("T")[0];

    validarEnVivo(nombre, validarNombre);
    validarEnVivo(rut, validarRut);
    validarEnVivo(correo, function (v) {
        let error = validarCorreo(v);
        if (error) return error;
        let existe = obtenerUsuarios().some(u => u.correo == v.trim().toLowerCase());
        return existe ? "Este correo ya está registrado. ¿Quieres <a href='login.html'>iniciar sesión</a>?" : "";
    });
    validarEnVivo(telefono, validarTelefono);
    validarEnVivo(fecha, validarEdad);
    validarEnVivo(interes, v => v == "" ? "Selecciona una categoría de interés." : "");
    validarEnVivo(password, validarPassword);
    validarEnVivo(confirmar, v => v == "" ? "Confirma tu contraseña." : v != password.value ? "Las contraseñas no coinciden." : "");

    
    rut.addEventListener("input", function () {
        rut.value = formatearRut(rut.value);
    });

    
    correo.addEventListener("input", function () {
        sugerirDominios(correo, document.getElementById("sugerenciasCorreo"));
    });

    
    password.addEventListener("input", function () {
        let puntos = fortalezaPassword(password.value);
        let barra = document.getElementById("barraFortaleza");
        let texto = document.getElementById("textoFortaleza");
        let niveles = [
            { ancho: "0%", color: "#dc3545", texto: "Usa 8 a 20 caracteres, con mayúscula, minúscula y número." },
            { ancho: "25%", color: "#dc3545", texto: "Contraseña débil" },
            { ancho: "50%", color: "#fd7e14", texto: "Contraseña regular" },
            { ancho: "75%", color: "#ffc107", texto: "Contraseña buena" },
            { ancho: "100%", color: "#198754", texto: "Contraseña fuerte 💪" }
        ];
        barra.style.width = niveles[puntos].ancho;
        barra.style.backgroundColor = niveles[puntos].color;
        texto.innerHTML = niveles[puntos].texto;
        if (confirmar.value != "") confirmar.dispatchEvent(new Event("input"));
    });

    
    document.getElementById("verPassword").addEventListener("click", function () {
        password.type = password.type == "password" ? "text" : "password";
        this.innerHTML = password.type == "password" ? "👁 Ver" : "🙈 Ocultar";
    });

    formRegistro.addEventListener("submit", function (evento) {
        evento.preventDefault();

        let reglas = [
            [nombre, validarNombre(nombre.value)],
            [rut, validarRut(rut.value)],
            [correo, validarCorreo(correo.value)],
            [telefono, validarTelefono(telefono.value)],
            [fecha, validarEdad(fecha.value)],
            [interes, interes.value == "" ? "Selecciona una categoría de interés." : ""],
            [password, validarPassword(password.value)],
            [confirmar, confirmar.value == "" ? "Confirma tu contraseña." : confirmar.value != password.value ? "Las contraseñas no coinciden." : ""],
            [terminos, terminos.checked ? "" : "Debes aceptar los términos y condiciones para continuar."]
        ];

        
        if (reglas[2][1] == "" && obtenerUsuarios().some(u => u.correo == correo.value.trim().toLowerCase())) {
            reglas[2][1] = "Este correo ya está registrado. ¿Quieres <a href='login.html'>iniciar sesión</a>?";
        }

        let hayErrores = false;
        for (let i = 0; i < reglas.length; i++) {
            if (reglas[i][1]) {
                mostrarError(reglas[i][0], reglas[i][1]);
                hayErrores = true;
            } else {
                marcarValido(reglas[i][0]);
            }
        }

        let resumen = document.getElementById("resumenRegistro");

        if (hayErrores) {
            resumen.className = "alert alert-danger mt-3";
            resumen.innerHTML = "⚠ Revisa los campos marcados en rojo antes de continuar.";
            formRegistro.querySelector(".is-invalid").focus();
            return;
        }

        let usuarios = obtenerUsuarios();
        usuarios.push({
            nombre: nombre.value.trim(),
            rut: rut.value,
            correo: correo.value.trim().toLowerCase(),
            telefono: telefono.value.trim(),
            interes: interes.value,
            password: password.value,
            rol: "Cliente"
        });
        guardarUsuarios(usuarios);

        resumen.className = "alert alert-success mt-3";
        resumen.innerHTML = "✅ ¡Bienvenido/a a LevelUp Gaming, " + nombre.value.trim().split(" ")[0] + "! Tu cuenta fue creada. <a href='login.html' class='alert-link'>Inicia sesión aquí</a>.";
        formRegistro.reset();
        limpiarValidacion(formRegistro);
        document.getElementById("barraFortaleza").style.width = "0%";
        document.getElementById("textoFortaleza").innerHTML = "Usa 8 a 20 caracteres, con mayúscula, minúscula y número.";
    });
}


let formLogin = document.getElementById("formLogin");

if (formLogin) {
    let correo = document.getElementById("loginCorreo");
    let password = document.getElementById("loginPassword");
    let intentos = 0;

    validarEnVivo(correo, validarCorreo);
    validarEnVivo(password, v => v == "" ? "Ingresa tu contraseña." : "");

    correo.addEventListener("input", function () {
        sugerirDominios(correo, document.getElementById("sugerenciasLogin"));
    });

    formLogin.addEventListener("submit", function (evento) {
        evento.preventDefault();
        let mensaje = document.getElementById("resumenLogin");

        let errorCorreo = validarCorreo(correo.value);
        let errorPassword = password.value == "" ? "Ingresa tu contraseña." : "";

        errorCorreo ? mostrarError(correo, errorCorreo) : marcarValido(correo);
        errorPassword ? mostrarError(password, errorPassword) : marcarValido(password);

        if (errorCorreo || errorPassword) {
            mensaje.className = "alert alert-danger mt-3";
            mensaje.innerHTML = "⚠ Completa correctamente los campos marcados.";
            return;
        }

        if (intentos >= 3) {
            mensaje.className = "alert alert-warning mt-3";
            mensaje.innerHTML = "🔒 Demasiados intentos fallidos. Recarga la página para intentarlo nuevamente.";
            return;
        }

        let usuarios = obtenerUsuarios().concat([ADMIN_DEMO]);
        let usuario = usuarios.find(u => u.correo == correo.value.trim().toLowerCase() && u.password == password.value);

        if (!usuario) {
            intentos++;
            mostrarError(password, "Correo o contraseña incorrectos. Te quedan " + (3 - intentos) + " intento(s).");
            mensaje.className = "alert alert-danger mt-3";
            mensaje.innerHTML = "No encontramos una cuenta con esos datos. ¿Aún no tienes cuenta? <a href='registro.html' class='alert-link'>Regístrate</a>.";
            return;
        }

        mensaje.className = "alert alert-success mt-3";
        mensaje.innerHTML = "✅ ¡Hola, " + usuario.nombre.split(" ")[0] + "! Redirigiendo...";
        setTimeout(function () {
            window.location.href = usuario.rol == "Administrador" ? "admin.html" : "productos.html";
        }, 1200);
    });
}


let botonesEnviar = document.querySelectorAll("form[novalidate] [type=submit]");
for (let i = 0; i < botonesEnviar.length; i++) {
    botonesEnviar[i].addEventListener("mousedown", function (evento) {
        evento.preventDefault();
    });
}
