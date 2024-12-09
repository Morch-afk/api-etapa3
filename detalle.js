document.addEventListener('DOMContentLoaded', () => {
    // Recupera el producto seleccionado del localStorage
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (!product) {
        // Si no hay producto seleccionado, redirige al menú principal
        alert('No se encontró información del producto.');
        window.location.href = './index.html';
        return;
    }

    // Actualiza los elementos del DOM con los datos del producto
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-image').src = product.url;
    document.getElementById('product-name-detail').textContent = product.name;
    document.getElementById('product-category').textContent = `Categoría: ${product.name}`;
    document.getElementById('product-price').textContent = product.price;

    // Configura los botones para incrementar y disminuir la cantidad
    const quantityInput = document.getElementById('product-quantity');
    const increaseButton = document.getElementById('increase-quantity');
    const decreaseButton = document.getElementById('decrease-quantity');

    increaseButton.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity < 10) quantityInput.value = currentQuantity + 1;
    });

    decreaseButton.addEventListener('click', () => {
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 1) quantityInput.value = currentQuantity - 1;
    });

    // Configura el botón para agregar al carrito
    document.querySelector('.button-buy').addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += parseInt(quantityInput.value);
        } else {
            cart.push({ ...product, quantity: parseInt(quantityInput.value) });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Producto agregado al carrito.');
    });
});
