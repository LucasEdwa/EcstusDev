const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalSpan = document.querySelector('.cart-total-price');
const cartTotalItemsSpan = document.querySelector('#cart-total-items');
let cart = JSON.parse(localStorage.getItem("cart")) || [];

addToCartButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    const product = {
      name: this.dataset.name,
      price: parseFloat(this.dataset.price),
      image: this.dataset.image,
      quantity: 1 // set initial quantity to 1
    };
    addToCart(product);
  });
});

function addToCart(product) {
    // Check if product is already in cart
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
      // If product is already in cart, increase quantity
      existingProduct.quantity += 1;
    } else {
      // If product is not in cart, add it
      cart.push(product);
    }
  
    // Save the cart array to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
  
    // Display the updated cart items and total
    displayCartItems();
    updateCartTotal();
  
    // Update the cart quantity in the header
    updateCartQuantity();
    
    // Add a notification that the item was added to the cart
    const notificationContainer = document.querySelector('.notification-container');
    const notification = document.createElement("div");
    notification.innerText = "Item added to cart!";
    notification.classList.add("notification");
    notificationContainer.appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(() => {
      notificationContainer.removeChild(notification);
    }, 3000);

    Message.alert("Item added to cart!");
}

function displayCartItems() {
  // Clear the cart items container
  cartItemsContainer.innerHTML = '';

  // Loop through the cart items and create a display for each one
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];

    // Create a div for the cart item
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    // Add the product information to the cart item
    cartItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="cart-item-details">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <div class="quantity-container">
          <input type="text" value="${product.quantity}" class="item-quantity-input" data-index="${i}">
        </div>
      </div>
      <button class="remove-from-cart-button" data-index="${i}">Remove</button>
    `;

    // Add the cart item to the cart items container
    cartItemsContainer.appendChild(cartItem);
  }

  // Add event listeners to remove buttons
  const removeFromCartButtons = document.querySelectorAll('.remove-from-cart-button');

  removeFromCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.dataset.index);
      const product = cart[index];
      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems();
      updateCartTotal();
    });
  });
}

//button quatity//
const decrementButtons = document.querySelectorAll('.decrement-quantity-button');
const incrementButtons = document.querySelectorAll('.increment-quantity-button');
const quantityInputs = document.querySelectorAll('.product-quantity');

decrementButtons.forEach(button => {
  button.addEventListener('click', function() {
    const input = this.nextElementSibling;
    let quantity = parseInt(input.value);
    if (quantity > 1) {
      quantity -= 1;
      input.value = quantity;
    }
  });
});

incrementButtons.forEach(button => {
  button.addEventListener('click', function() {
    const input = this.previousElementSibling;
    let quantity = parseInt(input.value);
    quantity += 1;
    input.value = quantity;
  });
});


const clearCartButton = document.querySelector('#clear-cart-btn');
clearCartButton.addEventListener('click', function() {
  // Clear the cart array and local storage
  cart = [];
  localStorage.removeItem("cart");

  // Display the updated cart items and total
  displayCartItems();
  updateCartTotal();
});

function updateCartTotal() {
  const total = cart.reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0);
  const numItems = cart.reduce((accumulator, product) => accumulator + product.quantity, 0);
  cartTotalSpan.innerHTML = total.toFixed(2);
  cartTotalItemsSpan.innerHTML = numItems;
}
function updateCartQuantity() {
    const cartTotalItemsSpan = document.querySelector('#cart-total-items');
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const numItems = cart.reduce((accumulator, product) => accumulator + product.quantity, 0);
    cartTotalItemsSpan.innerHTML = numItems;
  }
  
// Display the cart items and total on page load
displayCartItems();
updateCartTotal();
