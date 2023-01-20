const menuBars = document.querySelector(".header__hamburger");
const baseUrl = "https://mindb.no/rainy-days/wp-json/wc/store/products";

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

// Create Cart DOM
function createCartDOM() {
    const productsContainer = document.querySelector(".cart_product-list");

    productsContainer.innerHTML = "";
    if (getCart()) {
        getCart().forEach((item) => {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("cart_product-card");
            itemContainer.id = item.id;
            itemContainer.innerHTML = `<a href="product.html?id=${item.id}" class="product-anchor">
                                        <img src="${item.images[0].src}" alt="${item.images[0].alt}" />
                                        <h3>${item.name}</h3>
                                      </a>
                                      <p>${item.prices.price}kr</p>
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
    let sum = 0;
    let cart = getCart();
    if (cart) {
        for (i = 0; i < cart.length; i++) {
            sum += cart[i].quantity;
        }
    }
    return sum;
}

function getCart() {
    try {
        const data = localStorage.getItem("cart");
        cart = JSON.parse(data);
        return cart;
    } catch {}
}

let cart = getCart();

function createCountDOM() {
    let cartCounterEl = document.querySelector(".header__cart-counter");
    cartCounterEl.innerHTML = "";
    const count = getCount();
    if (count > 0) {
        cartCounterEl.style.visibility = "visible";
        cartCounterEl.innerHTML = count;
    } else {
        cartCounterEl.style.visibility = "hidden";
    }
}

function totalPriceCalc(array) {
    let sum = 0;

    array.forEach((item) => {
        sum += item.prices.price * item.quantity;
    });
    return sum;
}

createCountDOM();

function refreshCartDOM() {
    createCartDOM();
    createCountDOM();

    const products = document.querySelectorAll(".cart_product-card");
    const totalPrice = document.querySelector(".total");

    if (getCart()) {
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

            deleteButtonListener(deleteButton, product);

            quantityMinusListener(quantityMinusButton, product);

            quantityPlusListener(quantityPlusButton, product);
        });
        totalPrice.innerHTML = `${totalPriceCalc(getCart())}kr`;
    }
}

function deleteButtonListener(deleteButton, product) {
    deleteButton.addEventListener("click", (e) => {
        const index = cart.indexOf(cart.find(({ id }) => id === product.id));
        cart.splice(index, 1);

        const json = JSON.stringify(cart);
        localStorage.clear();

        if (cart.length > 0) {
            localStorage.setItem("cart", json);
        }

        refreshCartDOM();
    });
}

function quantityMinusListener(quantityMinusButton, product) {
    quantityMinusButton.addEventListener("click", (e) => {
        let cartItem = cart.find(({ id }) => id == product.id);
        cartItem.quantity -= 1;

        const json = JSON.stringify(cart);
        localStorage.clear();
        localStorage.setItem("cart", json);

        refreshCartDOM();
    });
}

function quantityPlusListener(quantityPlusButton, product) {
    quantityPlusButton.addEventListener("click", (e) => {
        let cartItem = cart.find(({ id }) => id == product.id);

        cartItem.quantity += 1;

        const json = JSON.stringify(cart);
        localStorage.clear();
        localStorage.setItem("cart", json);

        refreshCartDOM();
    });
}
