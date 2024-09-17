// Function to detect if the user is on mobile and redirect to the mobile site
function redirectToMobile() {
  const isMobile = window.innerWidth <= 768; // Define mobile width threshold
  const currentUrl = window.location.href;

  // Check if the current URL is the desktop site on custom domain and user is on a mobile device
  if (isMobile && currentUrl.includes("maaher.life")) {
    window.location.href = "https://maahermobile.vercel.app";
  }

  // Optional: Redirect back to desktop if user resizes window to desktop size
  if (!isMobile && currentUrl.includes("maaher.life")) {
    window.location.href = "https://maaher.vercel.app";
  }
}

// Call the function on page load
window.onload = redirectToMobile;

// Call redirectToMobile function on page load
window.onload = function () {
  redirectToMobile();
  initializeCart();
  clearCartOnPaymentSuccess();
};

// Optionally, check again when the window is resized
window.onresize = redirectToMobile;

// Initialize the cart from localStorage or create an empty one
function initializeCart() {
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
  updateCartCounter();
}

// Add to Cart function
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
  alert("Added to bag!");
}

// Checkout function
function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items to proceed.");
  } else {
    // Calculate total price and store in localStorage
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    localStorage.setItem("totalPrice", totalPrice);
    // Redirect to form.html for contact details
    window.location.href = "form.html";
  }
}

// Update Cart Counter
function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-counter").textContent = totalItems;
}

// Toggle Cart Drawer
function toggleCartDrawer() {
  const cartDrawer = document.getElementById("cart-drawer");
  cartDrawer.classList.toggle("show");
  renderCartItems();
}

// Render Cart Items in Cart Drawer
function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items-container");
  cartItemsContainer.innerHTML = ""; // Clear previous items

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Price: Rs. ${item.price}</p>
      </div>
      <div class="cart-item-quantity">
        <button onclick="updateQuantity('${item.name}', -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity('${item.name}', 1)">+</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  document.getElementById(
    "cart-total"
  ).textContent = `Total: Rs. ${totalPrice}`;
}

// Update Quantity in Cart
function updateQuantity(name, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.name === name);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.name !== name); // Remove item if quantity is 0
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartCounter();
  }
}

// Clear cart and reset cart counter on payment success and redirection to index.html
function clearCartOnPaymentSuccess() {
  // Clear cart and total price from localStorage
  localStorage.removeItem("cart");
  localStorage.removeItem("totalPrice");

  // Reset cart counter to 0
  document.getElementById("cart-counter").textContent = 0;
}

// Automatically clear cart and update the cart counter when the user lands on the index.html page after payment success
window.onload = function () {
  redirectToMobile();
  initializeCart();
  clearCartOnPaymentSuccess();
};
