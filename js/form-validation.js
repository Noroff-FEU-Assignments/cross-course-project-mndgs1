const allInputs = document.querySelectorAll("input, textarea");
const submit = document.querySelector(".submit");

allInputs.forEach((input) => {
    input.addEventListener("focusout", (e) => {
        validateInput(e.target);
    });

    input.addEventListener("keyup", (e) => {
        if (e.target.required && e.key !== "Tab") {
            if (!checkLength(e.target.value, 0)) {
                manipulateErrorDOM(e.target, "This field is mandatory");
            } else {
                e.target.nextElementSibling.innerHTML = "";
                e.target.style.borderColor = "#101334";
            }
        }
    });
});

submit.addEventListener("click", (e) => {
    allInputs.forEach((input) => {
        validateInput(input);
    });

    const allErrors = document.querySelectorAll(".error");

    if (allErrors.length === 0) {
        const checkOutSuccess = document.querySelector(".form-success");

        if (checkOutSuccess) {
            checkOutSuccess.style.display = "block";
        } else {
            const successMessageEl = document.querySelector(".success");
            successMessageEl.style.display = "block";
            successMessageEl.innerHTML = "Thank you for your Message! We will get back to you as soon as possible.";
        }
    }
});

const formSuccessButton = document.querySelector(`.form-success a`);

if (formSuccessButton) {
    formSuccessButton.addEventListener("click", (e) => {
        localStorage.clear();
    });
}
