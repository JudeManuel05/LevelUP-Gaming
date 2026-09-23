function renderizarTabla() {
    let tabla = document.getElementById("tablaInventario");
    tabla.innerHTML = "";

    let productosCriticos = 0;

    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        let claseFila = "";
        let estado = "";

        if (producto.stock <= 0) {
            claseFila = "table-secondary";
            estado = '<span class="badge bg-secondary">Agotado</span>';
        } else if (producto.stock <= 3) {
            claseFila = "table-danger";
            estado = '<span class="badge bg-danger lu-stock-critico">⚠ Stock Crítico</span>';
            productosCriticos = productosCriticos + 1;
        } else {
            estado = '<span class="badge bg-success">Disponible</span>';
        }

        let fila =
            '<tr class="' + claseFila + '">' +
                '<td>' + producto.id + '</td>' +
                '<td>' + producto.imagen + ' ' + producto.nombre + '</td>' +
                '<td>' + producto.categoria + '</td>' +
                '<td>' + producto.marca + '</td>' +
                '<td>' + formatearPrecio(producto.precio) + '</td>' +
                '<td>' + producto.stock + '</td>' +
                '<td>' + estado + '</td>' +
                '<td>' +
                    '<button class="btn btn-sm btn-outline-secondary" onclick="cambiarStock(' + producto.id + ', -1)">-</button> ' +
                    '<button class="btn btn-sm btn-outline-secondary" onclick="cambiarStock(' + producto.id + ', 1)">+</button> ' +
                    '<button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(' + producto.id + ')">🗑 Eliminar</button>' +
                '</td>' +
            '</tr>';

        tabla.innerHTML += fila;
    }

    let alerta = document.getElementById("alertaStockCritico");

    if (productosCriticos > 0) {
        alerta.style.display = "block";
        alerta.innerHTML = "⚠ Tienes " + productosCriticos + " producto(s) con stock crítico (3 unidades o menos).";
    } else {
        alerta.style.display = "none";
    }
}

function cambiarStock(id, cambio) {
    let producto = productos.find(p => p.id == id);
    let nuevoStock = producto.stock + cambio;

    if (nuevoStock < 0) {
        nuevoStock = 0;
    }

    producto.stock = nuevoStock;
    renderizarTabla();
}

function eliminarProducto(id) {
    productos = productos.filter(p => p.id != id);
    renderizarTabla();
}

// ---------- Validación del formulario de productos ----------
// Usa las funciones mostrarError / marcarValido de validaciones.js

function validarNombreProducto(valor) {
    valor = valor.trim();
    if (valor == "") return "Ingresa el nombre del producto.";
    if (valor.length < 3) return "El nombre debe tener al menos 3 caracteres.";
    if (valor.length > 60) return "El nombre no puede superar los 60 caracteres.";
    let repetido = productos.some(p => p.nombre.toLowerCase() == valor.toLowerCase());
    if (repetido) return "Ya existe un producto con ese nombre en el inventario.";
    return "";
}

function validarCategoriaProducto(valor) {
    return valor == "" ? "Selecciona una categoría." : "";
}

function validarMarcaProducto(valor) {
    valor = valor.trim();
    if (valor == "") return "Ingresa la marca del producto (ej: Logitech, Asus).";
    if (valor.length < 2) return "La marca debe tener al menos 2 caracteres.";
    return "";
}

function validarPrecioProducto(valor) {
    if (valor == "") return "Ingresa el precio en pesos chilenos.";
    let precio = Number(valor);
    if (!Number.isInteger(precio)) return "El precio debe ser un número entero, sin decimales.";
    if (precio <= 0) return "El precio debe ser mayor a $0.";
    if (precio > 10000000) return "El precio no puede superar $10.000.000.";
    return "";
}

function validarStockProducto(valor) {
    if (valor == "") return "Ingresa el stock disponible.";
    let stock = Number(valor);
    if (!Number.isInteger(stock)) return "El stock debe ser un número entero.";
    if (stock < 0) return "El stock no puede ser negativo.";
    if (stock > 999) return "El stock máximo por producto es 999 unidades.";
    return "";
}

let camposProducto = [
    ["nombreProducto", validarNombreProducto],
    ["categoriaProducto", validarCategoriaProducto],
    ["marcaProducto", validarMarcaProducto],
    ["precioProducto", validarPrecioProducto],
    ["stockProducto", validarStockProducto]
];

// Validación en vivo: al salir del campo y mientras se corrige
for (let i = 0; i < camposProducto.length; i++) {
    validarEnVivo(document.getElementById(camposProducto[i][0]), camposProducto[i][1]);
}

// Sugerencia: avisa si el stock ingresado quedará como Stock Crítico
document.getElementById("stockProducto").addEventListener("input", function () {
    let aviso = document.getElementById("avisoStock");
    let stock = Number(this.value);
    if (this.value != "" && Number.isInteger(stock) && stock >= 0 && stock <= 3) {
        aviso.innerHTML = '<span class="text-danger">⚠ Quedará como Stock Crítico (≤ 3).</span>';
    } else {
        aviso.innerHTML = "";
    }
});

function agregarProducto(evento) {
    evento.preventDefault();

    let formulario = document.getElementById("formProducto");
    let mensajeExito = document.getElementById("mensajeExito");
    let hayErrores = false;

    for (let i = 0; i < camposProducto.length; i++) {
        let campo = document.getElementById(camposProducto[i][0]);
        let error = camposProducto[i][1](campo.value);
        if (error) {
            mostrarError(campo, error);
            hayErrores = true;
        } else {
            marcarValido(campo);
        }
    }

    if (hayErrores) {
        mensajeExito.classList.add("d-none");
        formulario.querySelector(".is-invalid").focus();
        return;
    }

    let nombre = document.getElementById("nombreProducto").value.trim();
    let categoria = document.getElementById("categoriaProducto").value;
    let marca = document.getElementById("marcaProducto").value.trim();
    let precio = Number(document.getElementById("precioProducto").value);
    let stock = Number(document.getElementById("stockProducto").value);

    let nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;

    let nuevoProducto = {
        id: nuevoId,
        nombre: nombre,
        categoria: categoria,
        marca: marca,
        precio: precio,
        stock: stock,
        imagen: "🆕",
        descripcion: ""
    };

    productos.push(nuevoProducto);

    formulario.reset();
    limpiarValidacion(formulario);
    document.getElementById("avisoStock").innerHTML = "";
    mensajeExito.classList.remove("d-none");
    mensajeExito.innerHTML = "✅ Producto \"" + nombre + "\" agregado correctamente con ID " + nuevoId + ".";
    renderizarTabla();
}

document.getElementById("formProducto").addEventListener("submit", agregarProducto);

renderizarTabla();