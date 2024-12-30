// Toggle Theme Functionality (Dark/Light Theme)
const toggleButton = document.createElement('button');
toggleButton.classList.add('theme-toggle');
toggleButton.innerText = '🌙'; // Moon symbol for dark theme
document.body.appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLightTheme = document.body.classList.contains('light-theme');
  if (isLightTheme) {
    toggleButton.innerText = '🌞'; // Sun symbol for light theme
  } else {
    toggleButton.innerText = '🌙'; // Moon symbol for dark theme
  }
});

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
  cartItem.innerHTML = `<p>${productName} - ${productPrice}</p><button class="remove-btn">Remove</button>`;

  // Add cart item to cart
  cartSection.appendChild(cartItem);

  // Add event listener to remove button
  cartItem.querySelector('.remove-btn').addEventListener('click', () => {
    cartItem.remove();
  });

  // Update cart icon with the number of items
  updateCartIcon();

  // Save cart to localStorage
  saveCartToLocalStorage();
}

// Function to update cart icon with the number of items
function updateCartIcon() {
  const cartItems = document.querySelectorAll('.cart-item');
  const cartCount = document.getElementById('cart-icon').querySelector('.cart-count');
  
  if (cartItems.length > 0) {
    cartCount.textContent = cartItems.length;
  } else {
    cartCount.textContent = '';
  }
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

// Function to save the cart to localStorage
function saveCartToLocalStorage() {
  const cartItems = document.querySelectorAll('.cart-item');
  const cartArray = [];

  cartItems.forEach(item => {
    cartArray.push(item.querySelector('p').textContent);
  });

  localStorage.setItem('cart', JSON.stringify(cartArray));
}

// Function to load the cart from localStorage
function loadCartFromLocalStorage() {
  const cartArray = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartSection = document.getElementById('cart');

  // Display each item in the cart
  cartArray.forEach(itemText => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `<p>${itemText}</p><button class="remove-btn">Remove</button>`;
    cartSection.appendChild(cartItem);

    // Add event listener to remove button
    cartItem.querySelector('.remove-btn').addEventListener('click', () => {
      cartItem.remove();
      updateCartIcon();
      saveCartToLocalStorage();
    });
  });

  // Update cart icon with the number of items
  updateCartIcon();
}

// Load cart on page load
window.addEventListener('load', loadCartFromLocalStorage);


// Function to initialize the cart and display the items
function initializeCart() {
  const cartSection = document.getElementById('cart');
  
  // Check if there are any items stored in localStorage
  const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
  
  // If there are cart items, display them
  if (storedCart.length > 0) {
    cartSection.innerHTML = '<h2>Your Cart</h2>';
    
    storedCart.forEach(itemText => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `<p>${itemText}</p><button class="remove-btn">Remove</button>`;
      cartSection.appendChild(cartItem);

      // Event listener for the remove button
      cartItem.querySelector('.remove-btn').addEventListener('click', () => {
        removeCartItem(cartItem);
      });
    });
  } else {
    cartSection.innerHTML = '<h2>Your Cart is Empty</h2>';
  }
}

// Remove item from cart and update localStorage
function removeCartItem(cartItem) {
  const itemText = cartItem.querySelector('p').textContent;
  cartItem.remove();
  
  // Update localStorage after removing an item
  const cartArray = JSON.parse(localStorage.getItem('cart') || '[]');
  const updatedCart = cartArray.filter(item => item !== itemText);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  
  // Update cart icon
  updateCartIcon();
}

// Cart Checkout Functionality
const checkoutButton = document.getElementById('checkout-btn');
checkoutButton.addEventListener('click', () => {
  const cartItems = document.querySelectorAll('.cart-item');
  
  if (cartItems.length > 0) {
    alert('Proceeding to Checkout...');
    // You can integrate payment functionality here later
  } else {
    alert('Your cart is empty!');
  }
});

// Load the cart items when the page loads
window.addEventListener('load', () => {
  initializeCart();
  updateCartIcon(); // Update cart icon on page load
});

// Function to update the cart icon with the number of items
function updateCartIcon() {
  const cartItems = document.querySelectorAll('.cart-item');
  const cartCount = document.getElementById('cart-icon').querySelector('.cart-count');
  
  if (cartItems.length > 0) {
    cartCount.textContent = cartItems.length;
  } else {
    cartCount.textContent = '';
  }
}

// Automatic background sound that loops
const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
audio.loop = true;
audio.autoplay = true;
audio.volume = 0.1; // Set volume level
document.body.appendChild(audio); // Append to body so it starts playing automatically




// Toggle Dark/Light Theme Functionality
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const themeIndicator = document.getElementById('theme-indicator');

// Check for saved theme preference in localStorage and apply it
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme);
  themeIndicator.textContent = savedTheme === 'dark-theme' ? 'Dark Mode' : 'Light Mode';
} else {
  // Default theme is dark
  body.classList.add('dark-theme');
  themeIndicator.textContent = 'Dark Mode';
}

// Toggle the theme when the button is clicked
themeToggleButton.addEventListener('click', () => {
  const isDarkTheme = body.classList.contains('dark-theme');
  
  // Toggle between dark and light themes
  if (isDarkTheme) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    themeIndicator.textContent = 'Light Mode';
    localStorage.setItem('theme', 'light-theme');
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    themeIndicator.textContent = 'Dark Mode';
    localStorage.setItem('theme', 'dark-theme');
  }
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Form Validation for Newsletter Subscription (Example)
const newsletterForm = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email-input');
const newsletterMessage = document.getElementById('newsletter-message');

newsletterForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = emailInput.value.trim();
  
  // Basic email validation
  if (email && email.includes('@') && email.includes('.')) {
    newsletterMessage.textContent = 'Subscription successful!';
    newsletterMessage.style.color = 'green';
    emailInput.value = ''; // Clear the input
  } else {
    newsletterMessage.textContent = 'Please enter a valid email address.';
    newsletterMessage.style.color = 'red';
  }
});


