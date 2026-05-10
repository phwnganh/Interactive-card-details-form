const cardFrontCode = document.querySelector(".card-front__code");
const cardFrontName = document.querySelector(".card-front__name");
const cardFrontPoint = document.querySelector(".card-front__point");

const cardBackCode = document.querySelector(".card-back__code");

const submitBtn = document.querySelector('.thank-you__submit');
const cardData = JSON.parse(localStorage.getItem("cardData"));
submitBtn.addEventListener('click', () => {
    window.location.href = "../../../index.html";
})

if(cardData){
    cardFrontName.textContent = cardData.cardHolderName || 'Jane Appleseed';
    cardFrontCode.textContent = cardData.cardNumber || "0000 0000 0000 0000";
    cardFrontPoint.textContent = `${cardData.expMonth || '00'}/${cardData.expYear || '00'}`;
    cardBackCode.textContent = cardData.cvcNumber || "000";
}

