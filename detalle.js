document.addEventListener('DOMContentLoaded', () => {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));
    if (!product) {
        alert('No se encontró información del producto.');
        window.location.href = './index.html';
        return;
    }

    // Actualizar la página con los datos del producto
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-image').src = product.url;
    document.getElementById('product-name-detail').textContent = product.name;
    document.getElementById('product-category').textContent = `Categoría: ${product.name}`;
    document.getElementById('product-price').textContent = product.price;

    // Navegar al menú principal
    document.getElementById('back-to-main').addEventListener('click', () => {
        window.location.href = './index.html';
    });
});
