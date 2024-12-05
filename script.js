const { createApp } = Vue;

createApp({
    data() {
        return {
            waifus: [],
            cart: [],
            searchQuery: '',
            selectedType: '',
            progressBarWidth: '0%',
        };
    },
    computed: {
        filteredWaifus() {
            return this.waifus?.filter(waifu =>
                waifu.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                waifu.id.toString().includes(this.searchQuery)
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
    },
    methods: {
        async loadWaifus() {
            try {
                const type = this.selectedType || 'waifu';
                const url = `https://api.waifu.pics/sfw/${type}`;
                this.waifus = [];

                for (let i = 0; i < 9; i++) {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(`Error al obtener datos: ${response.status}`);
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
                console.error('Error al cargar waifus:', error);
            }
        },
        addToCart(waifu) {
            const existingItem = this.cart.find(item => item.id === waifu.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({ ...waifu });
            }
            this.updateProgressBar();
        },
        removeFromCart(index) {
            this.cart.splice(index, 1);
            this.updateProgressBar();
        },
        completePurchase() {
            alert('Compra realizada con éxito!');
            this.cart = [];
            this.updateProgressBar();
        },
        updateProgressBar() {
            const progress = Math.min((this.cart.reduce((sum, item) => sum + item.quantity, 0) / 9) * 100, 100);
            this.progressBarWidth = `${progress}%`;
        },
        getRandomPrice(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        viewProductDetail(waifu) {
            localStorage.setItem('selectedProduct', JSON.stringify(waifu));
            const scrollPosition = window.scrollY || window.pageYOffset;
            localStorage.setItem('scrollPosition', scrollPosition);
            window.location.href = 'detalle.html';
        },
    },
    mounted() {
        this.loadWaifus();
        const savedPosition = localStorage.getItem('scrollPosition');
        if (savedPosition) {
            window.scrollTo(0, parseInt(savedPosition, 10));
            localStorage.removeItem('scrollPosition');
        }
    }
}).mount('#app');
