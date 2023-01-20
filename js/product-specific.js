// Fetching jacket details
function fetchParams() {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    return id;
}

// Getting specific jacket index from jackets[]
const id = fetchParams();

let jacket;

// Create Jacket HTML on Product page
function createJacketDOM(product) {
    const jacketContainer = document.querySelector(".product-specific");

    jacketContainer.innerHTML = `<div class="product-col1">
                                <img src="${product.images[0].src}" alt="${product.images[0].alt}" />
                              </div>
                              <div class="product-col2">
                                <h1>${product.name}</h1>
                                <p class="product_price">${product.prices.price}kr</p>
                                <h2>Product description</h2>
                                ${product.description}
                                <button class="reset-style cta add-to-cart">Add to Cart</button>
                              </div>`;

    const addToCartButton = document.querySelector(".add-to-cart");

    addToCartButton.addEventListener("click", (e) => {
        if (!cart) {
            cart = [];
            jacket.quantity = 1;
            cart.push(jacket);

            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            const duplicate = cart.find(({ id }) => id === jacket.id);
            if (duplicate) {
                duplicate.quantity += 1;
            } else {
                jacket.quantity = 1;
                cart.push(jacket);
            }

            localStorage.clear();
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        createCountDOM();
    });
}

const urlSpecificJacket = baseUrl + "/" + id;

async function getJacketById(url) {
    const response = await fetch(url);
    const product = await response.json();
    jacket = product;

    createJacketDOM(product);
}

// createJacketDOM(id);
getJacketById(urlSpecificJacket);

// Adding to Cart
