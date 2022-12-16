createCartDOM();

// Event listeners
// const quantityAdjust = document.getElementsByClassName("quantity-adjust");

// for (i = 0; i < quantityAdjust.length; i++) {
//     const currentIteration = quantityAdjust[i];
//     currentIteration.addEventListener("click", (e) => {
//         const currentId = currentIteration.getAttribute("id");
//         const focusItem = cart.find(({ id }) => id === currentId);

//         if (currentIteration.innerHTML === "+") {
//             focusItem.quantity += 1;
//         } else {
//             focusItem.quantity -= 1;
//         }
//     });

//     localStorage.clear();

//     for (i = 0; i < cart.length; i++) {
//         const json = JSON.stringify(cart[i]);
//         localStorage.setItem(i, json);
//     }
// }

const productDelete = document.querySelector(".cart_delete");
