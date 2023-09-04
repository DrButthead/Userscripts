// ==UserScript==
// @name     Etsy Ad remover
// @version  1
// @grant    none
// @include http://www.etsy.com/*
// @include https://www.etsy.com/*
// @run-at   document-idle
// ==/UserScript==


// Remove Ads from the main search page
function mainSearchPage() {
	getBaseFilter()

		// 		Actual ads have 'vertisement by $SELLER_NAME' instead
		// 		.filter(span => !span.parentElement.innerText.includes('by Etsy seller'))

		// Calculated width will be 0 if it's an ad
		.filter(span => span.parentElement.getBoundingClientRect()
			.width > 0)

		// Go right the way up the chain to the <li> element and delete it
		.forEach(span => span.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove());

	// Remove ', with Ads'
	Array.from(document.getElementsByClassName('wt-text-caption'))
		.filter(span => span.children.length > 0)
		.filter(span => span.children[0].children.length > 1)
		.filter(span => typeof span.children[0].children[0].innerText != 'undefined')
		.filter(span => span.children[0].children[0].innerText.includes('results'))
		.forEach(span => span.children[0].children[1].remove());
}


// Remove Ads from the 'You may also like' section
function listingPage() {
	getBaseFilter()

		// Actual ads have 'vertisement by Etsy seller' this time
		.filter(span => span.parentElement.innerText.includes('by Etsy seller'))

		// Go right the way up the chain to the <li> element and delete it
		.forEach(span => span.parentElement.parentElement.parentElement.parentElement.parentElement.remove());

	// Remove 'including Ads'
	var adText = Array.from(document.getElementsByClassName('wt-text-caption'))
		.filter(span => span.innerText == 'including AdsÂ ')
		.pop();

  if (typeof adText == 'undefined') {
    // It doesn't exist on the page
    return;
  }

	var adIcon = Array.from(adText.parentElement.children)
		.filter(span => span.getAttribute('data-ads-row-popover') != null)
		.pop();

	adText.remove();
	adIcon.remove();

}


function getBaseFilter() {
	return Array.from(document.querySelectorAll('span'))

		// All items on the page have a hidden span beneath them
		.filter(span => span.innerText === 'vertisement')

		// There are actually 2x spans per item, one of them is genuine and the other is a red-herring
		// Filter out the red-herrings
		.filter(span => span.offsetParent != null);
}


var pageType = document.getElementById('content')
	.children[0].attributes[0].value;

if (pageType == 'listing-page-content') {
	// Make sure we remove ads after the lazy-loaded section has loaded on the listing page
	var targetDiv = document.querySelector('[data-listing-page-lazy-loaded-bottom-section]');
	setupObserver(targetDiv, listingPage);
} else {
	var targetDiv = document.getElementById('content');
	setupObserver(targetDiv, mainSearchPage);
}

function setupObserver(targetDiv, callback) {
	var observer = new MutationObserver(function(mutationsList) {
		for (let mutation of mutationsList) {
			if (mutation.type === 'childList') {
				// Code to run when the content of the <div> changes
				callback();
			}
		}
	});

	// Configure and start observing the target <div> and its descendants for changes
	var observerConfig = {
		childList: true,
		subtree: true
	};
	observer.observe(targetDiv, observerConfig);
}
