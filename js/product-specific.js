// Fetching jacket details
const detailContainer = document.querySelector(".product-specific");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

// Getting specific jacket index from jackets[]
const index = jackets.findIndex(function (jacket, index) {
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

const cartCounter = document.querySelector(".header__cart-counter");

addToCartButton.addEventListener("click", (e) => {
    localStorage.setItem(uuidv4(), JSON.stringify(jacket));

    const newCount = parseInt(cartCounter.innerHTML);

    if (newCount === 0) {
        cartCounter.style.visibility = "visible";
        cartCounter.innerHTML = newCount + 1;
    } else {
        cartCounter.innerHTML = `${newCount + 1}`;
    }
});
