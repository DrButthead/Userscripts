// ==UserScript==
// @name     				John Pye Auctions show full price
// @description     Calculate the price of a lot including the buyers premium and VAT
// @version  				1
// @grant    				none
// @match    				https://www.johnpyeauctions.co.uk/Event/LotDetails/*
// @icon						data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAFBUExURf///////f/+//7+////+/7///3//P7+/vz//f3//v7//c5+f6MLCtiNkd2jorU1Nro/QsFOVb1PTrMzMstscPnw8d2np6ACA8ZhZ/HR1J4AAK4nLfTf5Prr8MFFR5kAAd2sr/3+/9+sq6IAAshnbvLe3aYCCb5YVq8lJaUHCPHd3uCoq6MABclpbfDb2qQAB7lCRtWNkLQvMqkyNvTa2/z+/f76+/z//+GprKQAAMRkaPPZ2qQBBqoVG8dpaeKqrfv19+SurPPl5eGrq58BAsdgY+/S1KUBCLlHR9SFgasdHPXv796rqp8BAMpwcPDb2L5UVvz9/859fL9TU+7R07c8P6ECAOvExe/V1qMAAK4mKPv3+OvR0r1MULk+QcFVVezS0/79//bm571GTLYzOOW0t//9/v/+/P7+/P7/+//9/5x9RMUAAAABYktHRACIBR1IAAAAB3RJTUUH5wkEEQML5Pw3sAAAAaRJREFUOMuNk+lSAjEMgNssFbaKCKhcAi6Xt4vIJYeKKALKoajgLaigvP8DuNmO48+amU47ydckTRNCCKUAioK7WBaL2AkBYIxIAUqRmpkhxGpFJWOoVhQAm01VzfsSAAAVf27RRCnnALgA5AA1RVFmZ+fm7Pb5eYdjYcHpdLnc7sXFpSXjkhRgTCS3vOzxeL0+n98fCKysBIOhUDi8uqppcgCTwXQikWg0FovHE4m1Nc4VZX19Y2Nz0wghBTRNVfFhW1vb2zs7u7u6nkzu7aVS+/vpND5aDlCayWSzuVw+f3BQKBSLpVK5fHh4dCRqbNZBAhwfVyonJ4RUq6enZ2e12vl5vU4phjXKbBRBDjQazebFBaWXl61Wu93p6Hq3e3WF38WY+X1S4Ppa13u9m5vb27u7fn8wuL9/eHh8BFOsVgORAgBPT8/PLy+vr29vw+Fo9P7+8fH5ydh4zDm2kRyYTLDhxKdT+vX1e8IW4Pw/AAaZTFClaaI0WGBmimglGWCxCEea9v1NyHgMgOMynXKOw2TYpAC6FUnhADGmqr+xhUUK/ADVP2TRwap8ogAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wOS0wNFQxNzowMzoxMCswMDowMPh3RlsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDktMDRUMTc6MDM6MTArMDA6MDCJKv7nAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTA5LTA0VDE3OjAzOjExKzAwOjAweEjUjAAAAABJRU5ErkJggg==
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
