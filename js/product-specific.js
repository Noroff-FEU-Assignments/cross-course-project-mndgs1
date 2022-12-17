// Fetching jacket details
function fetchParams() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    return id;
}

// Getting specific jacket index from jackets[]
const id = fetchParams();

const index = jackets.findIndex(function (jacket) {
    return jacket.id === id;
});

const jacket = jackets[index];

// Create Jacket HTML on Product page
function createJacketDOM(id) {
    const jacketContainer = document.querySelector(".product-specific");

    jacketContainer.innerHTML = `<div class="product-col1">
                                <img src="${jacket.image}" alt="${jacket.name}" />
                              </div>
                              <div class="product-col2">
                                <h1>${jacket.name}</h1>
                                <p class="product_price">${jacket.price}kr</p>
                                <h2>Product description</h2>
                                <p>${jacket.description}</p>
                                <button class="reset-style cta add-to-cart">Add to Cart</button>
                              </div>`;
}

createJacketDOM(id);

// Adding to Cart
const addToCartButton = document.querySelector(".add-to-cart");

addToCartButton.addEventListener("click", (e) => {
    let cart = getCart();

    if (!cart) {
        let cart = [];
        cart.push(jacket);

        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        const duplicate = cart.find(({ id }) => id === jacket.id);
        if (duplicate) {
            duplicate.quantity += 1;
        } else {
            cart.push(jacket);
        }

        localStorage.clear();
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    createCountDOM();
});
