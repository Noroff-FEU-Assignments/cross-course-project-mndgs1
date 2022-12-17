let cartItemCount = 0;
let count = 0;
let cart = [];

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
        <a href="product.html" class="product-anchor"><h3 class="product_name">${jacket.name}</h3></a>
      <p class="product_price">${jacket.price}kr</p>`;
        });
    }
}

// Getting Cart from localStorage
function getLocalStorage() {
    const keysArray = Object.keys(localStorage);

    for (i = 0; i < keysArray.length; i++) {
        const json = localStorage.getItem(keysArray[i]);
        const data = JSON.parse(json);
        data.quantity = 1;
        const duplicate = cart.find(({ id }) => id === data.id);
        if (duplicate) {
            duplicate.quantity += 1;
        } else {
            cart.push(data);
        }
    }

    const cartCounter = document.querySelector(".header__cart-counter");

    if (cart.length) {
        let count = 0;
        cart.forEach((el) => {
            count += el.quantity;
        });
        cartCounter.innerHTML = count;
        cartCounter.style.visibility = "visible";
    }

    return cart;
}

// Create Cart DOM
function createCartDOM() {
    const productsContainer = document.querySelector(".cart_product-list");

    cart.forEach((item) => {
        const itemContainer = document.createElement("div");
        itemContainer.classList.add("cart_product-card");

        itemContainer.innerHTML = `<a href="product.html?id=${item.id}" class="product-anchor">
                                    <img src="../${item.image}" alt="${item.name}" />
                                    <h3>${item.name}</h3>
                                  </a>
                                  <p>${item.price}kr</p>
                                  <button class="cart_delete reset-style">Delete</button>
                                  <div class="quantity-container">
                                    <p>Quantity:</p>
                                    <div class="quantity-adjust-container">
                                      <button id="${item.id}" class="reset-style cta quantity-adjust quantity-minus">-</button>
                                      <p>${item.quantity}</p>
                                      <button id ="${item.id}" class="reset-style cta quantity-adjust quantity-plus">+</button>
                                    </div>
                                  </div>`;
        productsContainer.appendChild(itemContainer);
    });
}

getLocalStorage();

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
