const allInputs = document.querySelectorAll("input");

console.log(allInputs);

function showInputError(input) {
    if (input.required) {
        input.addEventListener("focusout", (e) => {
            if (!checkLength(input.value, 1)) {
                input.nextElementSibling.innerHTML = "This field is mandatory";
                input.style.borderColor = "red";
                input.style.border = "2px solid #FF9494";
            } else {
                input.nextElementSibling.innerHTML = "";
                input.style.borderColor = "#113340";
            }
        });
    }
}

allInputs.forEach((input) => {
    showInputError(input);
});

const email = document.querySelector("#Email");

email.addEventListener("focusout", (e) => {
    if (email.type === "email" && !validateEmail(email.value) && checkLength(email.value, 0)) {
        email.nextElementSibling.innerHTML = "Please type in a valid email";
        email.style.borderColor = "red";
        email.style.border = "2px solid #FF9494";
    }
});
