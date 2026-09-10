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
            estado = '<span class="badge bg-danger">⚠ Stock Crítico</span>';
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

function agregarProducto(evento) {
    evento.preventDefault();

    let nombre = document.getElementById("nombreProducto").value;
    let categoria = document.getElementById("categoriaProducto").value;
    let marca = document.getElementById("marcaProducto").value;
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

    document.getElementById("formProducto").reset();
    renderizarTabla();
}

renderizarTabla();