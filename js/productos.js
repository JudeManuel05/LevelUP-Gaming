let carrito = [];

function renderizarProductos(lista) {
    let contenedor = document.getElementById("listaProductos");
    contenedor.innerHTML = "";

    for (let i = 0; i < lista.length; i++) {
        let producto = lista[i];
        let etiquetaStock = "";

        if (producto.stock <= 0) {
            etiquetaStock = '<span class="badge bg-secondary">Sin stock</span>';
        } else if (producto.stock <= 3) {
            etiquetaStock = '<span class="badge bg-danger">¡Últimas ' + producto.stock + ' unidades!</span>';
        } else {
            etiquetaStock = '<span class="badge bg-success">Stock: ' + producto.stock + '</span>';
        }

        let botonDisabled = producto.stock <= 0 ? "disabled" : "";

        let tarjeta =
            '<div class="col-md-3 col-sm-6">' +
                '<div class="card shadow-sm h-100">' +
                    '<div class="card-body text-center">' +
                        '<div class="fs-1">' + producto.imagen + '</div>' +
                        '<h6 class="card-title mt-2">' + producto.nombre + '</h6>' +
                        '<p class="text-muted small mb-1">' + producto.marca + ' · ' + producto.categoria + '</p>' +
                        '<p class="fw-bold">' + formatearPrecio(producto.precio) + '</p>' +
                        '<p>' + etiquetaStock + '</p>' +
                        '<button class="btn btn-success btn-sm" ' + botonDisabled + ' onclick="agregarAlCarrito(' + producto.id + ')">Agregar al carrito</button>' +
                    '</div>' +
                '</div>' +
            '</div>';

        contenedor.innerHTML += tarjeta;
    }
}

function filtrarCategoria(categoria) {
    if (categoria == "Todos") {
        renderizarProductos(productos);
        return;
    }

    let filtrados = [];
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].categoria == categoria) {
            filtrados.push(productos[i]);
        }
    }
    renderizarProductos(filtrados);
}

function agregarAlCarrito(id) {
    let producto = productos.find(p => p.id == id);

    if (producto.stock <= 0) {
        alert("Este producto no tiene stock disponible.");
        return;
    }

    let itemExistente = carrito.find(item => item.id == id);

    if (itemExistente) {
        if (itemExistente.cantidad < producto.stock) {
            itemExistente.cantidad = itemExistente.cantidad + 1;
        } else {
            alert("Ya agregaste todo el stock disponible de este producto.");
            return;
        }
    } else {
        carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }

    actualizarCarrito();
}

function eliminarItem(id) {
    carrito = carrito.filter(item => item.id != id);
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function actualizarCarrito() {
    let listaItems = document.getElementById("itemsCarrito");
    let contadorCarrito = document.getElementById("contadorCarrito");
    let totalCarrito = document.getElementById("totalCarrito");

    listaItems.innerHTML = "";
    let total = 0;
    let cantidadTotal = 0;

    for (let i = 0; i < carrito.length; i++) {
        let item = carrito[i];
        let subtotal = item.precio * item.cantidad;
        total = total + subtotal;
        cantidadTotal = cantidadTotal + item.cantidad;

        listaItems.innerHTML +=
            '<li class="list-group-item d-flex justify-content-between align-items-center">' +
                '<div>' + item.nombre + '<br><small class="text-muted">' + item.cantidad + ' x ' + formatearPrecio(item.precio) + '</small></div>' +
                '<button class="btn btn-sm btn-outline-danger" onclick="eliminarItem(' + item.id + ')">✕</button>' +
            '</li>';
    }

    contadorCarrito.innerHTML = cantidadTotal;
    totalCarrito.innerHTML = formatearPrecio(total);
}

// Si venimos desde index.html con una categoría en la URL, filtramos automáticamente
let parametros = new URLSearchParams(window.location.search);
let categoriaInicial = parametros.get("categoria");

if (categoriaInicial) {
    filtrarCategoria(categoriaInicial);
} else {
    renderizarProductos(productos);
}