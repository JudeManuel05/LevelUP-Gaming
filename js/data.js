let productos = [
    { id: 1, nombre: "Mouse Gamer Logitech G502", categoria: "Periféricos", marca: "Logitech", precio: 29990, stock: 15, imagen: "🖱️", descripcion: "Mouse gamer con sensor de alta precisión y botones programables." },
    { id: 2, nombre: "Teclado Mecánico Corsair K70", categoria: "Periféricos", marca: "Corsair", precio: 89990, stock: 3, imagen: "⌨️", descripcion: "Teclado mecánico RGB con switches táctiles para gaming competitivo." },
    { id: 3, nombre: "Audífonos HyperX Cloud II", categoria: "Periféricos", marca: "HyperX", precio: 59990, stock: 8, imagen: "🎧", descripcion: "Audífonos con sonido envolvente 7.1 y micrófono desmontable." },
    { id: 4, nombre: "Tarjeta Gráfica Asus TUF RTX 4070", categoria: "Hardware PC", marca: "Asus", precio: 699990, stock: 2, imagen: "🎮", descripcion: "GPU de alto rendimiento ideal para gaming en 1440p y 4K." },
    { id: 5, nombre: "Procesador AMD Ryzen 7 7800X3D", categoria: "Hardware PC", marca: "AMD", precio: 429990, stock: 5, imagen: "💻", descripcion: "Procesador gamer con tecnología 3D V-Cache para máximo FPS." },
    { id: 6, nombre: "Memoria RAM Corsair Vengeance 32GB", categoria: "Hardware PC", marca: "Corsair", precio: 79990, stock: 12, imagen: "🧩", descripcion: "Kit de memoria RAM DDR5 de alta velocidad para gaming y multitarea." },
    { id: 7, nombre: "Silla Gamer Secretlab Titan", categoria: "Sillas Gamer", marca: "Secretlab", precio: 459990, stock: 1, imagen: "🪑", descripcion: "Silla ergonómica premium con soporte lumbar ajustable." },
    { id: 8, nombre: "Silla Gamer Cougar Armor", categoria: "Sillas Gamer", marca: "Cougar", precio: 259990, stock: 6, imagen: "🪑", descripcion: "Silla reclinable con reposabrazos 4D y tapizado resistente." },
    { id: 9, nombre: "Mousepad XXL Razer Goliathus", categoria: "Accesorios", marca: "Razer", precio: 19990, stock: 20, imagen: "🟪", descripcion: "Mousepad extendido con superficie optimizada para sensores ópticos." },
    { id: 10, nombre: "Tira LED RGB para Gabinete MSI", categoria: "Accesorios", marca: "MSI", precio: 14990, stock: 3, imagen: "💡", descripcion: "Iluminación RGB sincronizable para personalizar tu setup." }
];

function formatearPrecio(precio) {
    return "$" + precio.toLocaleString("es-ES");
}