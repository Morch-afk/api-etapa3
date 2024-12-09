const { createApp } = Vue;

createApp({
    data() {
        return {
            waifus: [],
            cart: JSON.parse(localStorage.getItem('cart')) || [], // Recuperar carrito
            searchQuery: '',
            selectedType: 'waifu',
            progressBarWidth: '0%',
        };
    },
    computed: {
        filteredWaifus() {
            const query = this.searchQuery.toLowerCase().trim();
            return this.waifus.filter(waifu =>
                waifu.name.toLowerCase().includes(query) || waifu.id.toString().includes(query)
            );
        },
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
        },
    },
    methods: {
        async loadWaifus() {
            try {
                const type = this.selectedType || 'waifu';
                const url = `https://api.waifu.pics/sfw/${type}`;
                this.waifus = [];
                for (let i = 0; i < 9; i++) {
                    const response = await fetch(url);
                    const data = await response.json();
                    this.waifus.push({
                        id: i + 1,
                        url: data.url,
                        name: type.charAt(0).toUpperCase() + type.slice(1),
                        price: this.getRandomPrice(10, 100),
                        quantity: 1,
                    });
                }
            } catch (error) {
                console.error('Error:', error);
                alert('No se pudieron cargar los datos.');
            }
        },
        addToCart(waifu) {
            const existingItem = this.cart.find(item => item.id === waifu.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.cart.push({ ...waifu });
            }
            this.updateCartStorage();
            this.updateProgressBar();
        },
        removeFromCart(index) {
            this.cart.splice(index, 1);
            this.updateCartStorage();
            this.updateProgressBar();
        },
        increaseQuantity(item) {
            if (item.quantity < 10) {
                item.quantity++;
                this.updateCartStorage();
            }
        },
        decreaseQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--;
                this.updateCartStorage();
            }
        },
        updateCartStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        completePurchase() {
            alert('¡Compra completada!');
            this.cart = [];
            this.updateCartStorage();
            this.updateProgressBar();
        },
        updateProgressBar() {
            const progress = Math.min((this.totalItems / 9) * 100, 100);
            this.progressBarWidth = `${progress}%`;
        },
        getRandomPrice(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        viewProductDetail(waifu) {
            // Almacena el producto seleccionado en localStorage
            localStorage.setItem('selectedProduct', JSON.stringify(waifu));
            // Redirige a la página de detalle
            window.location.href = './detalle.html';
        },
    },
    mounted() {
        this.loadWaifus();
    },
}).mount('#app');
