// Add event listeners to product buttons for "Add to Cart"
document.querySelectorAll('.product button').forEach(button => {
  button.addEventListener('click', addToCart);
});

// Function to add product to cart
function addToCart(event) {
  const product = event.target.closest('.product');
  const productName = product.querySelector('h3').textContent;
  const productPrice = product.querySelector('p').textContent;
  
  const cartSection = document.getElementById('cart');
  const cartMessage = cartSection.querySelector('p');
  
  // Displaying cart message
  if (cartMessage) {
    cartMessage.remove(); // Remove placeholder message if it exists
  }

  // Create a new cart item
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItem.innerHTML = `<p>${productName} - ${productPrice}</p>`;

  // Add cart item to cart
  cartSection.appendChild(cartItem);

  // Optional: Could store the cart items in localStorage for persistence
  saveCartToLocalStorage();
}

// Search functionality
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', searchProducts);

function searchProducts() {
  const searchQuery = searchInput.value.toLowerCase();
  const products = document.querySelectorAll('.product');

  products.forEach(product => {
    const productName = product.querySelector('h3').textContent.toLowerCase();
    
    // If the product name includes the search query, show it; otherwise, hide it
    if (productName.includes(searchQuery)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Function to save the cart to localStorage (optional)
function saveCartToLocalStorage() {
  const cartItems = document.querySelectorAll('.cart-item');
  const cartArray = [];

  cartItems.forEach(item => {
    cartArray.push(item.textContent);
  });

  localStorage.setItem('cart', JSON.stringify(cartArray));
}

// Function to load the cart from localStorage (optional)
function loadCartFromLocalStorage() {
  const cartArray = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartSection = document.getElementById('cart');

  // Display each item in the cart
  cartArray.forEach(itemText => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `<p>${itemText}</p>`;
    cartSection.appendChild(cartItem);
  });
}

// Load cart on page load (optional)
window.addEventListener('load', loadCartFromLocalStorage);
