const form = document.querySelector(".card-form");
const inputs = document.querySelectorAll("input");
const cardFrontCode = document.querySelector(".card-front__code");
const cardFrontName = document.querySelector(".card-front__name");
const cardFrontPoint = document.querySelector(".card-front__point");

const cardBackCode = document.querySelector(".card-back__code");

const cardHolderNameInput = document.getElementById("cardholder-name");
const cardNumberInput = document.getElementById("card-number");

const expMonthInput = document.getElementById("exp-month");
const expYearInput = document.getElementById("exp-year");
const cvcNumberInput = document.getElementById("cvc-number");

cardHolderNameInput.addEventListener("input", e => {
    const value = e.target.value;
    cardFrontName.textContent = value || "Jane Appleseed";
})

cardNumberInput.addEventListener("input", e => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.slice(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();

    e.target.value = value;
    cardFrontCode.textContent = value || "0000 0000 0000 0000";

})

function updateExpiry(){
    const month = expMonthInput.value || "00";
    const year = expYearInput.value || "00";

    cardFrontPoint.textContent = `${month}/${year}`;
}

expMonthInput.addEventListener("input", updateExpiry);
expYearInput.addEventListener("input", updateExpiry);


cvcNumberInput.addEventListener("input", e => {
    const value = e.target.value;
    cardBackCode.textContent = value || "000";
})
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    inputs.forEach((input) => {
        const errorElement = document.getElementById(input.getAttribute("aria-describedby"));
        const value = input.value.trim();
        if (value === "") {
            errorElement.textContent = "Can't be blank";
            input.classList.add("input-error");
            isValid = false;
            return;
        } else if ((input.id === "card-number" || input.id === "cvc-number" || input.id === "exp-year") && !/^\d+$/.test(value)) {
            errorElement.textContent = "Wrong format, numbers only";
            input.classList.add("input-error");
            isValid = false;
            return;
        } else if (input.id === "exp-month") {
            const month = Number(value);
            if (!/^(0[1-9]|1[0-2])$/.test(value)) {
                errorElement.textContent = "Invalid month!";
                input.classList.add("input-error");
                isValid = false;
                return;
            }
        } else if (input.id === "card-number") {
            if (value.length !== 16) {
                errorElement.textContent = "Wrong format, there must be 16 numbers only";
                input.classList.add("input-error");
                isValid = false;
                return;
            }
        } else if (input.id === "cvc-number") {
            if (!/^\d{3}$/.test(value)) {
                errorElement.textContent = "Wrong format, there must be 3 numbers only";
                input.classList.add("input-error");
                isValid = false;
                return;
            }
        } else if (input.id === "exp-month" || input.id === "exp-year") {
            if (!/^\d{2}$/.test(value)) {
                errorElement.textContent = "Wrong format, there must be 2 numbers only";
                input.classList.add("input-error");
                isValid = false;
                return;
            }
        } else if (input.id === "cardholder-name") {
            if (!/^[A-Za-z\s]+$/.test(value)) {
                errorElement.textContent = "Wrong format, characters only";
                input.classList.add("input-error");
                isValid = false;
                return;
            }
        }

        errorElement.textContent = "";
        input.classList.remove("input-error");
    });

    if (isValid) {
        const formData = {
            cardHolderName: document.getElementById("cardholder-name").value,
            cardNumber: document.getElementById("card-number").value,
            expMonth: document.getElementById("exp-month").value,
            expYear: document.getElementById("exp-year").value,
            cvcNumber: document.getElementById("cvc-number").value,
        }
        localStorage.setItem("cardData", JSON.stringify(formData));
        window.location.href = "../../../thank-you.html";
    }
})