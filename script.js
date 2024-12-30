// JavaScript for the Elite Market site

// Elements for theme toggle
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const themeModal = document.getElementById('theme-modal');
const lightThemeButton = document.getElementById('light-theme');
const darkThemeButton = document.getElementById('dark-theme');

// Check for stored theme preference in localStorage
const currentTheme = localStorage.getItem('theme');

// Apply the saved theme, or default to dark theme
if (currentTheme) {
  body.classList.add(currentTheme);
} else {
  body.classList.add('dark-theme');
}

// Open the theme modal when the theme toggle button is clicked
themeToggleButton.addEventListener('click', () => {
  themeModal.style.display = 'flex';
});

// Set the theme to light when the light theme button is clicked
lightThemeButton.addEventListener('click', () => {
  body.classList.remove('dark-theme');
  body.classList.add('light-theme');
  localStorage.setItem('theme', 'light-theme');
  themeModal.style.display = 'none';
});

// Set the theme to dark when the dark theme button is clicked
darkThemeButton.addEventListener('click', () => {
  body.classList.remove('light-theme');
  body.classList.add('dark-theme');
  localStorage.setItem('theme', 'dark-theme');
  themeModal.style.display = 'none';
});

// Close the theme modal if the user clicks outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === themeModal) {
    themeModal.style.display = 'none';
  }
});

// Cart functionality
const addToCartButtons = document.querySelectorAll('.product button');
const cartSection = document.getElementById('cart');
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart display
function updateCart() {
  if (cartItems.length === 0) {
    cartSection.innerHTML = '<h2>Your Cart</h2><p>Your cart is currently empty. Add items to your cart to see them here.</p>';
  } else {
    let cartHTML = '<h2>Your Cart</h2>';
    cartItems.forEach(item => {
      cartHTML += `<p>${item.name} - $${item.price}</p>`;
    });
    cartHTML += `<p><strong>Total: $${cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}</strong></p>`;
    cartHTML += '<button id="clear-cart">Clear Cart</button>';
    cartSection.innerHTML = cartHTML;
  }

  // Attach event listener to the clear cart button
  document.getElementById('clear-cart')?.addEventListener('click', () => {
    cartItems = [];
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCart();
  });
}

// Event listeners for product buttons
addToCartButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const product = {
      name: button.previousElementSibling.previousElementSibling.textContent,
      price: button.previousElementSibling.textContent.replace('$', '')
    };
    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCart();
  });
});

// Initialize cart
updateCart();
