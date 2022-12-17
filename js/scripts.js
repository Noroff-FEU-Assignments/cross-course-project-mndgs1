const menuBars = document.querySelector(".header__hamburger");
// Hamburger menu event listener
menuBars.addEventListener("click", (e) => {
    const nav = document.querySelector("nav");

    if (menuBars.innerHTML === `<i class="fa-solid fa-x fa-2x"></i>`) {
        menuBars.innerHTML = `<i class="fa-solid fa-bars fa-2x">`;
        nav.style.display = "none";
    } else {
        menuBars.innerHTML = `<i class="fa-solid fa-x fa-2x"></i>`;
        nav.style.display = "block";
    }
});

// Create Jackets List on Jackets page
function createJacketsDOM() {
    const productsContainer = document.querySelector(".product-list");

    // for function uses to populate the list abit more, delete when more data
    for (i = 0; i < 5; i++) {
        jackets.forEach((jacket) => {
            const productEl = document.createElement("div");
            productEl.classList.add("product");
            productsContainer.appendChild(productEl);

            productEl.innerHTML = `<div class="product-wrapper">
        <a href="product.html?id=${jacket.id}" class="product-anchor"><img src="${jacket.image}" alt="${jacket.name}" /></a>
      </div>
      <a href="product.html?id=${jacket.id}" class="product-anchor"><h3 class="product_name">${jacket.name}</h3></a>
      <p class="product_price">${jacket.price}kr</p>`;
        });
    }
}

// Create Cart DOM
function createCartDOM() {
    const productsContainer = document.querySelector(".cart_product-list");

    productsContainer.innerHTML = "";
    getCart().forEach((item) => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("cart_product-card");
        itemContainer.id = item.id;
        itemContainer.innerHTML = `<a href="product.html?id=${item.id}" class="product-anchor">
                                    <img src="../${item.image}" alt="${item.name}" />
                                    <h3>${item.name}</h3>
                                  </a>
                                  <p>${item.price}kr</p>
                                  <button class="cart_delete reset-style">Delete</button>
                                  <div class="quantity-container">
                                    <p>Quantity:</p>
                                    <div class="quantity-adjust-container">
                                      <button class="reset-style cta quantity-adjust quantity-minus">-</button>
                                      <p class="cart-quantity">${item.quantity}</p>
                                      <button class="reset-style cta quantity-adjust quantity-plus">+</button>
                                    </div>
                                  </div>`;
        productsContainer.appendChild(itemContainer);
    });
}

// Form Validation functions

// Check e-mail input
function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

// Check input length
function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

// Add an error message
function manipulateErrorDOM(input, error) {
    input.nextElementSibling.innerHTML = error;
    input.nextElementSibling.classList.add("error");
    input.style.borderColor = "red";
    input.style.border = "1px solid #FF9494";
}

// Validate input
function validateInput(input) {
    if (input.required) {
        if (!checkLength(input.value, 0)) {
            manipulateErrorDOM(input, "This field is mandatory");
        } else if (input.id === "card-number" && input.value.replace(" ", "").length !== 16) {
            manipulateErrorDOM(input, "Type in a valid card number");
        } else if (input.id === "cvc" && input.value.replace(" ", "").length !== 3) {
            manipulateErrorDOM(input, "Type in a valid CVC number");
        } else if (input.id === "email" && !validateEmail(input.value)) {
            manipulateErrorDOM(input, "Type in a valid E-mail address");
        } else {
            input.nextElementSibling.innerHTML = "";
            input.nextElementSibling.classList.remove("error");

            input.style.borderColor = "#101334";
        }
    }
}

// Cart Functions
function getCount() {
    const cart = getCart();
    let sum = 0;

    for (i = 0; i < cart.length; i++) {
        sum += cart[i].quantity;
    }
    return sum;
}

function getCart() {
    const data = localStorage.getItem("cart");
    const cart = JSON.parse(data);
    return cart;
}

function createCountDOM() {
    const cartCounterEl = document.querySelector(".header__cart-counter");
    cartCounterEl.innerHTML = "";
    const count = getCount();
    if (count > 0) {
        cartCounterEl.style.visibility = "visible";
        cartCounterEl.innerHTML = count;
    } else {
        cartCounterEl.style.visability = "none";
    }
}

createCountDOM();

function totalPriceCalc(array) {
    let sum = 0;

    array.forEach((item) => {
        sum += item.price * item.quantity;
    });
    return sum;
}

function refreshCartDOM() {
    createCartDOM();

    const products = document.querySelectorAll(".cart_product-card");
    const totalPrice = document.querySelector(".total");

    totalPrice.innerHTML = `${totalPriceCalc(getCart())}kr`;

    products.forEach((product) => {
        const deleteButton = product.childNodes[4];
        const quantityMinusButton = document.getElementById(`${product.id}`).querySelector(".quantity-minus");
        const quantityPlusButton = document.getElementById(`${product.id}`).querySelector(".quantity-plus");
        const quantity = document.getElementById(`${product.id}`).querySelector(".cart-quantity");

        if (quantity.innerHTML === "1") {
            quantityMinusButton.disabled = true;
            quantityMinusButton.style.backgroundColor = "#EBEBE4";
            quantityMinusButton.style.color = "black";
        } else {
            quantityMinusButton.disabled = false;
        }

        deleteButton.addEventListener("click", (e) => {
            const cart = getCart();
            const index = cart.indexOf(cart.find(({ id }) => id === product.id));
            cart.splice(index, 1);

            const json = JSON.stringify(cart);
            localStorage.clear();
            localStorage.setItem("cart", json);

            refreshCartDOM();
            createCountDOM();
        });

        quantityMinusButton.addEventListener("click", (e) => {
            const cart = getCart();
            const cartItem = cart.find(({ id }) => id === product.id);
            cartItem.quantity -= 1;

            const json = JSON.stringify(cart);
            localStorage.clear();
            localStorage.setItem("cart", json);

            refreshCartDOM();
            createCountDOM();
        });

        quantityPlusButton.addEventListener("click", (e) => {
            const cart = getCart();
            const cartItem = cart.find(({ id }) => id === product.id);
            cartItem.quantity += 1;

            const json = JSON.stringify(cart);
            localStorage.clear();
            localStorage.setItem("cart", json);

            refreshCartDOM();
            createCountDOM();
        });
    });
}
