function openingcart() {
    const cartContainer = document.getElementById("cart-container");
    const clothsContainer = document.querySelector(".cloths");
  
    if (cartContainer.style.display === "block") {
      clothsContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
      clothsContainer.style.width = "63.5%";
    } else {
      cartContainer.style.display = "block";
      clothsContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
      clothsContainer.style.width = "63.5%";
    }
  }

  let clickedButtonText = 'Free';
  
  function handleButtonClick(clickedButton) {
    const buttons = document.querySelectorAll('.custom-button');
    buttons.forEach(button => {
        clickedButtonText=clickedButton.textContent.trim();
      button.style.backgroundColor = '';
      button.clicked = false;
      clickedButtonText=clickedButton.textContent.trim();
    });
    
    if (!clickedButton.clicked) {
      clickedButton.style.backgroundColor = 'gray';
      clickedButton.clicked = true; // Store the textContent in the global variable
    } else {
      clickedButton.style.backgroundColor = '';
      clickedButton.clicked = false;
      clickedButtonText = 'Free'; // Reset the global variable if the button is clicked again
    }
  }
  
  function result() {
    const clickedElement = document.activeElement;
    const itemValue = clickedElement.getAttribute("value");
    const itemPrice = parseFloat(
      clickedElement.previousElementSibling.textContent.slice(1)
    );
    const itemImage = clickedElement.parentElement.querySelector("img").src;
  
    // New code to capture the selected size button's ID
    const selectedSize = clickedElement.id.replace("size", "");
    const itemNameWithSize = `${itemValue} (Size ${clickedButtonText})`;
    clickedButtonText='';
    const cartItem = {
      name: itemNameWithSize,
      price: itemPrice,
      quantity: 1,
      image: itemImage,
    };
  
    addToCart(cartItem);
    updateCartDisplay();
    event.preventDefault();
  }
  
  const cart = [];
  
  function addToCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(item);
    }
  }
  
  function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
      const cartItemHTML = `
        <li>
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <div class="cart-item-price">
              <span>Price: ₹${item.price.toFixed(2)}</span>
              <div class="quantity-controls">
                <button class="quantity-btn minus" onclick="updateQuantity('${item.name}', -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" onclick="updateQuantity('${item.name}', 1)">+</button>
              </div>
            </div>
          </div>
        </li>
      `;
  
      cartItemsContainer.innerHTML += cartItemHTML;
      total += item.price * item.quantity;
    });
  
    const cartTotal = document.getElementById("cart-total");
    cartTotal.textContent = `₹${total.toFixed(2)}`;
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.backgroundColor = "white";
    cartContainer.style.color = "black";
  }
  
  function updateQuantity(itemName, change) {
    const item = cart.find((cartItem) => cartItem.name === itemName);
    if (item) {
      item.quantity += change;
      if (item.quantity < 1) {
        cart.splice(cart.indexOf(item), 1);
      }
    }
    updateCartDisplay();
  }
  
  function closingcart() {
    const cartContainer = document.getElementById("cart-container");
    const cartCloseButton = document.getElementById("cart-close");
    const clothsContainer = document.querySelector(".cloths");
    cartCloseButton.addEventListener("click", () => {
      cartContainer.style.display = "none";
      clothsContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
      clothsContainer.style.width = "92%";
    });
    cartContainer.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }
  
