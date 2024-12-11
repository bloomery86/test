document.addEventListener('DOMContentLoaded', function() {
    // Quantity Selector
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');

    minusBtn.addEventListener('click', () => {
        const currentValue = parseInt(qtyInput.value);
        if (currentValue > 1) {
            qtyInput.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        const currentValue = parseInt(qtyInput.value);
        qtyInput.value = currentValue + 1;
    });

    // Thumbnail Gallery
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('#mainImage');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            // Update main image
            const newImageSrc = thumbnail.querySelector('img').src;
            mainImage.src = newImageSrc;
        });
    });

    // Add to Cart Animation
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    addToCartBtn.addEventListener('click', function() {
        // Add a temporary class for animation
        this.classList.add('adding');
        
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        const currentCount = parseInt(cartCount.textContent);
        const quantity = parseInt(qtyInput.value);
        cartCount.textContent = currentCount + quantity;
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.classList.remove('adding');
        }, 1000);
    });

    // Wishlist Toggle
    const wishlistBtn = document.querySelector('.wishlist-btn');
    
    wishlistBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.style.color = 'var(--color-primary)';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.style.color = 'var(--color-text)';
        }
    });
});
