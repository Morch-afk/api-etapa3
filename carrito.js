new Vue({
    el: '#app',
    data: {
        cart: JSON.parse(localStorage.getItem('cart')) || [],
    },
    computed: {
        subtotal() {
            return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        iva() {
            return this.subtotal * 0.16;
        },
        total() {
            return this.subtotal + this.iva;
        },
        totalItems() {
            return this.cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    },
    methods: {
        removeItem(item) {
            this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
            this.updateCartStorage();
        },
        increaseQuantity(item) {
            if (item.quantity < 10) item.quantity++;
            this.updateCartStorage();
        },
        decreaseQuantity(item) {
            if (item.quantity > 1) item.quantity--;
            this.updateCartStorage();
        },
        updateCartStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }
});
