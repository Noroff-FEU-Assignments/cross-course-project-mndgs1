// Create Jackets List on Jackets page
function createJacketsDOM(jackets) {
    const productsContainer = document.querySelector(".product-list");

    productsContainer.innerHTML = "";
    // for function uses to populate the list abit more, delete when more data
    for (i = 0; i < 5; i++) {
        jackets.forEach((jacket) => {
            const productEl = document.createElement("div");
            productEl.classList.add("product");
            productsContainer.appendChild(productEl);

            productEl.innerHTML = `<div class="product-wrapper">
    <a href="product.html?id=${jacket.id}" class="product-anchor"><img src="${jacket.images[0].src}" alt="${jacket.images[0].alt}" /></a>
  </div>
  <a href="product.html?id=${jacket.id}" class="product-anchor"><h3 class="product_name">${jacket.name}</h3></a>
  <p class="product_price">${jacket.prices.price}kr</p>`;
        });
    }
}

async function getJackets(url) {
    const response = await fetch(url);
    const products = await response.json();

    createJacketsDOM(products);
}

getJackets(baseUrl);
