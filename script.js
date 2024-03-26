class Smoothie {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.processOrder();
        });
    }

    processOrder() {
        // Initializing total price based on the selected smoothie flavour
        let totalPrice = parseFloat(document.querySelector('#flavour').selectedOptions[0].dataset.price);
        
        // Adding the price for each selected fruit
        document.querySelectorAll('input[name="fruit"]:checked').forEach((item) => {
            totalPrice += parseFloat(item.dataset.price);
        });
        
        // Adding the price for each selected fruit chunk
        document.querySelectorAll('input[name="chunks"]:checked').forEach((item) => {
            totalPrice += parseFloat(item.dataset.price);
        });

        // Adding the extra price for selected cup size
        const size = document.querySelector('input[name="size"]:checked');
        if (size) { // Check if a size is selected
            totalPrice += parseFloat(size.dataset.price);
        }

        // Storing the order details in localStorage for retrieval on the next page
        localStorage.setItem('smoothieTotalPrice', totalPrice.toFixed(2));

        // Redirecting to the order summary page
        window.location.href = 'order-summary.html';
    }
}

// Instantiating the Smoothie class when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new Smoothie('smoothieForm');
});