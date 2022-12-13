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

getLocalStorage();

// Check cart item count
