// ==UserScript==
// @name     				John Pye Auctions show full price
// @description     Calculate the price of a lot including the buyers premium and VAT
// @version  				1
// @grant    				none
// @match    				https://www.johnpyeauctions.co.uk/Event/LotDetails/*
// ==/UserScript==

// Buyers premium is first, then VAT is added
const buyers_premium = .25;
const VAT = .2;


function applyCosts(price) {
	return price + (price * buyers_premium) + (price * VAT);
}


// Get the element
var priceElement = document.querySelector('.detail__price .Bidding_Current_Price .NumberPart');

// The lot may have ended, or not have a price for some other reason
if (priceElement == null) {
    return;
}

// Get the price and parse it as a float
var price = parseFloat(priceElement.innerHTML);

// Add the buyers premium and VAT, then round it to 2DP
var convertedPrice = applyCosts(price).toFixed(2);


// Show the converted price
priceElement.textContent = convertedPrice;


// Create a new bit of subtext to show the original price
var smallEl = document.createElement("small");
smallEl.setAttribute("style", "color: blue; font-size:75%;");
smallEl.textContent = " (ex delivery) before buyers premium and VAT £" + price;
priceElement.appendChild(smallEl);
